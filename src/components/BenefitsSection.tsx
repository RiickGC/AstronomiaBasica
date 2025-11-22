import { Zap, Crown, BookOpen, Users, Sparkles } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      number: "1",
      title: "Acesso direto à informação sem ruído",
      description: "Sem algoritmos, sem propaganda, sem ruído. Apenas o essencial: o universo, contado com calma e clareza."
    },
    {
      icon: Crown,
      number: "2",
      title: "Sensação de exclusividade",
      description: "Você recebe antes de todo mundo. É como ter um telescópio só seu, apontado para as descobertas mais recentes."
    },
    {
      icon: BookOpen,
      number: "3",
      title: "Aprendizado consistente e organizado",
      description: "O feed é um caos de fragmentos. Aqui, você aprende o cosmos como uma história completa — passo a passo, com sentido."
    },
    {
      icon: Users,
      number: "4",
      title: "Participar de uma comunidade silenciosa, mas poderosa",
      description: "Você não está sozinho. Somos uma constelação de curiosos que observam o mesmo céu — cada um, de um canto da Terra."
    },
    {
      icon: Sparkles,
      number: "5",
      title: "Descobertas semanais que expandem a mente",
      description: "A cada semana, uma descoberta que muda o jeito como você enxerga o universo — e a si mesmo."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Por que entrar em nossa newsletter?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Mais do que um simples jornal, uma jornada transformadora pelo universo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-xl p-6 lg:p-8 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/20"
              >
                {/* Número */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                  {benefit.number}
                </div>

                {/* Ícone */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {benefit.title}
                </h3>

                {/* Descrição */}
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Brilho de fundo */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* CTA adicional */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-lg font-medium">
            Mais de 186 mil pessoas já olham pro céu com outros olhos. Junte-se à nossa tripulação cósmica.
          </p>
        </div>
      </div>
    </section>
  );
}

