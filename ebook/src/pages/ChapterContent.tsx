import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { getChapters } from '../data';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function ChapterContent() {
    const { id, ebookId } = useParams();
    const currentEbookId = ebookId || 'astronomia-basica';
    const chapters = getChapters(currentEbookId);
    const chapter = chapters.find(c => c.id === Number(id));

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!chapter) {
        return (
            <div className="min-h-screen bg-[#0a0a16] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Capítulo não encontrado</h1>
                    <Link to={`/leitor/${currentEbookId}`} className="text-purple-400 hover:text-purple-300">
                        Voltar para capítulos
                    </Link>
                </div>
            </div>
        );
    }

    // Função para processar o conteúdo e aplicar estilos
    const renderContent = (content: string) => {
        return content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <br key={index} className="mb-4" />;

            // Detectar Títulos (Começam com emojis ou são totalmente maiúsculos e curtos)
            const isHeader = /^[🌌🔥🧩🧵⚡🔭🌠🌟☀️🧨🌋🌞🧠🌍🌎☁️🧪🌬️🌑🪐🧬🕳️🌘🌀🖤🌒🌙🌈🔬🛰️🌊🔁✨]/.test(trimmedLine) ||
                (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 60 && trimmedLine.length > 3);

            if (isHeader) {
                return (
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        key={index}
                        className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 border-l-4 border-purple-500 pl-4 py-1"
                    >
                        {trimmedLine}
                    </motion.h2>
                );
            }

            // Detectar Listas
            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('*')) {
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        key={index}
                        className="flex items-start gap-3 mb-3 ml-4"
                    >
                        <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" fill="currentColor" />
                        <span className="text-gray-300 text-lg">{trimmedLine.substring(1).trim()}</span>
                    </motion.div>
                );
            }

            // Parágrafos normais
            return (
                <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6 font-light tracking-wide break-words">
                    {trimmedLine}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a16] text-white pb-24 font-sans selection:bg-purple-500/30">
            {/* Barra de Progresso */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header Image */}
            <div className="h-[50vh] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a16]/50 to-[#0a0a16] z-10" />
                <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <Link
                    to={`/leitor/${currentEbookId}`}
                    className="absolute top-6 left-6 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-purple-500/20 border border-white/10 transition-all hover:scale-110 group/btn"
                >
                    <ArrowLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
                </Link>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="p-2 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-500/30">
                            <chapter.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-purple-200 font-bold tracking-widest text-sm uppercase bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
                            Capítulo {chapter.id}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-lg"
                    >
                        {chapter.title}
                    </motion.h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 relative z-20">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl shadow-purple-900/10">
                    {chapter.content && renderContent(chapter.content)}
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-8">
                    <Link
                        to={chapter.id > 1 ? `/leitor/${currentEbookId}/chapter/${chapter.id - 1}` : `/leitor/${currentEbookId}`}
                        className={`text-gray-400 hover:text-white flex items-center gap-2 transition-colors ${chapter.id === 1 ? 'invisible' : ''}`}
                    >
                        <ArrowLeft size={20} />
                        Anterior
                    </Link>
                    <Link
                        to={chapter.id < chapters.length ? `/leitor/${currentEbookId}/chapter/${chapter.id + 1}` : `/leitor/${currentEbookId}`}
                        className={`text-purple-400 hover:text-purple-300 flex items-center gap-2 font-semibold transition-colors ${chapter.id === chapters.length ? 'invisible' : ''}`}
                    >
                        Próximo
                        <ArrowLeft size={20} className="rotate-180" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
