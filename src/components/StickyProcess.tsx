import { useScroll, useMotionValueEvent, motion, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { 
  MessageSquare, 
  Compass, 
  Layers, 
  Terminal, 
  Activity, 
  Rocket, 
  ShieldCheck, 
  Cpu,
  CheckCircle2,
  Globe,
  Sparkles
} from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  tag: string;
  icon: any;
  color: string;
  logs: string[];
  highlights: string[];
}

interface StepBlockProps {
  key?: any;
  step: Step;
  index: number;
  activeStep: number;
  setActiveStep: (index: number) => void;
  registerRef: (el: any, index: number) => void;
}

const getStepTagStyles = (num: number) => {
  switch (num) {
    case 1: return { text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/5", dot: "bg-sky-400" };
    case 2: return { text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", dot: "bg-purple-400" };
    case 3: return { text: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/5", dot: "bg-pink-400" };
    case 4: return { text: "text-amber-500", border: "border-amber-500/20", bg: "bg-amber-500/5", dot: "bg-amber-500" };
    case 5: return { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", dot: "bg-emerald-400" };
    case 6: return { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5", dot: "bg-violet-400" };
    case 7: return { text: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/5", dot: "bg-cyan-400" };
    default: return { text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/5", dot: "bg-sky-400" };
  }
};

const parseHighlight = (text: string) => {
  let colorClass = "bg-emerald-500 shadow-[0_0_8px_#10b981]";
  let cleanText = text;
  if (text.startsWith("🟢")) {
    colorClass = "bg-[#22c55e] shadow-[0_0_8px_#22c55e]";
    cleanText = text.substring(2).trim();
  } else if (text.startsWith("🟣")) {
    colorClass = "bg-[#a855f7] shadow-[0_0_8px_#a855f7]";
    cleanText = text.substring(2).trim();
  } else if (text.startsWith("🔵")) {
    colorClass = "bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]";
    cleanText = text.substring(2).trim();
  } else if (text.startsWith("🟠")) {
    colorClass = "bg-[#f97316] shadow-[0_0_8px_#f97316]";
    cleanText = text.substring(2).trim();
  }
  return { colorClass, cleanText };
};

function StepBlock({ step, index, activeStep, setActiveStep, registerRef }: StepBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll of this step relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Opacity, scale, and y transforms to achieve "previous fades out, current fades in"
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.7, 0.85, 1.0], [0.12, 0.25, 1, 1, 0.25, 0.12]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.7, 0.85, 1.0], [0.94, 0.96, 1, 1, 0.96, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.7, 0.85, 1.0], [30, 15, 0, 0, -15, -30]);

  // Update parent active index when in focus
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.35 && latest <= 0.65) {
      setActiveStep(index);
    }
  });

  const tagStyles = getStepTagStyles(step.number);

  return (
    <motion.div
      ref={(el) => {
        ref.current = el;
        registerRef(el, index);
      }}
      style={{ opacity, scale, y }}
      className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-20 relative min-h-[50vh] lg:min-h-[70vh] border-b border-white/5 last:border-0"
    >
      {/* LEFT COLUMN: Step content & description */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
        
        <div className={`inline-flex self-start items-center gap-2 px-3.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest ${tagStyles.text} ${tagStyles.border} ${tagStyles.bg} border`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tagStyles.dot} animate-pulse`} />
          ETAPA 0{step.number} • {step.tag}
        </div>
        
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white leading-tight">
          {step.title}
        </h3>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-light">
          {step.description}
        </p>

        <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-xs font-mono font-medium text-slate-100">
          {step.highlights.map((hl, hlIdx) => {
            const { colorClass, cleanText } = parseHighlight(hl);
            return (
              <span key={hlIdx} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${colorClass}`} />
                <span>{cleanText}</span>
              </span>
            );
          })}
        </div>

        {/* Live Terminal logs at the bottom */}
        <div className="bg-[#050508]/85 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-slate-400 space-y-2 relative shadow-inner mt-4">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <span className="text-[8px] text-slate-500 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-sky-400 animate-pulse" /> SYSTEM LOGS_
            </span>
            <span className="text-[8px] text-sky-400/80 font-bold">LATENCY_OK</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {step.logs.map((log, lIdx) => {
              const isLast = lIdx === step.logs.length - 1;
              return (
                <div 
                  key={lIdx}
                  className={`truncate flex items-center gap-2 ${isLast ? "text-sky-400 font-bold" : "text-slate-500"}`}
                >
                  <span className="text-slate-600 shrink-0">&gt;</span>
                  <span>{log}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Interactive Holographic Canvas */}
      <div className="lg:col-span-7 bg-[#05050b]/60 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-2xl shadow-2xl group min-h-[220px] lg:min-h-[320px]">
        
        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-sky-500/30 transition-colors" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-sky-500/30 transition-colors" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-sky-500/30 transition-colors" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-sky-500/30 transition-colors" />

        {/* Center grid dots background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

        {/* Active Halo Sphere under the animation */}
        <div className={`absolute w-48 h-48 bg-gradient-to-tr ${step.color} opacity-[0.06] rounded-full blur-2xl pointer-events-none`} />

        {/* Dynamic Canvas Graphics */}
        <div className="relative w-full h-full flex items-center justify-center min-h-0">
          
          {/* Step 1: ENTENDIMENTO */}
          {index === 0 && (
            <div className="relative flex flex-col items-center justify-center h-full max-h-[220px] w-full py-4">
              <div className="absolute w-36 h-36 border border-sky-500/10 rounded-full animate-[ping_3s_infinite]" />
              <div className="absolute w-28 h-28 border border-sky-400/20 rounded-full animate-[spin_12s_linear_infinite] border-dashed" />
              <div className="absolute w-20 h-20 border-2 border-sky-500/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.1)] bg-sky-950/20">
                <MessageSquare className="w-8 h-8 text-sky-400" />
              </div>
              <div className="absolute top-[10%] left-[25%] px-1.5 py-0.5 bg-[#05050a] border border-sky-500/30 rounded text-[7px] font-mono text-sky-400 animate-bounce">
                REQUISITOS_
              </div>
              <div className="absolute bottom-[15%] right-[20%] px-1.5 py-0.5 bg-[#05050a] border border-sky-500/30 rounded text-[7px] font-mono text-sky-400 animate-[bounce_2s_infinite]">
                IDEIAS_SYNC
              </div>
              <div className="absolute w-16 h-0.5 bg-sky-400/40 shadow-[0_0_6px_rgba(56,189,248,0.4)] origin-left left-1/2 top-1/2 animate-[spin_4s_linear_infinite]" />
            </div>
          )}

          {/* Step 2: PLANEJAMENTO */}
          {index === 1 && (
            <div className="relative grid grid-cols-2 gap-3 w-full max-w-[280px] p-3 bg-[#030305]/60 border border-indigo-500/10 rounded-xl shadow-inner my-4">
              <div className="absolute inset-0 bg-indigo-500/[0.02] border border-indigo-500/20 rounded-xl pointer-events-none" />
              
              <div className="p-2 bg-indigo-950/10 border border-indigo-500/15 rounded-lg space-y-1 flex flex-col justify-between h-20 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] font-mono text-indigo-400 font-bold">COLL_USERS</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="h-0.5 bg-indigo-500/20 rounded w-full" />
                  <div className="h-0.5 bg-indigo-500/20 rounded w-4/5" />
                </div>
                <span className="text-[6px] font-mono text-slate-500">Doc: uid_0x89</span>
              </div>

              <div className="p-2 bg-indigo-950/10 border border-indigo-500/15 rounded-lg space-y-1 flex flex-col justify-between h-20 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] font-mono text-indigo-400 font-bold">COLL_EVENTS</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <div className="h-0.5 bg-indigo-500/20 rounded w-full" />
                  <div className="h-0.5 bg-indigo-500/20 rounded w-3/4" />
                </div>
                <span className="text-[6px] font-mono text-slate-500">Doc: rsvp_0x12</span>
              </div>

              <div className="col-span-2 p-2 bg-indigo-950/20 border border-indigo-500/25 rounded-lg flex items-center justify-between h-10 relative overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <div>
                    <span className="text-[8px] font-mono text-white block leading-none font-bold">RULES SECURITY</span>
                    <span className="text-[6px] font-mono text-slate-400 block mt-0.5">allow write: if request.auth != null</span>
                  </div>
                </div>
                <span className="px-1 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[6px] font-mono text-emerald-400 font-bold">SECURE</span>
              </div>
            </div>
          )}

          {/* Step 3: PROTÓTIPO */}
          {index === 2 && (
            <div className="relative flex items-center justify-center w-full h-full max-h-[220px] py-2">
              <div className="w-[120px] h-[190px] bg-[#050508] border-[3px] border-white/10 rounded-[1rem] relative overflow-hidden flex flex-col justify-between p-1.5 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-900 rounded-b-md border-b border-white/5 z-20" />
                <div className="flex-1 mt-2 flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-1 relative z-10 pt-0.5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-0.5">
                      <span className="text-[6px] font-bold text-white">SuiteApp</span>
                      <Sparkles className="w-1.5 h-1.5 text-fuchsia-400 animate-spin" />
                    </div>
                    <motion.div 
                      animate={{ 
                        scale: [1, 0.96, 1],
                        borderColor: ["rgba(255,255,255,0.1)", "rgba(232,121,249,0.6)", "rgba(255,255,255,0.1)"]
                      }}
                      transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1 }}
                      className="p-1 bg-white/[0.02] border border-white/10 rounded-md space-y-0.5 text-left"
                    >
                      <div className="h-0.5 w-5 bg-fuchsia-500/30 rounded" />
                      <div className="h-0.5 w-8 bg-slate-600/30 rounded" />
                    </motion.div>
                  </div>
                  <div className="h-4.5 bg-fuchsia-600/20 border border-fuchsia-500/30 rounded-md flex items-center justify-center text-[6px] font-bold text-fuchsia-400 uppercase tracking-widest relative overflow-hidden">
                    Testar_
                  </div>
                </div>
                <motion.div 
                   animate={{ 
                    x: [12, 4, 12], 
                    y: [80, 50, 80],
                    scale: [1, 0.85, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1 }}
                  className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-fuchsia-400 rounded-full border border-white/30 shadow-lg pointer-events-none z-30"
                />
              </div>
            </div>
          )}

          {/* Step 4: DESENVOLVIMENTO */}
          {index === 3 && (
            <div className="relative w-full max-w-[280px] bg-[#050508] border border-amber-500/20 rounded-xl p-3 font-mono text-[8px] text-amber-300 shadow-2xl h-40 flex flex-col justify-between my-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-1 text-slate-500">
                <span className="flex items-center gap-1"><Terminal className="w-2.5 h-2.5 text-amber-500" /> main.tsx - TS</span>
                <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <div className="flex-1 pt-1.5 space-y-0.5 text-slate-300 select-none overflow-hidden">
                <div className="text-amber-400 font-bold">import &#123; GoogleFirestore &#125; from &quot;@google/firestore&quot;;</div>
                <div>const db = GoogleFirestore.initialize();</div>
                <div className="text-indigo-400">export async function loadApp(appId: string) &#123;</div>
                <div className="pl-2">const app = await db.collection(&quot;apps&quot;).doc(appId).get();</div>
                <div className="pl-2 text-emerald-400">if (!app.exists) throw new Error(&quot;Error&quot;);</div>
                <div className="pl-2 text-sky-400">return app.data();</div>
                <div className="text-indigo-400">&#125;</div>
              </div>
              <div className="border-t border-white/5 pt-1 flex justify-between items-center text-[7px] text-slate-500">
                <span>Ln 14, Col 28</span>
                <span>UTF-8</span>
              </div>
            </div>
          )}

          {/* Step 5: TESTES */}
          {index === 4 && (
            <div className="relative flex flex-col items-center justify-center w-full max-h-[220px] py-4">
              <div className="w-full max-w-[240px] h-20 bg-[#050508]/80 border border-emerald-500/20 rounded-xl overflow-hidden p-2 flex flex-col justify-between relative shadow-inner mb-3">
                <div className="absolute inset-0 bg-emerald-500/[0.01] pointer-events-none" />
                <div className="flex justify-between text-[6px] font-mono text-emerald-500 border-b border-emerald-500/10 pb-0.5">
                  <span>QA_LATENCY_ENGINE</span>
                  <span className="animate-pulse">TESTS_OK</span>
                </div>
                <svg className="w-full h-8" stroke="#10b981" strokeWidth="1.5" fill="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    d="M0,15 L50,15 L60,5 L70,25 L80,15 L140,15 L150,3 L160,25 L170,15 L240,15" 
                  />
                </svg>
                <div className="flex justify-between text-[6px] font-mono text-emerald-500/60 pt-0.5 border-t border-emerald-500/10">
                  <span>AVG: 42ms</span>
                  <span>STABILITY: 100%</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> INTEGRIDADE: OK
                </div>
                <div className="px-2 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded text-[8px] font-mono text-sky-400 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-sky-400" /> RESPONSIVO: OK
                </div>
              </div>
            </div>
          )}

          {/* Step 6: PUBLICAÇÃO */}
          {index === 5 && (
            <div className="relative flex flex-col items-center justify-center h-full max-h-[220px] w-full py-4">
              <div className="absolute w-32 h-32 border border-violet-500/15 rounded-full animate-pulse" />
              <div className="absolute w-22 h-22 border border-indigo-500/15 rounded-full animate-[spin_8s_linear_infinite]" />
              
              <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full border border-violet-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse relative z-10">
                <Globe className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              <motion.div 
                animate={{ y: [-5, -25], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute px-1.5 py-0.5 bg-[#05050c] border border-violet-500/30 rounded-md text-[7px] font-mono text-violet-400 flex items-center gap-1 shadow-lg"
              >
                <Rocket className="w-2.5 h-2.5 text-violet-400" /> APP_LIVE_PUBLISHED
              </motion.div>

              <div className="absolute top-[20%] left-[25%] w-4 h-4 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center text-[8px] animate-bounce">🍏</div>
              <div className="absolute bottom-[20%] right-[25%] w-4 h-4 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center text-[8px] animate-[bounce_1.5s_infinite]">🤖</div>
            </div>
          )}

          {/* Step 7: SUPORTE */}
          {index === 6 && (
            <div className="relative flex flex-col items-center justify-center h-full max-h-[220px] w-full py-4">
              <div className="absolute w-32 h-32 border border-cyan-500/10 rounded-full animate-ping" />
              <div className="absolute w-24 h-24 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
              
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-950/40 to-sky-950/40 border-2 border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] z-10">
                <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>

              <div className="absolute bottom-[10%] px-2 py-0.5 bg-[#05050c] border border-cyan-500/20 rounded-md text-center shadow-lg relative z-20">
                <span className="text-[7px] font-bold text-white block">SISTEMA ATIVO</span>
                <span className="text-[6px] font-mono text-cyan-400 block mt-0.5">Uptime: 99.99%_</span>
              </div>
            </div>
          )}

        </div>
      </div>

    </motion.div>
  );
}

export default function StickyProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll of entire container to dynamically fill the left vertical bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(Math.max(0, Math.min(1, latest)));
  });

  const steps: Step[] = [
    {
      number: 1,
      tag: "DISCOVERY",
      title: "Entendimento da Necessidade",
      description: "Realizamos sessões de mapeamento para desvendar suas regras de negócio, dores operacionais e objetivos estratégicos. Alinhamos a visão de produto e desenhamos o escopo funcional perfeito.",
      icon: MessageSquare,
      color: "from-sky-400 to-blue-500",
      logs: [
        "Etapa 1",
        "✓ Reunião realizada",
        "✓ Objetivos definidos",
        "✓ Escopo inicial aprovado"
      ],
      highlights: ["🟢 Você participa", "🟢 Tudo alinhado"]
    },
    {
      number: 2,
      tag: "UI/UX DESIGN",
      title: "Protótipo Navegável",
      description: "Criamos um protótipo interativo para que você visualize, clique, teste, simule a jornada e aprove a experiência do sistema para sugestão ou alterações antes do desenvolvimento começar. (Essa demonstração não possui custo e é sem compromisso)",
      icon: Layers,
      color: "from-fuchsia-400 to-pink-500",
      logs: [
        "Etapa 2",
        "✓ Protótipo criado",
        "✓ Fluxos validados",
        "✓ Layout aprovado"
      ],
      highlights: ["🔵 Veja antes de desenvolver", "🔵 Aprove com segurança"]
    },
    {
      number: 3,
      tag: "ARCHITECT",
      title: "Planejamento e Escopo",
      description: "Organizamos todas as funcionalidades, definimos o escopo do projeto e planejamos a estrutura necessária para garantir um desenvolvimento organizado e eficiente. Enviamos um documento com toda a estrutura do projeto e o orçamento.",
      icon: Compass,
      color: "from-indigo-400 to-purple-500",
      logs: [
        "Etapa 3",
        "✓ Funcionalidades mapeadas",
        "✓ Estrutura planejada",
        "✓ Cronograma definido"
      ],
      highlights: ["🟣 Sem surpresas", "🟣 Tudo planejado"]
    },
    {
      number: 4,
      tag: "ENGINEERING",
      title: "Desenvolvimento Ágil",
      description: "Após a aprovação do protótipo, iniciamos o desenvolvimento do sistema utilizando tecnologias modernas, garantindo desempenho, segurança e escalabilidade.",
      icon: Terminal,
      color: "from-amber-400 to-orange-500",
      logs: [
        "Etapa 4",
        "✓ Desenvolvimento iniciado",
        "✓ Funcionalidades implementadas",
        "✓ Integrações concluídas"
      ],
      highlights: ["🟠 Desenvolvimento sob medida", "🟠 Acompanhamento constante"]
    },
    {
      number: 5,
      tag: "QUALITY ASSURANCE",
      title: "Testes de Homologação",
      description: "Antes da entrega, realizamos diversos testes para garantir que todas as funcionalidades estejam funcionando corretamente em diferentes dispositivos, testamos a segurança, comportamento e simulações para garantir robustez absoluta.",
      icon: Activity,
      color: "from-emerald-400 to-teal-500",
      logs: [
        "Etapa 5",
        "✓ Testes realizados",
        "✓ Ajustes aplicados",
        "✓ Sistema homologado"
      ],
      highlights: ["🟢 Tudo testado", "🟢 Pronto para uso"]
    },
    {
      number: 6,
      tag: "DEPLOYMENT",
      title: "Publicação Oficial",
      description: "Publicamos sua solução e realizamos toda a configuração necessária, de acordo com a sua preferência para que ela esteja disponível e funcionando com segurança.",
      icon: Rocket,
      color: "from-violet-500 to-purple-600",
      logs: [
        "Etapa 6",
        "✓ Publicação realizada",
        "✓ Domínio configurado",
        "✓ Sistema online"
      ],
      highlights: ["🟣 Publicação realizada", "🟣 Sistema disponível"]
    },
    {
      number: 7,
      tag: "EVOLUTION",
      title: "Suporte e Evolução",
      description: "Após a entrega, continuamos acompanhando o projeto com suporte técnico, melhorias e novas funcionalidades conforme a evolução da sua necessidade. (Consulte o prazo de suporte)",
      icon: ShieldCheck,
      color: "from-cyan-400 to-sky-500",
      logs: [
        "Etapa 7",
        "✓ Suporte ativo",
        "✓ Melhorias contínuas",
        "✓ Novas versões disponíveis"
      ],
      highlights: ["🔵 Suporte especializado", "🔵 Melhorias contínuas"]
    }
  ];

  const handleStepClick = (index: number) => {
    const targetElement = stepRefs.current[index];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  const registerRef = (el: any, index: number) => {
    stepRefs.current[index] = el;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#030306] select-none py-20 lg:py-32 overflow-visible"
    >
      {/* Decorative top divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Futuristic Background Grids and Halos */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Title & Introduction Header */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 xl:px-24 mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-widest font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Metodologia de Sucesso
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Do Entendimento à{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              Entrega Oficial
            </span>
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md font-sans font-light leading-relaxed">
          Nossa metodologia de 7 etapas garante que cada projeto seja desenvolvido com planejamento, transparência e acompanhamento em todas as fases. Role para conhecer nosso processo.
        </p>
      </div>

      {/* Main Steps Timeline Container Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        
        {/* LEFT STICKY TIMELINE TRACKER COLUMN */}
        <div className="hidden lg:block lg:col-span-1 sticky top-[180px] h-[60vh] flex flex-col items-center justify-between py-6">
          <div className="relative w-[3px] h-full bg-white/5 rounded-full">
            
            {/* Active Vertical Progress Filler Line */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-400 via-indigo-500 to-fuchsia-500 rounded-full origin-top"
              style={{ height: `${scrollProgress * 100}%` }}
            />
            
            {/* Navigational Clicking Node Markers on the Left */}
            <div className="absolute inset-0 flex flex-col justify-between -left-[6px] pointer-events-none">
              {steps.map((st, i) => {
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;
                return (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer pointer-events-auto bg-[#030306] z-10 ${
                      isCurrent 
                        ? "border-sky-400 scale-125 shadow-[0_0_12px_rgba(56,189,248,0.8)]" 
                        : isActive 
                          ? "border-indigo-500" 
                          : "border-white/10 hover:border-white/30"
                    }`}
                    title={`Ir para etapa ${st.number}`}
                  >
                    {isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT WORKSPACE COLUMN: Steps list stacked */}
        <div className="col-span-12 lg:col-span-11 space-y-12 lg:space-y-16">
          {steps.map((step, index) => (
            <StepBlock
              key={index}
              step={step}
              index={index}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              registerRef={registerRef}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
