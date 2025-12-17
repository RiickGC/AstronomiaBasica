import { Mail, Instagram, BookOpen } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <StarBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none z-0" />

            <div className="z-10 w-full max-w-2xl space-y-8 md:space-y-12 animate-fade-in">
                {/* Profile Section */}
                <div className="text-center space-y-4 md:space-y-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-yellow-500 p-[3px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                            <img
                                src="https://imgur.com/cBu2tak.png"
                                alt="Astronomia Básica Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-yellow-400 mb-2 md:mb-3">
                            Astronomia Básica
                        </h1>
                        <p className="text-gray-300 text-base md:text-xl">Explorando o cosmos, um clique de cada vez.</p>
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4 md:space-y-6">
                    <LinkButton
                        href="/newsletter"
                        icon={<Mail className="w-6 h-6 md:w-8 md:h-8" />}
                        label="Newsletter Semanal"
                        sublabel="Receba o cosmos no seu e-mail"
                    />

                    <Link
                        to="/vitrine"
                        className="group block w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 group-hover:bg-purple-500/20 text-gray-300 group-hover:text-purple-400 transition-colors">
                                <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div className="text-left">
                                <div className="text-lg md:text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                                    Materiais de Estudos
                                </div>
                                <div className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5 md:mt-1">
                                    Acesse ou adquira sua coleção
                                </div>
                            </div>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">
                                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    <LinkButton
                        href="https://chat.whatsapp.com/BrG9FZiE2FeJjakNyl7ZKn?mode=hqrc"
                        icon={<WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8" />}
                        label="Grupo no WhatsApp"
                        sublabel="Junte-se à nossa comunidade"
                    />

                    <LinkButton
                        href="https://www.instagram.com/astronomiabasica_/"
                        icon={<Instagram className="w-6 h-6 md:w-8 md:h-8" />}
                        label="Instagram"
                        sublabel="@astronomiabasica_"
                    />

                    <LinkButton
                        href="https://www.tiktok.com/@astronomia.basica"
                        icon={<TikTokIcon className="w-6 h-6 md:w-8 md:h-8" />}
                        label="TikTok"
                        sublabel="@astronomia.basica"
                    />
                </div>

                {/* Footer */}
                <footer className="text-center text-xs md:text-sm text-gray-500 pt-8 md:pt-12">
                    © 2024 Astronomia Básica.
                </footer>
            </div>
        </div>
    );
}

function LinkButton({ href, icon, label, sublabel }: { href: string; icon: React.ReactNode; label: string; sublabel?: string }) {
    return (
        <a
            href={href}
            className="group block w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 backdrop-blur-sm"
        >
            <div className="flex items-center gap-4 md:gap-6">
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 group-hover:bg-purple-500/20 text-gray-300 group-hover:text-purple-400 transition-colors">
                    {icon}
                </div>
                <div className="text-left">
                    <div className="text-lg md:text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {label}
                    </div>
                    {sublabel && (
                        <div className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5 md:mt-1">
                            {sublabel}
                        </div>
                    )}
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </a>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
        </svg>
    );
}

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export default Home;
