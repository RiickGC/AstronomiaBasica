import { useState } from 'react';
import { X, Rocket, Loader2, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hubAuth } from '../lib/hubAuth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { db, auth } from '../lib/firebase';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

type ModalView = 'login' | 'activate';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [view, setView] = useState<ModalView>('login');

    // Login States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);

    // Activation States
    const [activateStep, setActivateStep] = useState<'check' | 'create'>('check');
    const [activateEmail, setActivateEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userDocId, setUserDocId] = useState('');

    const resetStates = () => {
        setView('login');
        setActivateStep('check');
        setError('');
        setLoading(false);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleClose = () => {
        resetStates();
        onClose();
    };

    // --- LOGIN LOGIC ---
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const normalizedEmail = email.toLowerCase().trim();

        // 0. Admin Access (Bypass)
        if (normalizedEmail === 'henriquegomes077@gmail.com' && password === 'AstronomiaAdminBasica') {
            const allProducts = ['astronomia-basica', 'teoria-cordas', 'origem-vida', 'espaco-tempo'];
            hubAuth.login(normalizedEmail, allProducts);
            onLoginSuccess();
            handleClose();
            return;
        }

        try {
            // 1. Tentar Login Nativo
            try {
                await signInWithEmailAndPassword(auth, normalizedEmail, password);

                // Fetch user data for products
                const q = query(collection(db, 'allowed_users'), where('email', '==', normalizedEmail));
                const querySnapshot = await getDocs(q);
                let ownedProducts = ['astronomia-basica'];
                if (!querySnapshot.empty) {
                    ownedProducts = querySnapshot.docs[0].data().products || ['astronomia-basica'];
                }

                hubAuth.login(normalizedEmail, ownedProducts);
                onLoginSuccess();
                handleClose();
                return;
            } catch (authErr: any) {
                if (authErr.code !== 'auth/user-not-found' && authErr.code !== 'auth/invalid-credential') {
                    throw authErr;
                }
            }

            // 2. Falha Nativa -> Tentar Migração Silenciosa
            const q = query(collection(db, 'allowed_users'), where('email', '==', normalizedEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                if (userData.password === password) {
                    try {
                        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
                        hubAuth.login(normalizedEmail);
                        onLoginSuccess();
                        handleClose();
                    } catch (createErr: any) {
                        if (createErr.code === 'auth/email-already-in-use') {
                            signInWithEmailAndPassword(auth, normalizedEmail, password)
                                .then(() => {
                                    hubAuth.login(normalizedEmail);
                                    onLoginSuccess();
                                    handleClose();
                                });
                        } else {
                            setError('Erro ao migrar sua conta. Contate o suporte.');
                        }
                    }
                } else {
                    setError('Senha incorreta.');
                }
            } else {
                setError('E-mail não encontrado.');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao autenticar. Verifique seus dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Digite seu e-mail acima primeiro.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
            setError('');
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('E-mail não cadastrado no sistema novo. Se nunca acessou, tente "Primeiro Acesso".');
            } else {
                setError('Erro ao enviar email. Tente novamente.');
            }
        }
    };

    // --- ACTIVATION LOGIC ---
    const handleCheckEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const normalizedEmail = activateEmail.toLowerCase().trim();
            const q = query(collection(db, 'allowed_users'), where('email', '==', normalizedEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const userData = docSnapshot.data();

                // Se já tem senha e não está pendente, manda fazer login
                if (userData.password && userData.status !== 'pending') {
                    setError('Você já ativou sua conta. Volte e faça login.');
                } else {
                    setUserDocId(docSnapshot.id);
                    setActivateStep('create');
                }
            } else {
                setError('E-mail não encontrado na lista de alunos. Verifique a digitação ou contate o suporte.');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao verificar email.');
        } finally {
            setLoading(false);
        }
    };

    const handleActivateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        if (newPassword.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Atualizar Firestore
            const userRef = doc(db, 'allowed_users', userDocId);
            await updateDoc(userRef, {
                password: newPassword, // Mantemos redundância por enquanto
                status: 'active',
                activatedAt: new Date()
            });

            // 2. Criar Auth User
            const normalizedEmail = activateEmail.toLowerCase().trim();
            try {
                await createUserWithEmailAndPassword(auth, normalizedEmail, newPassword);
            } catch (createErr: any) {
                if (createErr.code === 'auth/email-already-in-use') {
                    // Se já existe no Auth mas estava pendente no banco (inconsistência), apenas logamos
                    await signInWithEmailAndPassword(auth, normalizedEmail, newPassword);
                } else {
                    throw createErr;
                }
            }

            // 3. Logar
            hubAuth.login(normalizedEmail, ['astronomia-basica']); // New activations default to basic for now
            onLoginSuccess();
            handleClose();

        } catch (err) {
            console.error(err);
            setError('Erro ao ativar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[#0f0f1a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* --- VIEW: LOGIN --- */}
                        {view === 'login' && (
                            <>
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full p-[2px] mb-4">
                                        <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                                            <Rocket className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
                                    <p className="text-gray-400 text-sm">Entre com o e-mail da sua compra.</p>
                                </div>

                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        required
                                    />
                                    <div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                            required
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={handleForgotPassword}
                                                className="text-xs text-purple-400 hover:text-purple-300"
                                            >
                                                Esqueci minha senha
                                            </button>
                                        </div>
                                    </div>

                                    {resetSent && <div className="p-2 bg-green-500/10 text-green-400 text-xs rounded text-center">Email de recuperação enviado!</div>}
                                    {error && <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg text-center">{error}</div>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar'}
                                    </button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                                    <p className="text-gray-500 text-sm mb-3">Acabou de comprar e não tem senha?</p>
                                    <button
                                        onClick={() => setView('activate')}
                                        className="text-purple-400 font-bold hover:text-purple-300 text-sm flex items-center justify-center gap-1 mx-auto"
                                    >
                                        Primeiro Acesso <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* --- VIEW: ACTIVATE --- */}
                        {view === 'activate' && (
                            <>
                                <div className="mb-6">
                                    <button
                                        onClick={() => setView('login')}
                                        className="flex items-center gap-1 text-gray-500 hover:text-white text-sm"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Voltar para Login
                                    </button>
                                </div>

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">Ativar Conta</h2>
                                    <p className="text-gray-400 text-sm">
                                        {activateStep === 'check' ? 'Identifique-se para criar sua senha.' : 'Crie sua senha de acesso.'}
                                    </p>
                                </div>

                                {activateStep === 'check' ? (
                                    <form onSubmit={handleCheckEmail} className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={activateEmail}
                                                onChange={(e) => setActivateEmail(e.target.value)}
                                                placeholder="E-mail da compra"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                                                required
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        </div>
                                        {error && <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg text-center">{error}</div>}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continuar'}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleActivateSubmit} className="space-y-4">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Nova Senha (min 6 caracteres)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
                                            required
                                        />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmar Senha"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
                                            required
                                        />
                                        {error && <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg text-center">{error}</div>}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ativar e Entrar'}
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
