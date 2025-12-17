import { Sparkles, Rocket, Book, BookOpen, Search, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import StarBackground from '../components/StarBackground';


export default function Home() {
    const navigate = useNavigate();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-[#050508] text-white pb-32 relative overflow-hidden font-sans">
            <StarBackground />

            {/* Ambient Glows */}
            <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 px-6 pt-16 flex flex-col items-center text-center max-w-4xl mx-auto"
            >
                {/* Hero Icon */}
                <motion.div variants={itemVariants} className="relative mb-10 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                    <div className="relative w-28 h-28 rounded-full bg-[#0a0a16] border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
                        <Sparkles className="w-14 h-14 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400" stroke="url(#gradient)" />
                        <svg width="0" height="0">
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop stopColor="#60a5fa" offset="0%" />
                                <stop stopColor="#c084fc" offset="100%" />
                            </linearGradient>
                        </svg>
                    </div>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/50 border-2 border-[#0a0a16]"
                    >
                        <Star className="w-5 h-5 text-yellow-900 fill-yellow-900" />
                    </motion.div>
                </motion.div>

                {/* Main Title */}
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
                        ASTRONOMIA BASICA
                    </span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 font-medium mb-8">
                    Uma Jornada Épica Pelo Universo
                </motion.p>

                <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
                    Explore os mistérios mais profundos do cosmos, desde o Big Bang até os buracos negros, em uma experiência visual imersiva.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/chapters')}
                    className="group relative w-full max-w-sm bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[1px] rounded-full overflow-hidden mb-16"
                >
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity" />
                    <div className="relative bg-[#0a0a16] bg-opacity-90 hover:bg-opacity-0 transition-all duration-300 rounded-full py-4 px-8 flex items-center justify-center gap-3">
                        <Rocket className="w-6 h-6 text-white group-hover:animate-bounce" />
                        <span className="text-lg font-bold text-white">Começar Jornada</span>
                        <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                </motion.button>

                {/* Feature Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl px-4">
                    {[
                        { icon: BookOpen, label: "9 Capítulos", desc: "Conteúdo profundo", color: "blue" },
                        { icon: Book, label: "Leitura Imersiva", desc: "Design focado", color: "purple" },
                        { icon: Search, label: "Glossário", desc: "Termos técnicos", color: "pink" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center mb-1`}>
                                <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                            </div>
                            <h3 className="font-bold text-lg">{item.label}</h3>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.div>
        </div>
    );
}
