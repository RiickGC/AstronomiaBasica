import { useState, useEffect } from 'react';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StarBackground from '../components/StarBackground';
import EbookCard from '../components/EbookCard';
import LoginModal from '../components/LoginModal';
import { hubAuth } from '../lib/hubAuth';

export default function EbooksShowcase() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    // Force re-render on auth change to update lock states
    const [, setTick] = useState(0);

    useEffect(() => {
        setIsAuthenticated(hubAuth.isAuthenticated());
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setTick(t => t + 1);
    };

    const handleLogout = () => {
        hubAuth.logout();
        setIsAuthenticated(false);
    };

    const ebooks = [
        {
            id: 'astronomia-basica',
            title: 'Astronomia Básica: O Guia Definitivo',
            description: 'Uma jornada visual e interativa desde o Big Bang até os mistérios dos Buracos Negros.',
            coverUrl: 'https://i.imgur.com/cBu2tak.png',
            salesUrl: '/pvastronomiabasica',
            appUrl: '/leitor/astronomia-basica'
        },
        {
            id: 'origem-vida',
            title: 'A origem e o fim da vida na Terra',
            description: 'Explore como a vida surgiu no nosso pálido ponto azul e os cenários para o seu futuro distante.',
            coverUrl: 'https://imgur.com/N8Z320m.png',
            salesUrl: 'https://lastlink.com/p/CDD0A7CC2/checkout-payment/',
            appUrl: '/leitor/origem-vida'
        },
        {
            id: 'espaco-tempo',
            title: 'A revolução do espaço-tempo',
            description: 'Entenda como Einstein mudou nossa percepção da realidade e a teia que conecta o universo.',
            coverUrl: 'https://imgur.com/U37fG1K.png',
            salesUrl: 'https://lastlink.com/p/CE4B0181C/checkout-payment/',
            appUrl: '/leitor/espaco-tempo'
        },
        {
            id: 'teoria-cordas',
            title: 'Teoria das Cordas',
            description: 'A tentativa mais ousada de explicar tudo: das partículas subatômicas às dimensões extras.',
            coverUrl: 'https://imgur.com/0m9IAbi.png',
            salesUrl: 'https://lastlink.com/p/CBFA2ED52/checkout-payment/',
            appUrl: '/leitor/teoria-cordas'
        }
    ];

    const handleCardAction = (ebook: typeof ebooks[0]) => {
        const hasAccess = hubAuth.hasAccess(ebook.id);

        if (isAuthenticated && hasAccess) {
            // If authenticated AND owns the product
            if (ebook.appUrl.startsWith('http')) {
                window.location.href = ebook.appUrl;
            } else {
                navigate(ebook.appUrl);
            }
        } else {
            // Otherwise go to sales page
            window.location.href = ebook.salesUrl;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
            <StarBackground />

            {/* Header */}
            <header className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Voltar ao Hub</span>
                    </Link>

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                        >
                            Sair da conta
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-purple-50 transition-colors shadow-lg shadow-purple-500/20"
                        >
                            <UserCircle className="w-4 h-4" />
                            Já sou Aluno
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-purple-400">
                        Minha Estante Cósmica
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {isAuthenticated
                            ? <span className="text-purple-400 font-bold">Seja bem-vindo, Boa leitura!</span>
                            : <>Sua coleção pessoal de conhecimento astronômico. <br /><span className="text-purple-400/80 text-sm">Faça login para desbloquear seus conteúdos.</span></>
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ebooks.map((ebook) => (
                        <EbookCard
                            key={ebook.id}
                            title={ebook.title}
                            description={ebook.description}
                            coverUrl={ebook.coverUrl}
                            // Lock logic: Unlocked ONLY if Authenticated AND Owns product
                            isLocked={!isAuthenticated || !hubAuth.hasAccess(ebook.id)}
                            onAction={() => handleCardAction(ebook)}
                        />
                    ))}

                    {/* Placeholder for "Coming Soon" */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-70 transition-opacity min-h-[400px]">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <span className="text-2xl">?</span>
                        </div>
                        <h3 className="font-bold text-xl mb-2">Em Breve</h3>
                        <p className="text-sm text-gray-500">Novas jornadas estão sendo mapeadas.</p>
                    </div>
                </div>
            </main>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
