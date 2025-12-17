import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Loader2 } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Checkout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simula processamento de pagamento
        setTimeout(() => {
            setLoading(false);
            // Salva flag de "compra realizada" (simulação)
            localStorage.setItem('hasAccess', 'true');
            navigate('/app');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#050508] text-white font-sans flex items-center justify-center p-6">
            <StarBackground />

            <div className="w-full max-w-md relative z-10">
                <button
                    onClick={() => navigate('/pvebook')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>

                <div className="bg-[#0F1021] border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Lock className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Checkout Seguro</h1>
                            <p className="text-sm text-gray-400">Finalize sua compra</p>
                        </div>
                    </div>

                    <div className="mb-8 bg-white/5 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Astronomia Basica - Acesso Vitalício</p>
                            <p className="text-sm text-gray-400">E-book Completo</p>
                        </div>
                        <span className="font-bold text-xl">R$ 19,90</span>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-[#0a0a16] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-[#0a0a16] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="seu@email.com"
                            />
                        </div>

                        <div className="pt-4">
                            <label className="block text-sm text-gray-400 mb-1">Dados do Cartão (Simulação)</label>
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-[#0a0a16] border border-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="0000 0000 0000 0000"
                                />
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-[#0a0a16] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="MM/AA"
                                />
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-[#0a0a16] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="CVC"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg mt-6 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processando...
                                </>
                            ) : (
                                "Pagar R$ 19,90"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        Ambiente seguro. Seus dados estão protegidos.
                    </p>
                </div>
            </div>
        </div>
    );
}
