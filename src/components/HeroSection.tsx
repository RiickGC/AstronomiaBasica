import { useEffect, useState } from 'react';
import TypewriterText from './TypewriterText';

export default function HeroSection() {
  useEffect(() => {
    // Define a função de callback global que o Mailchimp vai chamar
    (window as any).jsonpCallback = function(data: any) {
      const notification = document.getElementById('mc-notification-message');
      const form = document.getElementById('mc-form-custom') as HTMLFormElement;

      // Remove o script temporário que foi injetado
      const script = document.getElementById('mc-jsonp-script');
      if (script) {
        script.parentNode?.removeChild(script);
      }

      if (!notification) return;

      // Mostra a mensagem de sucesso ou erro
      if (data.result === "success") {
        notification.style.color = '#4ade80'; // Verde
        notification.innerHTML = 'Email salvo! Agora você irá receber os emails.';
        if (form) {
          form.reset(); // Limpa o campo de email
        }
      } else {
        notification.style.color = '#f87171'; // Vermelho
        
        // Deixa as mensagens de erro mais amigáveis
        let msg = data.msg;
        if (msg.includes('is already subscribed')) {
          msg = 'Este email já está inscrito na nossa lista.';
        } else if (msg.includes('invalid email') || msg.includes('must contain a single @')) {
          msg = 'Por favor, insira um endereço de email válido.';
        } else {
          msg = 'Ocorreu um erro. Tente novamente.';
        }
        notification.innerHTML = msg;
      }
    };
  }, []);

  const [latestCampaignUrl, setLatestCampaignUrl] = useState('#');

  useEffect(() => {
    const fetchLatestCampaign = async () => {
      try {
        // Isso vai chamar o arquivo 'api/get-latest-campaign.js'
        const response = await fetch('/api/get-latest-campaign'); 
        
        if (response.ok) {
          const data = await response.json();
          setLatestCampaignUrl(data.url);
        } else {
          // Se não houver campanhas (como agora), o link não fará nada
          console.log('Nenhuma campanha encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar link da campanha:', error);
      }
    };

    fetchLatestCampaign();
  }, []); // O [] garante que rode só uma vez
  // FIM DO NOVO BLOCO DE CÓDIGO

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Para o redirecionamento
    event.preventDefault();

    const form = event.currentTarget;
    const notification = document.getElementById('mc-notification-message');
    const emailInput = form.querySelector('input[name="EMAIL"]') as HTMLInputElement;

    if (!notification) return;

    // Limpa notificações antigas
    notification.innerHTML = '';
    
    if (!emailInput || !emailInput.value) {
      notification.style.color = '#f87171';
      notification.innerHTML = 'Por favor, insira um email.';
      return;
    }

    // Prepara a URL do Mailchimp para JSONP
    // Troca '/post?' por '/post-json?' e adiciona o email e o callback
    let url = form.action.replace('/post?', '/post-json?');
    const email = encodeURIComponent(emailInput.value);
    const finalUrl = `${url}&EMAIL=${email}&c=jsonpCallback`;

    // Cria e injeta uma tag <script> para fazer a requisição
    // (Esta é a técnica JSONP)
    const script = document.createElement('script');
    script.id = 'mc-jsonp-script';
    script.src = finalUrl;
    document.body.appendChild(script);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-[70px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="space-y-6 lg:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Seu portal semanal para <TypewriterText />
          </h1>

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
          Descobertas, curiosidades cósmicas e eventos astronômicos explicados em linguagem humana — direto no seu e-mail, sem custo.
          </p>

          <form 
            action="https://outlook.us10.list-manage.com/subscribe/post?u=b66729f8ab667318b8358726f&amp;id=7bccab21a8&amp;f_id=00f1e8e3f0" 
            method="post" 
            id="mc-form-custom"
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            onSubmit={handleSubmit}
          >
            <input 
              type="email" 
              name="EMAIL" 
              className="flex-1 px-4 py-3 bg-black/50 border border-purple-500 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition-all text-white placeholder-white/50" 
              placeholder="coloque seu email cósmico" 
              required
            />

            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input type="text" name="b_b66729f8ab667318b8358726f_7bccab21a8" tabIndex={-1} value="" />
            </div>

            <button 
              type="submit" 
              name="subscribe"
              className="btn-cosmic px-8 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Quero meu primeiro e-mail celestial &rarr;
            </button>
          </form>

          <div id="mc-notification-message" style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}></div>

          <a
            href={latestCampaignUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-yellow-500 hover:text-yellow-400 hover:underline transition-all"
            // (Estilo bônus: deixa o link cinza e não-clicável até a URL ser carregada)
            style={{
              opacity: latestCampaignUrl === '#' ? 0.5 : 1,
              pointerEvents: latestCampaignUrl === '#' ? 'none' : 'auto',
            }}
          >
            leia a última edição
          </a>

          <p className="text-sm text-white/60 mt-2">
            Conteúdo 100% gratuito. Você pode sair quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
