import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const handleCTA = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta-final" className="py-20 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Mais inteligente sobre o universo em 5 minutos
        </h2>

        <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed">
          Descobertas relevantes e imparciais, direto no seu email gratuitamente, todo dia, ao amanhecer cósmico.
        </p>

        <button
          onClick={handleCTA}
          className="btn-cosmic px-10 py-4 rounded-lg font-medium text-white text-lg flex items-center justify-center gap-2 mx-auto"
        >
          Quero meu primeiro e-mail celestial
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
