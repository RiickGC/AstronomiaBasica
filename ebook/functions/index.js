const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const cors = require("cors")({ origin: true });

admin.initializeApp();

const PRODUCT_MAP = {
    'C87466D73': 'astronomia-basica', // Produto Original
    'CDD0A7CC2': 'origem-vida',
    'CE4B0181C': 'espaco-tempo',
    'CBFA2ED52': 'teoria-cordas'
};

exports.lastlinkWebhook = functions.https.onRequest(async (req, res) => {
    try {
        console.log("Webhook recebido:", JSON.stringify(req.body));

        const email = req.body.customer?.email || req.body.email;
        const externalProductId = req.body.productId || req.body.product_id; // Ajuste conforme payload real

        if (!email) {
            console.error("Email não encontrado no payload");
            res.status(400).send("Email não encontrado");
            return;
        }

        const normalizedEmail = email.toLowerCase().trim();

        const status = (req.body.status || req.body.sale_status_enum || '').toLowerCase();

        // Identificar produto interno (default para o principal se não mapeado, para segurança)
        const internalProductId = PRODUCT_MAP[externalProductId] || 'astronomia-basica';
        console.log(`Processando produto: ${externalProductId} -> ${internalProductId} [Status: ${status}]`);

        const usersRef = admin.firestore().collection("allowed_users");

        // Busca usuário existente
        const snapshot = await usersRef.where("email", "==", normalizedEmail).get();

        if (['refunded', 'chargedback', 'canceled', 'dispute'].includes(status)) {
            // REMOVER ACESSO (REEMBOLSO)
            if (!snapshot.empty) {
                const userDoc = snapshot.docs[0];
                await userDoc.ref.update({
                    products: admin.firestore.FieldValue.arrayRemove(internalProductId),
                    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
                    lastStatus: status
                });
                console.log(`Acesso removido: ${normalizedEmail} perdeu acesso a [${internalProductId}] por ${status}`);
            } else {
                console.log(`Tentativa de remover acesso de usuário inexistente: ${normalizedEmail}`);
            }
        } else {
            // DAR ACESSO (APROVADO)
            if (snapshot.empty) {
                // CRIAR NOVO USUÁRIO
                await usersRef.add({
                    email: normalizedEmail,
                    password: null, // Será definido no primeiro acesso
                    status: 'pending',
                    products: [internalProductId], // Array inicial
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    source: "lastlink_webhook",
                    lastProductId: externalProductId,
                    lastStatus: status
                });
                console.log(`Novo usuário criado: ${normalizedEmail} com acesso a [${internalProductId}]`);
            } else {
                // ATUALIZAR USUÁRIO EXISTENTE
                const userDoc = snapshot.docs[0];
                await userDoc.ref.update({
                    products: admin.firestore.FieldValue.arrayUnion(internalProductId),
                    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
                    lastStatus: status
                });
                console.log(`Usuário atualizado: ${normalizedEmail} ganhou acesso a [${internalProductId}]`);
            }
        }

        res.status(200).send("Sucesso");
    } catch (error) {
        console.error("Erro no webhook:", error);
        res.status(500).send("Erro interno");
    }
});

exports.getLatestCampaign = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Tenta pegar do config do Firebase ou de variáveis de ambiente (para teste local)
            const apiKey = functions.config().mailchimp?.key || process.env.MAILCHIMP_API_KEY;
            const server = functions.config().mailchimp?.server || process.env.MAILCHIMP_SERVER_PREFIX;

            if (!apiKey || !server) {
                console.error("Mailchimp configuration missing");
                res.status(500).json({ error: "Configuration missing" });
                return;
            }

            mailchimp.setConfig({
                apiKey: apiKey,
                server: server,
            });

            const response = await mailchimp.campaigns.list({
                count: 1,
                sort_field: 'send_time',
                sort_dir: 'DESC',
                status: 'sent',
            });

            if (response.campaigns && response.campaigns.length > 0) {
                const latestCampaign = response.campaigns[0];
                res.status(200).json({ url: latestCampaign.archive_url });
            } else {
                res.status(404).json({ error: 'Nenhuma campanha encontrada.' });
            }
        } catch (error) {
            console.error('Erro ao buscar campanha:', error);
            res.status(500).json({ error: 'Erro interno.' });
        }
    });
});
