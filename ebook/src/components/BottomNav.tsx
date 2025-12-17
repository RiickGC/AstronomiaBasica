import { Home, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { icon: Home, label: 'Início', path: '/app' },
        { icon: BookOpen, label: 'Capítulos', path: '/chapters' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0F1021]/95 backdrop-blur-lg border-t border-white/5 px-6 py-4 z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center gap-1 transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
