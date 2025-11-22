import { Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-900/30 py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://i.imgur.com/cBu2tak.png" 
                alt="AstronomiaBasica Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-white">AstronomiaBasica</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Feito com ❤️ para os apaixonados pelo universo
            </p>
            <a 
              href="mailto:contato@astronomiabasica.com"
              className="text-white/70 hover:text-yellow-500 transition-colors text-sm inline-block"
            >
              contato@astronomiabasica.com
            </a>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-yellow-500 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-yellow-500 transition-colors">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/astronomiabasica_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-purple-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-900/30 text-center text-white/70 text-sm">
          © {currentYear} AstronomiaBasica. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
