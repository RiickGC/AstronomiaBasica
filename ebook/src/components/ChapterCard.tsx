import { ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChapterCardProps {
    chapter: {
        id: number;
        title: string;
        description: string;
        image: string;
    };
    ebookId?: string;
}

export default function ChapterCard({ chapter, ebookId }: ChapterCardProps) {
    const currentEbookId = ebookId || 'astronomia-basica';

    return (
        <div className="bg-[#15162e] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#15162e] to-transparent z-10" />
                <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold tracking-wider text-purple-200 uppercase">
                        Capítulo {chapter.id}
                    </span>
                </div>
            </div>

            <div className="p-5 pt-2">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {chapter.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {chapter.description}
                </p>

                <Link to={`/leitor/${currentEbookId}/chapter/${chapter.id}`} className="flex items-center gap-2 text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                    Explorar capítulo
                    <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
}
