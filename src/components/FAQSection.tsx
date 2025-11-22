import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'O que eu vou receber ao entrar?',
    answer: 'Você receberá um email semanal com as principais descobertas astronômicas, fenômenos celestes, notícias espaciais e curiosidades sobre o universo, tudo curado e explicado de forma inteligente e acessível.',
  },
  {
    question: 'A newsletter espacial é realmente gratuita?',
    answer: 'Sim! O AstronomiaBasica é 100% gratuito. Não há planos pagos, não há upsells. Apenas astronomia pura e simples no seu email.',
  },
  {
    question: 'O AstronomiaBasica tem viés científico ou pseudocientífico?',
    answer: 'Somos 100% científicos. Todas as informações são baseadas em pesquisas, observações astronômicas verificadas e dados de agências espaciais como NASA, ESA e INPE.',
  },
  {
    question: 'Vou receber spam ou propagandas indesejadas?',
    answer: 'Nunca. Você receberá apenas o conteúdo que se inscreveu. Sem propagandas, sem spam, sem emails de terceiros. Apenas astronomia.',
  },
  {
    question: 'Como posso garantir que os emails não vão para spam ou buracos negros?',
    answer: 'Adicione nosso email à sua lista de contatos e marque nossos emails como importantes. Se ainda assim forem para spam, entre em contato conosco para ajudar a resolver.',
  },
  {
    question: 'Porque traduzimos o cosmos em linguagem humana?',
    answer: 'Você não precisa ser astrofísico para entender o que está acontecendo no céu.Toda semana, enviamos um resumo claro, bonito e sem enrolação das descobertas mais incríveis do espaço.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 lg:mb-16">
          Dúvidas
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-purple-900/30 rounded-lg overflow-hidden bg-black transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-purple-950/20 transition-colors"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-white/80 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
