import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { productsContent } from '../lib/content';
import { hubAuth } from '../lib/hubAuth';
import StarBackground from '../components/StarBackground';

export default function Reader() {
    const { bookId, chapterId } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Validate Book existence
    const book = productsContent[bookId as keyof typeof productsContent];
    const currentChapterId = chapterId ? parseInt(chapterId) : null;

    // Redirect if book not found or not authenticated
    useEffect(() => {
        if (!hubAuth.isAuthenticated()) {
            navigate('/');
            return;
        }
        if (!book) {
            navigate('/');
            return;
        }
    }, [book, navigate]);

    if (!book) return null;

    const chapters = book.chapters;
    const currentChapter = chapters.find(c => c.id === currentChapterId);

    // Safety check for empty or invalid chapter
    if (!currentChapter && chapters.length > 0) {
        // Redirect to first chapter if invalid
    }

    // Ref for main content area to control scrolling
    const mainContentRef = useRef<HTMLDivElement>(null);

    const goToChapter = (id: number) => {
        navigate(`/leitor/${bookId}/${id}`);
        setIsSidebarOpen(false);
    };

    // Scroll to top when chapter changes
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo(0, 0);
        }
    }, [bookId, chapterId]);

    const nextChapter = () => {
        if (currentChapterId !== null && currentChapterId < chapters.length) {
            goToChapter(currentChapterId + 1);
        }
    };

    const prevChapter = () => {
        if (currentChapterId !== null && currentChapterId > 1) {
            goToChapter(currentChapterId - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 lg:z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`
                fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <Link to="/" className="text-xs text-gray-500 hover:text-white flex items-center gap-1 mb-2 transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Voltar ao Hub
                        </Link>
                        <h2 className="font-bold text-purple-400 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white text-lg leading-tight">
                            {book.title}
                        </h2>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {chapters.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 text-sm">
                            Conteúdo em breve...
                        </div>
                    ) : (
                        chapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => goToChapter(chapter.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${currentChapter?.id === chapter.id
                                    ? 'bg-purple-900/20 border-purple-500/30 text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                                    : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`text-xs font-mono mt-1 ${currentChapter?.id === chapter.id ? 'text-purple-400' : 'text-gray-600'}`}>
                                        {chapter.id.toString().padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-sm leading-snug">{chapter.title}</h3>
                                        {currentChapter?.id === chapter.id && (
                                            <p className="text-xs text-purple-300/50 mt-1 line-clamp-1">{chapter.description}</p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                ref={mainContentRef}
                className="flex-1 h-screen overflow-y-auto relative w-full custom-scrollbar scroll-smooth"
            >
                {/* Header with Menu Toggle */}
                <header className="h-16 border-b border-white/5 flex items-center px-4 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30 justify-between">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="text-sm font-bold truncate max-w-[200px] md:max-w-md">{currentChapter?.title || 'Leitor'}</span>
                    <div className="w-8" /> {/* Spacer */}
                </header>

                <StarBackground />

                {currentChapter ? (
                    <div className="w-full px-6 md:px-12 lg:px-20 py-12 lg:py-20 animate-fade-in relative z-10">
                        {/* Chapter Hero Image */}
                        {currentChapter.image && (
                            <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-12 relative shadow-2xl border border-white/10 group">
                                <img
                                    src={currentChapter.image}
                                    alt={currentChapter.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                            </div>
                        )}


                        {/* Glassmorphism Container */}
                        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                            {/* Decorative gradient blob */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                            {/* Chapter Content (Existing Code) */}
                            <div className="flex flex-col items-start text-left mb-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <Link to={`/leitor/${bookId}`} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <ArrowLeft className="w-6 h-6" />
                                    </Link>
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                        {currentChapter.icon && <currentChapter.icon className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />}
                                    </div>
                                    <span className="text-purple-500 font-mono text-sm md:text-xl tracking-wider">CAPÍTULO {currentChapter.id}</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-8 leading-tight">
                                    {currentChapter.title}
                                </h1>
                                {currentChapter.description && (
                                    <p className="text-gray-300 text-xl md:text-2xl max-w-4xl leading-relaxed font-light border-l-2 border-purple-500 pl-6">
                                        {currentChapter.description}
                                    </p>
                                )}
                            </div>

                            {/* Formatting the content text */}
                            <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed font-light">

                                {currentChapter.content.split('\n').map((paragraph, index) => {
                                    const p = paragraph.trim();
                                    if (!p) return <div key={index} className="h-8 md:h-12" />;

                                    if (p.startsWith('🌌') || p.startsWith('🔥') || p.startsWith('🧠') || p.startsWith('🔭') || p.startsWith('🌙')) {
                                        return <h2 key={index} className="text-3xl md:text-5xl font-bold text-gray-100 mt-16 mb-8 border-l-4 border-purple-500 pl-6">{p}</h2>;
                                    }
                                    if (p.startsWith('•')) {
                                        return <li key={index} className="list-none ml-4 md:ml-8 text-gray-300 my-3 pl-6 border-l border-white/10 text-xl md:text-3xl">{p}</li>;
                                    }

                                    return <p key={index} className="mb-6 text-gray-300 font-light text-xl md:text-3xl md:leading-loose tracking-wide">{p}</p>;
                                })}
                            </div>

                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-8">
                            <button
                                onClick={prevChapter}
                                disabled={currentChapterId !== null && currentChapterId <= 1}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 transition-all
                                    ${currentChapterId !== null && currentChapterId <= 1
                                        ? 'opacity-30 cursor-not-allowed text-gray-500'
                                        : 'hover:bg-white/5 hover:border-purple-500/30 text-white'}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Anterior</span>
                            </button>

                            <button
                                onClick={nextChapter}
                                disabled={currentChapterId !== null && currentChapterId >= chapters.length}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold transition-all
                                    ${currentChapterId !== null && currentChapterId >= chapters.length
                                        ? 'opacity-30 cursor-not-allowed bg-gray-800 text-gray-500'
                                        : 'hover:bg-purple-50 shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
                            >
                                <span className="hidden sm:inline">Próximo Capítulo</span>
                                <span className="sm:hidden">Próximo</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in relative z-10 w-full">
                        <div className="text-center mb-16 space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-purple-400">
                                {book.title}
                            </h1>
                            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                                Selecione um capítulo para iniciar sua jornada.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chapters.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500 py-20 text-xl border border-white/5 rounded-2xl bg-white/[0.02]">
                                    Conteúdo em breve...
                                </div>
                            ) : (
                                chapters.map((chapter) => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => goToChapter(chapter.id)}
                                        className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] h-auto flex flex-col"
                                    >
                                        {/* Banner Image */}
                                        <div className="h-48 w-full overflow-hidden relative">
                                            {chapter.image ? (
                                                <img
                                                    src={chapter.image}
                                                    alt={chapter.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-black flex items-center justify-center">
                                                    {chapter.icon && <chapter.icon className="w-16 h-16 text-white/10" />}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/40 to-transparent" />
                                        </div>

                                        <div className="relative z-10 flex flex-col justify-between flex-1 p-6">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-purple-400 font-mono text-xs tracking-wider font-bold">CAPÍTULO {chapter.id}</span>
                                                    {chapter.icon && <chapter.icon className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />}
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{chapter.title}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                                    {chapter.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center text-purple-300 text-sm font-bold group-hover:translate-x-2 transition-transform">
                                                Ler Agora <ChevronRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
