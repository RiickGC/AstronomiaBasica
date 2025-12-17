
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Star, Atom, Zap, Globe, ChevronDown, ArrowRight, Smartphone, Eye, Clock, Heart, Sparkles, QrCode, CreditCard, Shield, Lock, Brain } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import { useRef, useState, useEffect } from 'react';

export default function SalesPage() {

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const chapters = [
        { id: 1, title: "O Início de Tudo", desc: "O que aconteceu nos primeiros 0,0000...1 segundos?", icon: Atom, color: "from-orange-400 to-red-500" },
        { id: 2, title: "O Espaço Não É Vazio", desc: "Por que o 'nada' é o sistema operacional da realidade.", icon: Star, color: "from-blue-400 to-indigo-500" },
        { id: 3, title: "Fábricas do Universo", desc: "Como as estrelas cozinharam os átomos do seu corpo.", icon: Zap, color: "from-yellow-400 to-orange-500" },
        { id: 4, title: "O Jogo da Vida", desc: "A loteria cósmica que permitiu sua existência.", icon: Globe, color: "from-green-400 to-emerald-500" },
        { id: 5, title: "A Morte das Estrelas", desc: "O destino final do Sol e da Terra.", icon: CircleDot, color: "from-red-400 to-pink-500" },
        { id: 6, title: "Buracos Negros", desc: "Onde a realidade se torce e o tempo para.", icon: Disc, color: "from-purple-400 to-violet-500" },
        { id: 7, title: "O Fim de Tudo", desc: "Big Freeze, Big Rip ou Big Crunch?", icon: Rocket, color: "from-cyan-400 to-blue-500" },
        { id: 8, title: "Como Sabemos?", desc: "As ferramentas que decifram o invisível.", icon: Telescope, color: "from-teal-400 to-cyan-500" },
        { id: 9, title: "O Efeito Cósmico", desc: "Por que entender o universo muda quem você é.", icon: Brain, color: "from-fuchsia-400 to-purple-500" },
    ];

    // Lucide icons mapping fix
    function CircleDot(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg> }
    function Disc(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg> }
    function Telescope(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.536a.934.934 0 0 1 .702-1.108l6.18-1.318a.934.934 0 0 1 1.108.702l.537 2.536a.934.934 0 0 1-.702 1.108Z" /><path d="m13.5 9.8 5.7-1.2" /><path d="m16.6 11.3 2.9.6" /><path d="m20.5 12.1.9.2" /><path d="m11.5 7.8.6-2.8" /><path d="m9.6 7.4-2.5-5.2" /><path d="m4.8 11.7-2.4 5.1" /><path d="m3 14.6 2.1.4" /><path d="m16.5 13.4 1.7 8.2" /><path d="m13.9 14 1.7 8.2" /></svg> }


    const [readerCount, setReaderCount] = useState(1247);

    useEffect(() => {
        const interval = setInterval(() => {
            setReaderCount(prev => {
                const change = Math.floor(Math.random() * 7) - 2; // -2 to +4
                return prev + change;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white font-['Inter'] selection:bg-purple-500/30 overflow-x-hidden relative">
            <StarBackground />

            {/* 1. HERO SECTION */}
            <div className="relative z-10">
                <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-0" />

                    <motion.div
                        style={{ opacity, scale }}
                        className="text-center max-w-5xl mx-auto relative z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-pulse">
                                <Rocket className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-bold tracking-widest uppercase text-purple-400">Lançamento Limitado</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Space_Grotesk'] font-bold mb-8 leading-[1.1] tracking-tight">
                                E Se Você Pudesse <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 animate-gradient-x">
                                    Entender o Universo
                                </span> <br />
                                em Uma Noite?
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                                Da primeira fração de segundo após o Big Bang até o fim de tudo.
                                Uma jornada interativa que vai mudar sua percepção sobre existência, tempo e o seu lugar no cosmos.
                            </p>

                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={() => window.location.href = 'https://lastlink.com/p/C87466D73/checkout-payment/'}
                                    className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl shadow-[0_0_50px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-105 active:scale-95 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                                    <span className="flex items-center gap-3 relative z-10">
                                        INICIAR MINHA JORNADA CÓSMICA
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span>{readerCount.toLocaleString('pt-BR')} leitores explorando agora</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
                    >
                        <ChevronDown className="w-8 h-8" />
                    </motion.div>
                </section>

                {/* 2. PROVA SOCIAL */}
                <section className="py-20 border-y border-white/5 bg-white/[0.02] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            {[
                                { name: "Marina", role: "Engenheira", text: "Mudou completamente como vejo o mundo. É visualmente hipnotizante." },
                                { name: "Rafael", role: "Designer", text: "Melhor que documentários da Netflix. A interatividade faz toda a diferença." },
                                { name: "Lucas", role: "Estudante", text: "Finalmente entendi relatividade sem meu cérebro derreter." }
                            ].map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-sm relative group hover:border-purple-500/30 transition-colors"
                                >
                                    {/* Purple Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-1 mb-3 text-amber-400">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                                                {testimonial.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{testimonial.name}</p>
                                                <p className="text-xs text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. GRID DE CAPÍTULOS */}
                <section className="py-32 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-6">O Que Está Esperando Por Você</h2>
                            <div className="w-full max-w-md mx-auto h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500" />
                            </div>
                            <p className="mt-4 text-gray-400 font-mono text-sm">Jornada de 9 capítulos | ~2h30 de leitura imersiva</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {chapters.map((chapter) => (
                                <motion.div
                                    key={chapter.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative h-80"
                                >
                                    {/* Gradient Border (Masked) */}
                                    <div
                                        className={`absolute inset-0 rounded-[1.8rem] p-[2px] bg-gradient-to-br ${chapter.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                        style={{
                                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            maskComposite: 'exclude',
                                            WebkitMaskComposite: 'xor'
                                        }}
                                    />

                                    {/* Purple Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

                                    {/* Card Content */}
                                    {/* Card Content */}
                                    <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.8rem] p-8 flex flex-col transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20">

                                        {/* Icon Box */}
                                        <div className="mb-6 relative">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${chapter.color} p-[1px] shadow-lg`}>
                                                <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                                    <chapter.icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 flex flex-col">
                                            <span className="text-sm font-['Space_Grotesk'] font-bold text-gray-500 mb-3 tracking-widest uppercase">Capítulo 0{chapter.id}</span>
                                            <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk'] leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                                {chapter.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mt-auto border-t border-white/5 pt-4">
                                                {chapter.desc}
                                            </p>
                                        </div>

                                        {/* Interactive Corner */}
                                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. DIFERENCIAL TECNOLÓGICO */}
                <section className="py-32 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold mb-4">Não É Só Texto. <span className="text-purple-500">É Uma Experiência.</span></h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                { icon: Smartphone, title: "Interface Responsiva", desc: "Leia em qualquer dispositivo. Seu progresso é sincronizado automaticamente." },
                                { icon: Eye, title: "Imagens Interativas", desc: "Não imagine apenas. Veja. Visualizações astronômicas reais e dinâmicas." },
                                { icon: Clock, title: "No Seu Ritmo", desc: "Sem prazos. Sem pressa. O universo esperou 13,8 bilhões de anos por você." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="text-center"
                                >
                                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                        <item.icon className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. PREVIEW INTERATIVO (MOCKUP) */}
                <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">Uma Espiada Por Dentro</h2>
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 bg-[#050505] aspect-video group">
                            <video
                                src="https://imgur.com/8Ce6aRt.mp4"
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            />
                        </div>
                    </div>
                </section>

                {/* 6. A TRANSFORMAÇÃO */}
                <section className="py-32 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold mb-16 text-center">Por Que Isso Importa?</h2>

                        <div className="space-y-12">
                            {[
                                { icon: Brain, text: "Você vai entender conceitos que cientistas levaram séculos para descobrir." },
                                { icon: Star, text: "Vai olhar para o céu noturno de forma completamente diferente." },
                                { icon: Atom, text: "Vai entender de onde vieram os átomos do seu corpo." },
                                { icon: Heart, text: "Vai questionar (de forma boa) seu lugar no universo." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors group overflow-hidden"
                                >
                                    {/* Purple Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[40px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />

                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <p className="text-xl md:text-2xl font-light">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>



                {/* 8. FAQ */}
                <section className="py-32 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Preciso saber matemática avançada?", a: "Não! O guia foi escrito para ser 100% acessível, focado em conceitos visuais e lógica, não em fórmulas." },
                                { q: "Quanto tempo leva para ler?", a: "A leitura completa leva cerca de 2h30, mas você pode (e deve) fazer no seu próprio ritmo." },
                                { q: "Funciona no celular?", a: "Sim, a experiência é totalmente responsiva e otimizada para mobile, tablet e desktop." },
                                { q: "É baseado em ciência real?", a: "Absolutamente. Todo o conteúdo é fundamentado na astrofísica moderna e cosmologia atual." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                                    <h3 className="font-bold text-lg mb-2 text-white">{item.q}</h3>
                                    <p className="text-gray-400">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. CTA FINAL */}
                <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-black to-black" />

                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-5xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group"
                        >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-8 uppercase tracking-wider">
                                <Sparkles className="w-4 h-4" />
                                Oferta por Tempo Limitado
                            </div>

                            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-6 leading-tight">
                                Sua Jornada Começa Agora
                            </h2>

                            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                                Junte-se a milhares de exploradores e descubra os segredos do universo hoje mesmo.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-2 mb-12">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-500 text-xl line-through font-mono">R$ 37,00</span>
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-sm font-bold border border-green-500/30">
                                        -45% OFF
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl text-gray-400">3x de</span>
                                    <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 tracking-tighter">
                                        7,17
                                    </span>
                                </div>
                                <span className="text-gray-400 text-lg">ou R$ 19,90 à vista</span>
                            </div>

                            <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
                                <button
                                    onClick={() => window.location.href = 'https://lastlink.com/p/C87466D73/checkout-payment/'}
                                    className="w-full py-6 bg-white text-black rounded-full font-bold text-xl hover:bg-cyan-50 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        QUERO EXPLORAR O UNIVERSO
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 w-full border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-2" title="Pagamento via Pix">
                                        <QrCode className="w-5 h-5 text-gray-400" />
                                        <span>Pix</span>
                                    </div>
                                    <div className="flex items-center gap-2" title="Cartão de Crédito">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                        <span>Cartão</span>
                                    </div>
                                    <div className="flex items-center gap-2" title="Compra Segura">
                                        <Lock className="w-5 h-5 text-green-500" />
                                        <span className="text-green-500/80">Seguro</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-purple-400/80 bg-purple-500/5 px-4 py-2 rounded-lg border border-purple-500/10">
                                    <Shield className="w-4 h-4" />
                                    Garantia Incondicional de 7 Dias. Risco Zero.
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 10. FOOTER */}
                <footer className="py-12 border-t border-white/5 bg-black text-center text-gray-600 text-sm">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Rocket className="w-5 h-5 text-purple-500" />
                        <span className="font-bold text-white">Astronomia Basica</span>
                    </div>
                    <p className="mb-4">Criado com amor pela ciência e curiosidade humana.</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
