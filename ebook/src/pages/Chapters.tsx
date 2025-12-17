import { Search } from 'lucide-react';
import { getChapters } from '../data';
import ChapterCard from '../components/ChapterCard';
import { useParams } from 'react-router-dom';

export default function Chapters() {
    const { ebookId } = useParams();
    // Default to 'astronomia-basica' if no ID provided (legacy route)
    const currentEbookId = ebookId || 'astronomia-basica';
    const chapters = getChapters(currentEbookId);

    return (
        <div className="min-h-screen bg-[#0a0a16] text-white pb-24">
            <div className="sticky top-0 z-30 bg-[#0a0a16]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center mb-1">
                        <h1 className="text-2xl font-bold">Capítulos</h1>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Search className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400">
                        {chapters.length} capítulos disponíveis
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} chapter={chapter} ebookId={currentEbookId} />
                    ))}
                </div>
            </div>
        </div>
    );
}
