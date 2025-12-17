import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Rocket, Loader2, Lock } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Normalizar email para busca
            const normalizedEmail = email.toLowerCase().trim();

            // Buscar usuário na coleção 'allowed_users'
            const q = query(
                collection(db, 'allowed_users'),
                where('email', '==', normalizedEmail)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();

                // Verificar senha
                if (userData.password === password) {
                    // Login sucesso
                    localStorage.setItem('ebook_user_email', normalizedEmail);
                    navigate('/app');
                } else {
                    // Senha incorreta
                    setError('Senha incorreta. Tente novamente.');
                }
            } else {
                // Usuário não encontrado
                setError('E-mail não encontrado. Verifique se você usou o mesmo e-mail da compra.');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError('Erro ao conectar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a16] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <StarBackground />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] mb-4">
                            <div className="w-full h-full rounded-full bg-[#0a0a16] flex items-center justify-center">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-center">Área do Leitor</h1>
                        <p className="text-gray-400 text-sm text-center mt-2">
                            Entre com o e-mail utilizado na compra
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0a0a16]/50 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-600"
                                    placeholder="seu@email.com"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0a0a16]/50 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-600"
                                    placeholder="Sua senha de acesso"
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
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                "Acessar Conteúdo"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-3">
                        <p className="text-sm text-gray-400">
                            Primeiro acesso?{' '}
                            <Link to="/register" className="text-green-400 hover:text-green-300 transition-colors font-bold">
                                Ativar Conta
                            </Link>
                        </p>
                        <div className="w-full h-px bg-white/10 my-2" />
                        <p className="text-xs text-gray-500">
                            Ainda não tem acesso?{' '}
                            <Link to="/pvebook" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Comprar E-book
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
