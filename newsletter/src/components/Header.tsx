import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-purple-900/30 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://i.imgur.com/cBu2tak.png" 
              alt="AstronomiaBasica Logo" 
              className="w-14 h-14 object-contain"
            />
            <span className="text-xl font-bold text-white">AstronomiaBasica</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-white hover:text-yellow-500 transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('processo')} className="text-white hover:text-yellow-500 transition-colors">
              Explorar
            </button>
            <button onClick={() => scrollToSection('duvidas')} className="text-white hover:text-yellow-500 transition-colors">
              Dúvidas
            </button>
            <button
              onClick={() => scrollToSection('cta-final')}
              className="btn-cosmic text-white px-6 py-2 rounded-lg font-medium"
            >
              Assinar
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-900/30">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-yellow-500 transition-colors text-left">
                Início
              </button>
              <button onClick={() => scrollToSection('processo')} className="text-white hover:text-yellow-500 transition-colors text-left">
                Explorar
              </button>
              <button onClick={() => scrollToSection('duvidas')} className="text-white hover:text-yellow-500 transition-colors text-left">
                Dúvidas
              </button>
              <button
                onClick={() => scrollToSection('cta-final')}
                className="btn-cosmic text-white px-6 py-2 rounded-lg font-medium text-left"
              >
                Assinar
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
