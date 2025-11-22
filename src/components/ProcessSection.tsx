import { Rocket, Telescope, Share2 } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Entre a bordo',
    description: 'Coloque seu melhor e-mail e junte-se ao Boletim Cósmico — conteúdo gratuito, em português claro, direto da nossa base espacial pra você.',
    Icon: Rocket,
  },
  {
    number: '2',
    title: 'Reserve um minuto seu',
    description: 'Abra o e-mail, pegue um café e leia a edição da semana. É rápido, leve e feito para encaixar na sua rotina.',
    Icon: Telescope,
  },
  {
    number: '3',
    title: 'Vire parte da tripulação',
    description: 'Aprendeu algo que explodiu sua mente? Marca a gente no Instagram e entra oficialmente na nossa tripulação cósmica.',
    Icon: Share2,
  },
];

export default function ProcessSection() {
  return (
    <section id="processo" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 lg:mb-20">
          Aprenda o cosmos de um jeito que cabe na sua rotina
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card-hover border border-purple-900/30 rounded-lg p-8 text-center bg-black"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-purple-600 flex items-center justify-center">
                  <step.Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-4xl font-bold text-yellow-500 mb-4">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">
                {step.title}
              </h3>

              <p className="text-white/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
