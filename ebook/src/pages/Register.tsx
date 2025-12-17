import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Rocket, Loader2, Lock, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Register() {
    const [step, setStep] = useState<'email' | 'password' | 'success'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userDocId, setUserDocId] = useState('');
    const navigate = useNavigate();

    const handleCheckEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const normalizedEmail = email.toLowerCase().trim();
            const q = query(
                collection(db, 'allowed_users'),
                where('email', '==', normalizedEmail)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const userData = docSnapshot.data();

                if (userData.password && userData.status !== 'pending') {
                    setError('Este e-mail já possui cadastro. Faça login.');
                } else {
                    setUserDocId(docSnapshot.id);
                    setStep('password');
                }
            } else {
                setError('E-mail não encontrado. Verifique se a compra foi confirmada.');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao verificar e-mail.');
        } finally {
            setLoading(false);
        }
    };

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userRef = doc(db, 'allowed_users', userDocId);
            await updateDoc(userRef, {
                password: password,
                status: 'active',
                activatedAt: new Date()
            });
            setStep('success');
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar senha.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a16] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <StarBackground />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-cyan-500 p-[2px] mb-4">
                            <div className="w-full h-full rounded-full bg-[#0a0a16] flex items-center justify-center">
                                {step === 'success' ? (
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                ) : (
                                    <Rocket className="w-8 h-8 text-white" />
                                )}
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-center">
                            {step === 'email' && 'Primeiro Acesso'}
                            {step === 'password' && 'Criar Senha'}
                            {step === 'success' && 'Tudo Pronto!'}
                        </h1>
                        <p className="text-gray-400 text-sm text-center mt-2">
                            {step === 'email' && 'Identifique-se para ativar sua conta'}
                            {step === 'password' && 'Defina sua senha pessoal'}
                            {step === 'success' && 'Sua conta foi ativada com sucesso'}
                        </p>
                    </div>

                    {/* Step 1: Email */}
                    {step === 'email' && (
                        <form onSubmit={handleCheckEmail} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">E-mail da Compra</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#0a0a16]/50 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-green-500 transition-colors text-white placeholder-gray-600"
                                        placeholder="seu@email.com"
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continuar <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Password */}
                    {step === 'password' && (
                        <form onSubmit={handleSetPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nova Senha</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0a0a16]/50 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-green-500 transition-colors text-white"
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Senha</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#0a0a16]/50 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-green-500 transition-colors text-white"
                                        placeholder="Repita a senha"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ativar Conta"}
                            </button>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === 'success' && (
                        <div className="text-center space-y-6">
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <p className="text-green-400">Senha definida com sucesso!</p>
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-all"
                            >
                                Ir para Login
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center border-t border-white/5 pt-6">
                        <button onClick={() => navigate('/login')} className="text-sm text-gray-500 hover:text-white transition-colors">
                            Voltar para Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
