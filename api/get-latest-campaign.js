// Este é o código CORRETO para: api/get-latest-campaign.js
// Voltamos a usar 'import' porque seu package.json é "type": "module"

import mailchimp from '@mailchimp/mailchimp_marketing';

// Configura o cliente do Mailchimp
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,  // <--- Mude de volta para isso
    server: process.env.MAILCHIMP_SERVER_PREFIX, // <--- Mude de volta para isso
  });

// Esta é a função da API
export default async function handler(req, res) {
  try {
    // 1. Pede ao Mailchimp a lista de campanhas
    const response = await mailchimp.campaigns.list({
      count: 1, // Queremos apenas 1 resultado
      sort_field: 'send_time', // Ordenado pela data de envio
      sort_dir: 'DESC', // Em ordem decrescente (o mais novo primeiro)
      status: 'sent', // Apenas campanhas que JÁ FORAM ENVIADAS
    });

    // 2. Verifica se encontramos alguma campanha
    if (response.campaigns && response.campaigns.length > 0) {
      const latestCampaign = response.campaigns[0];

      // 3. Pega a URL da "versão web"
      const campaignUrl = latestCampaign.archive_url;

      // 4. Envia a URL de volta para o site
      res.status(200).json({ url: campaignUrl });
    } else {
      // Se não houver campanhas enviadas, envia um 404
      res.status(404).json({ error: 'Nenhuma campanha enviada encontrada.' });
    }
  } catch (error) {
    // Se der erro (ex: API key errada), envia um 500
    console.error('Erro ao buscar campanha do Mailchimp:', error);
    res.status(500).json({ error: 'Erro ao conectar com o Mailchimp.' });
  }
}