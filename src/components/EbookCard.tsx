import { Lock, Play, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface EbookCardProps {
    title: string;
    description: string;
    coverUrl: string;
    isLocked: boolean;
    onAction: () => void;
}

export default function EbookCard({ title, description, coverUrl, isLocked, onAction }: EbookCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 ${isLocked
                ? 'border-white/10 bg-white/5 cursor-pointer'
                : 'border-purple-500/30 bg-purple-500/10 cursor-pointer shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]'
                }`}
            onClick={onAction}
        >
            {/* Image Container */}
            <div className={`relative aspect-[3/4] overflow-hidden ${isLocked ? 'grayscale opacity-60 group-hover:opacity-80 transition-opacity' : ''}`}>
                <img
                    src={coverUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                {/* Lock/Unlock Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {isLocked ? (
                        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Lock className="w-8 h-8 text-white/70" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-purple-600/80 backdrop-blur-sm border border-purple-400/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-purple-500/40">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className={`font-bold text-xl mb-2 leading-tight ${isLocked ? 'text-gray-300' : 'text-white'}`}>
                    {title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Action Button Label */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${isLocked ? 'text-gray-400 group-hover:text-white' : 'text-purple-400 group-hover:text-purple-300'} transition-colors`}>
                    {isLocked ? (
                        <>
                            <ShoppingCart className="w-4 h-4" />
                            Toque para Adquirir
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 fill-current" />
                            Ler Agora
                        </>
                    )}
                </div>
            </div>

            {/* Locked Pulse Effect */}
            {isLocked && (
                <div className="absolute top-4 right-4 animate-pulse">
                    <Lock className="w-5 h-5 text-gray-500" />
                </div>
            )}
        </motion.div>
    );
}
