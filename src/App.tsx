import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Phone, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Github, 
  Mail, 
  MessageCircle, 
  ArrowRight,
  CodeXml,
  Palette,
  Gauge,
  ShieldAlert,
  FileCode,
  Puzzle,
  Cpu,
  Sliders,
  ChevronsUp,
  HeartHandshake,
  Heart,
  BookOpen,
  CheckSquare,
  Users,
  Briefcase,
  Star,
  Zap,
  CheckCircle,
  Building,
  Church,
  Stethoscope,
  Ticket,
  LineChart,
  Boxes,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppItem, Solution, Project } from "./types";
import { 
  solutionsData, 
  stepsData, 
  differentialsData, 
  testimonialsData, 
  mockPortfolioProjects 
} from "./data";
import { AppSimulator } from "./components/AppSimulator";
import { SolutionDetails } from "./components/SolutionDetails";

const categoryStamps = [
  {
    id: "Saúde",
    name: "Saúde",
    icon: Stethoscope,
    ideas: "Prontuário eletrônico offline, agendamento interativo de consultas médicas, controle de escalas de plantão de secretários e médicos parceiros, visualização rápida de especialidades e anamnese."
  },
  {
    id: "Igreja",
    name: "Igreja",
    icon: Church,
    ideas: "Estudos bíblicos estruturados, controle de reuniões de pequenos grupos ou células, pedidos de oração em tempo real, mural administrativo de avisos e distribuição de devocionais offline."
  },
  {
    id: "Financeiro",
    name: "Financeiro",
    icon: LineChart,
    ideas: "Fluxo de caixa preditivo, controle mensal de cofrinho, planos de investimento em fases com metas, faturamento recorrente, comparação inteligente de orçamentos e cotações por categorias de gastos."
  },
  {
    id: "Evento",
    name: "Evento",
    icon: Ticket,
    ideas: "Leitura rápida de QR Code de ingressos para credenciamento offline, validação instantânea na portaria, controle interativo de presença e RSVP, exportação de lista de convidados em tempo real."
  },
  {
    id: "Educação",
    name: "Educação",
    icon: BookOpen,
    ideas: "Acompanhamento pedagógico, agendas escolares compartilhadas, controle offline de presenças em salas de aula, entrega rápida de tarefas com fotos ou arquivos anexos."
  },
  {
    id: "Empresa",
    name: "Empresa",
    icon: Building,
    ideas: "Portal corporativo de vistorias com checklists de campo e fotos, ordens de serviço geolocalizadas em tempo real, acompanhamento do progresso de equipes externas offline."
  }
];

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "portfolio">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Financeiro");
  
  // Real Apps loaded from disk
  const [apps, setApps] = useState<AppItem[]>([
    {
      id: "8-convencao-de-quartetos",
      name: "8ª Convenção De Quartetos",
      archiveName: "8ª-convenção-de-quartetos",
      entryPath: "apps/8-convencao-de-quartetos/index.html",
      type: "zip",
      size: 0
    },
    {
      id: "meu-casamento",
      name: "Meu Casamento",
      archiveName: "indexcasamento.html",
      entryPath: "indexcasamento.html",
      type: "zip",
      size: 0
    },
    {
      id: "app-painel-academico",
      name: "Painel Acadêmico",
      archiveName: "app-painel-academico",
      entryPath: "apps/app-painel-academico/index.html",
      type: "zip",
      size: 0
    }
  ]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Detail Sub-views
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [activeSimulatorProject, setActiveSimulatorProject] = useState<Project | null>(null);

  // Auto-scrolling helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getBaseUrl = () => {
    const loc = window.location;
    let base = "/";
    if (loc.hostname.endsWith("github.io")) {
      const segments = loc.pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        base = `/${segments[0]}/`;
      }
    } else {
      const path = loc.pathname;
      if (path.endsWith("/")) {
        base = path;
      } else {
        const lastSlashIndex = path.lastIndexOf("/");
        if (lastSlashIndex > 0) {
          base = path.slice(0, lastSlashIndex + 1);
        }
      }
    }
    return base;
  };

  // Fetch apps.json from public directory
  useEffect(() => {
    const baseUrl = getBaseUrl();
    fetch(`${baseUrl}apps.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Static apps.json list not available, trying relative base");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApps(data);
        } else if (data && Array.isArray(data.apps) && data.apps.length > 0) {
          setApps(data.apps);
        }
        setLoadingApps(false);
      })
      .catch((err) => {
        console.warn("Falling back to API list:", err.message);
        // Fallback endpoint
        fetch(`${baseUrl}api/apps`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.apps) && data.apps.length > 0) {
              setApps(data.apps);
            } else if (Array.isArray(data) && data.length > 0) {
              setApps(data);
            }
            setLoadingApps(false);
          })
          .catch((apiErr) => {
            console.error("Failed to load apps:", apiErr);
            setLoadingApps(false);
          });
      });
  }, []);

  // Icon mapper helper
  const getLucideIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "CodeXml": return <CodeXml className={className} />;
      case "Palette": return <Palette className={className} />;
      case "Gauge": return <Gauge className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "FileCode": return <FileCode className={className} />;
      case "Puzzle": return <Puzzle className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Sliders": return <Sliders className={className} />;
      case "ChevronsUp": return <ChevronsUp className={className} />;
      case "HeartHandshake": return <HeartHandshake className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getSolutionEmoji = (id: string) => {
    switch (id) {
      case "igrejas": return "📱";
      case "clinicas": return "🏥";
      case "eventos": return "🎟";
      case "financeiro": return "💰";
      case "empresarial": return "🏢";
      default: return "⚙";
    }
  };

  const handleSolutionCardClick = (sol: Solution) => {
    setSelectedSolution(sol);
    setActiveTab("solutions");
    scrollToTop();
  };

  const handleOpenDemo = (project: Project) => {
    setActiveSimulatorProject(project);
    scrollToTop();
  };

  const filteredProjects = mockPortfolioProjects.filter(
    (proj) => proj.category === selectedCategory
  );

  return (
    <div id="suite-hub-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] -left-40 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER / NAVIGATION BAR */}
      <header id="main-header" className="sticky top-0 z-40 bg-slate-950/80 border-b border-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <div 
            onClick={() => { setActiveTab("home"); setSelectedSolution(null); setActiveSimulatorProject(null); scrollToTop(); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-all">
              <img src="/icone.png" alt="Suite Hub Icon" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block">Suite Hub</span>
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest block leading-tight">Software Studio</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "home", label: "Início" },
              { id: "solutions", label: "Soluções" },
              { id: "portfolio", label: "Portfólio & Demos" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === "solutions") setSelectedSolution(null);
                  if (tab.id === "portfolio") setActiveSimulatorProject(null);
                  scrollToTop();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white border border-slate-800" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Contact Actions Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de conversar sobre um projeto com a Suite Hub.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-950/20 hover:shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              Falar no WhatsApp
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-2"
            >
              {[
                { id: "home", label: "Início" },
                { id: "solutions", label: "Soluções" },
                { id: "portfolio", label: "Portfólio & Demos" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === "solutions") setSelectedSolution(null);
                    if (tab.id === "portfolio") setActiveSimulatorProject(null);
                    setIsMobileMenuOpen(false);
                    scrollToTop();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold block ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white border border-slate-800"
                      : "text-slate-400 hover:bg-slate-900/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-900">
                <a
                  href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de falar com o atendimento da Suite Hub.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl"
                >
                  <Phone className="w-4 h-4" />
                  Atendimento WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE CONTENT SWITCHER */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INSTITUTIONAL HOME SCREEN */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              
              {/* HERO SECTION */}
              <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Left Intro texts */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold tracking-wide uppercase shadow-sm">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    Desenvolvimento de Apps Premium
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                    Aplicativos personalizados que transformam ideias em{" "}
                    <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                      soluções reais.
                    </span>
                  </h1>

                  <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Na Suite Hub desenvolvemos aplicativos modernos para empresas, igrejas, clínicas, eventos e profissionais que desejam digitalizar processos e crescer através da tecnologia.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                    <a
                      href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu projeto com a Suite Hub.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-950/20 hover:shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Solicitar Orçamento via WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => { setActiveTab("solutions"); setSelectedSolution(null); scrollToTop(); }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Conhecer Soluções
                    </button>
                  </div>
                </div>

                {/* Hero Right Composition / Smartphone Simulation Graphic */}
                <div className="lg:col-span-5 flex justify-center relative">
                  
                  {/* Decorative outer circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Elegant static mockup frame with generated realistic mobile dashboards (fully CSS based) */}
                  <div className="w-[280px] h-[520px] bg-slate-950 border-[6px] border-slate-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3.5 select-none">
                    {/* Speaker notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-xl" />
                    
                    {/* Status panel */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1.5 px-1.5">
                      <span>15:14</span>
                      <span>SuiteHub LTE</span>
                    </div>

                    {/* Fictional Dashboard Mockup Content inside the Phone */}
                    <div className="flex-1 mt-4 flex flex-col justify-between overflow-hidden">
                      <div className="space-y-4">
                        {/* Title block */}
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-sky-600/20 rounded-lg text-sky-400 flex items-center justify-center text-xs font-bold">SH</div>
                          <div>
                            <span className="text-[10px] font-bold text-white block">Suite Hub Admin</span>
                            <span className="text-[7px] text-emerald-400 block font-semibold">● Sistema Conectado</span>
                          </div>
                        </div>

                        {/* Dummy charts bar widget */}
                        <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl space-y-1.5">
                          <span className="text-[8px] text-slate-500 block">DESEMPENHO DA OPERAÇÃO</span>
                          <div className="flex justify-between items-end h-12 gap-1 px-1">
                            <div className="w-2.5 h-[40%] bg-sky-600 rounded-t-xs" />
                            <div className="w-2.5 h-[65%] bg-sky-600 rounded-t-xs" />
                            <div className="w-2.5 h-[85%] bg-indigo-500 rounded-t-xs" />
                            <div className="w-2.5 h-[50%] bg-sky-600 rounded-t-xs" />
                            <div className="w-2.5 h-[95%] bg-emerald-500 rounded-t-xs" />
                          </div>
                        </div>

                        {/* Simulated interactive list */}
                        <div className="space-y-1.5">
                          <span className="text-[8px] text-slate-500 block uppercase">Próximos Compromissos</span>
                          <div className="p-2 bg-slate-900 border border-slate-850 rounded-lg flex justify-between items-center text-[8px]">
                            <div>
                              <span className="font-bold text-slate-300 block">Dra. Ana Cláudia</span>
                              <span className="text-slate-500">Cardiologia • Amanhã</span>
                            </div>
                            <span className="px-1 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">14:00</span>
                          </div>
                          <div className="p-2 bg-slate-900 border border-slate-850 rounded-lg flex justify-between items-center text-[8px]">
                            <div>
                              <span className="font-bold text-slate-300 block">Culto de Celebração</span>
                              <span className="text-slate-500">Mural • Quarta-feira</span>
                            </div>
                            <span className="px-1 py-0.5 bg-sky-500/10 text-sky-400 rounded">19:30</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA button inside phone */}
                      <button 
                        onClick={() => { setActiveTab("portfolio"); scrollToTop(); }}
                        className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[9px] rounded-lg transition-all"
                      >
                        Experimentar Demonstrações Ativas
                      </button>
                    </div>

                    {/* Bottom pill bar */}
                    <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto" />
                  </div>

                  {/* Absolute Badge Card floating */}
                  <div className="absolute -bottom-4 -right-2 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 max-w-[180px]">
                    <span className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
                      <Zap className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Demonstrações</span>
                      <span className="text-xs font-bold text-white block mt-0.5">Testar Apps na Hora!</span>
                    </div>
                  </div>

                </div>

              </section>

              {/* OVERVIEW / SUMMARY STATS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-900/40 border border-slate-900 rounded-3xl text-center backdrop-blur-md">
                {[
                  { value: "100%", label: "Desenvolvimento Personalizado" },
                  { value: "07", label: "Etapas do Planejamento" },
                  { value: "20+", label: "Módulos Prontos para Uso" },
                  { value: "Zero", label: "Custos de Licenças de Terceiros" }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1 py-2 border-r border-slate-950/20 last:border-0">
                    <div className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* SOBRE SECTION */}
              <section id="sobre" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Decorative visual */}
                <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                  <div className="relative p-2 bg-slate-900/40 border border-slate-850 rounded-3xl w-full max-w-sm">
                    {/* Aesthetic layout illustration */}
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-900 text-center space-y-4">
                      <div className="h-16 flex items-center justify-center mx-auto mb-2">
                        <img src="/logo.png" alt="Suite Hub Logo" className="max-h-full max-w-[180px] object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.2)]" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Nosso Diferencial Técnico</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Escrevemos códigos sob medida de alto desempenho, eliminando dependências que cobram taxas abusivas e garantindo propriedade intelectual integral para o seu negócio.
                      </p>
                      <div className="flex justify-center gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] text-slate-400">React Native</span>
                        <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] text-slate-400">NodeJS</span>
                        <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] text-slate-400">Google Cloud</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About content */}
                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Quem Somos
                  </div>
                  
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                    Olá! Somos a Suite Hub.
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Desenvolvemos aplicativos personalizados para empresas e organizações que desejam modernizar processos, aumentar produtividade e oferecer uma melhor experiência aos seus clientes.
                  </p>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Cada projeto é desenvolvido sob medida, com foco em design, usabilidade, desempenho e tecnologia. Não usamos templates genéricos ou amarras que limitam o crescimento da sua empresa: somos engenheiros de software focados em construir valor duradouro para seu negócio.
                  </p>

                  <div className="pt-4 flex items-center gap-2">
                    <button
                      onClick={() => { setActiveTab("portfolio"); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <span>Ver depoimentos de parceiros</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </section>

              {/* NOSSAS SOLUÇÕES CATEGORIES */}
              <section id="solucoes-grid" className="space-y-10">
                
                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                    Portfólio de Soluções
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Nossas Soluções Sob Medida
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Explore as categorias de aplicativos de base prontas para aceleração ou solicite um projeto totalmente único desenhado do zero para sua operação.
                  </p>
                </header>

                {/* Grid of 6 categories requested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solutionsData.slice(0, 6).map((sol) => (
                    <div
                      key={sol.id}
                      className="group p-6 bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 hover:border-sky-500/40 rounded-2xl transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"
                    >
                      {/* Ambient micro-glow */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/5 rounded-full blur-xl group-hover:bg-sky-500/10 transition-colors pointer-events-none" />

                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shadow">
                          {getSolutionEmoji(sol.id)}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                            {sol.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                            {sol.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => handleSolutionCardClick(sol)}
                          className="w-full py-2 bg-slate-950 group-hover:bg-sky-600/10 text-slate-300 group-hover:text-sky-400 font-bold text-[11px] rounded-lg border border-slate-800 group-hover:border-sky-500/30 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Ver Detalhes do Catálogo
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* COMO TRABALHAMOS (TIMELINE ELEGANT) */}
              <section id="trabalho-timeline" className="space-y-12">
                
                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Como Trabalhamos
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Do Entendimento à Entrega Oficial
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Seguimos uma metodologia ágil focada em transparência, qualidade de código e conformidade de prazos.
                  </p>
                </header>

                {/* Elegante timeline row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative">
                  {stepsData.map((step) => (
                    <div 
                      key={step.number} 
                      className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4 relative hover:border-slate-700 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-sky-600/15 text-sky-400 border border-sky-500/30 flex items-center justify-center font-black text-xs">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">{step.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </section>

              {/* DIFERENCIAIS SECTION */}
              <section id="diferenciais" className="space-y-12">
                
                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                    Nossos Diferenciais
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Por que escolher a Suite Hub?
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Combinamos a agilidade de módulos de software pré-construídos com o requinte do design exclusivo e o desempenho do código sob medida.
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {differentialsData.map((dif, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 bg-slate-900/40 border border-slate-850 hover:border-slate-800 rounded-xl space-y-3 transition-all duration-200"
                    >
                      <div className="p-2.5 bg-slate-950 border border-slate-850 rounded-lg text-sky-400 inline-block">
                        {getLucideIcon(dif.icon, "w-5 h-5")}
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">{dif.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{dif.description}</p>
                    </div>
                  ))}
                </div>

              </section>

              {/* DEPOIMENTOS DE CLIENTES */}
              <section id="depoimentos" className="space-y-12">
                
                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Depoimentos Reais
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    O que dizem os nossos parceiros
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Veja como ajudamos líderes religiosos, médicos e coordenadores de eventos a expandirem seus negócios por meio de software premium.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonialsData.map((test) => (
                    <div 
                      key={test.id} 
                      className="p-6 bg-slate-900/30 border border-slate-850 rounded-2xl flex flex-col justify-between space-y-6 relative"
                    >
                      {/* Quote Mark Decoration */}
                      <span className="absolute top-4 right-6 text-sky-500/10 text-5xl font-serif select-none pointer-events-none">“</span>
                      
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{test.content}"
                      </p>

                      <div className="flex items-center gap-3 border-t border-slate-900 pt-4">
                        <img 
                          src={test.avatar} 
                          alt={test.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-800"
                        />
                        <div>
                          <span className="text-xs font-bold text-white block">{test.name}</span>
                          <span className="text-[10px] text-slate-500 block">{test.role} • {test.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </section>

              {/* CALL TO ACTION CHAMPION BLOCK */}
              <section id="chamada-final" className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900 to-sky-950/20 p-8 md:p-14 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
                  Sua ideia merece um aplicativo profissional.
                </h2>

                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Conte com a Suite Hub para desenvolver uma solução moderna, inovadora e robusta para seu negócio.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                  <a
                    href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu aplicativo personalizado com a Suite Hub.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center justify-center"
                  >
                    Solicitar Orçamento
                  </a>
                  <a
                    href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de falar no WhatsApp com a Suite Hub.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 font-bold text-xs rounded-xl transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Falar no WhatsApp
                  </a>
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB 2: CATÁLOGO DE SOLUÇÕES (DETALHADO OU GRID) */}
          {activeTab === "solutions" && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              
              {selectedSolution ? (
                // Detailed Solution view
                <SolutionDetails 
                  solution={selectedSolution} 
                  onBack={() => setSelectedSolution(null)} 
                />
              ) : (
                // Standard Grid of solutions catalog
                <div className="space-y-12">
                  <header className="space-y-3">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Catálogo Completo</span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Explore Nosso Catálogo de Soluções
                    </h2>
                    <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
                      Selecione uma das nossas soluções robustas de baseline para entender suas funcionalidades fundamentais, benefícios e recursos de destaque.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutionsData.map((sol) => (
                      <div 
                        key={sol.id} 
                        className="bg-slate-900/30 border border-slate-850 hover:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all"
                      >
                        <div className="space-y-4">
                          <div className="w-10 h-10 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center text-lg">
                            {getSolutionEmoji(sol.id)}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white">{sol.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed mt-1.5 line-clamp-3">
                              {sol.description}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-slate-900/60 pt-4 text-xs">
                          <button
                            onClick={() => { setSelectedSolution(sol); scrollToTop(); }}
                            className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] rounded-lg transition-all cursor-pointer"
                          >
                            Ver Solução Detalhada
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: PORTFÓLIO & SIMULADORES INTERATIVOS */}
          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {activeSimulatorProject ? (
                // Immersive Device Simulation panel active
                <AppSimulator 
                  project={activeSimulatorProject}
                  realApp={activeSimulatorProject.iframeAppId ? (apps.find(a => a.id === activeSimulatorProject.iframeAppId) || {
                    id: activeSimulatorProject.iframeAppId,
                    name: activeSimulatorProject.name,
                    archiveName: activeSimulatorProject.iframeAppId === "meu-casamento" 
                      ? "indexcasamento.html" 
                      : activeSimulatorProject.iframeAppId === "app-painel-academico"
                        ? "app-painel-academico"
                        : "8ª-convenção-de-quartetos",
                    entryPath: activeSimulatorProject.iframeAppId === "meu-casamento" 
                      ? "indexcasamento.html" 
                      : activeSimulatorProject.iframeAppId === "app-painel-academico"
                        ? "apps/app-painel-academico/index.html"
                        : "apps/8-convencao-de-quartetos/index.html",
                    type: "zip",
                    size: 0
                  }) : null}
                  onBack={() => setActiveSimulatorProject(null)}
                />
              ) : (
                // Gallery of available projects with "Experimentar Demonstração"
                <div className="space-y-12">
                  <header className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5" />
                      Laboratório Interativo de Demos
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Explore Nossos Aplicativos por Verticais
                    </h2>
                    <p className="text-slate-400 text-sm max-w-4xl leading-relaxed">
                      Selecione um selo para visualizar nossas soluções. Toque em <strong className="text-sky-400">Experimentar Demonstração</strong> no aplicativo para abrir um simulador completo e interativo no seu navegador.
                    </p>
                  </header>

                  {/* Category Stamps Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categoryStamps.map((stamp) => {
                      const IconComponent = stamp.icon;
                      const isSelected = selectedCategory === stamp.id;
                      return (
                        <button
                          key={stamp.id}
                          onClick={() => setSelectedCategory(stamp.id)}
                          className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 text-center gap-3 group relative cursor-pointer ${
                            isSelected
                              ? "bg-sky-500/10 border-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                              : "bg-slate-900/30 border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className={`p-3 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-sky-500/20 border-sky-400/30 text-sky-400 scale-110"
                              : "bg-slate-950 border-slate-900 text-slate-500 group-hover:text-slate-300"
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold tracking-wide uppercase">{stamp.name}</span>
                          
                          {/* Selected indicator dot */}
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500"></span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Filtered Projects Grid or Empty State */}
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {filteredProjects.map((proj) => (
                        <div 
                          key={proj.id} 
                          className="group bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 hover:border-sky-500/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                        >
                          {/* Picture area */}
                          <div className="relative h-44 overflow-hidden border-b border-slate-950">
                            <img 
                              src={proj.image.startsWith("/") ? `${getBaseUrl()}${proj.image.slice(1)}` : proj.image} 
                              alt={proj.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-950/90 border border-slate-800 rounded-md text-[9px] font-bold text-sky-400 uppercase">
                              {proj.category}
                            </span>
                          </div>

                          {/* Text details */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-2">
                              <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                                {proj.name}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                {proj.description}
                              </p>
                            </div>

                            {/* Features bullets inside cards */}
                            <div className="space-y-2">
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Recursos Inclusos:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.features.slice(0, 3).map((f, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-slate-950 rounded text-[9px] text-slate-300 border border-slate-900">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-xs gap-4">
                              <div className="flex flex-wrap gap-1 shrink-0">
                                {proj.tech.slice(0, 2).map((t, idx) => (
                                  <span key={idx} className="text-[8px] font-mono text-slate-500">#{t}</span>
                                ))}
                              </div>
                              
                              <button
                                onClick={() => handleOpenDemo(proj)}
                                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] rounded-lg shadow-md transition-all shrink-0 cursor-pointer"
                              >
                                Experimentar Demonstração
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Beautiful Empty State / Vertical Information Card */
                    <div className="bg-slate-900/20 border border-dashed border-slate-800/80 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
                      <div className="mx-auto w-16 h-16 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-500 shadow-inner">
                        {(() => {
                          const activeStamp = categoryStamps.find(s => s.id === selectedCategory);
                          const ActiveIcon = activeStamp ? activeStamp.icon : Sparkles;
                          return <ActiveIcon className="w-7 h-7 text-sky-400" />;
                        })()}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white">Aplicativo {categoryStamps.find(s => s.id === selectedCategory)?.name} Sob Medida</h3>
                        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                          Não possuímos uma demonstração genérica ativa no laboratório para esta vertical neste exato momento, mas criamos soluções de alta fidelidade integradas com Firebase/Firestore 100% personalizadas.
                        </p>
                      </div>

                      {/* Displaying target ideas */}
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 text-left max-w-xl mx-auto space-y-3">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">O que desenvolvemos nesta vertical:</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {categoryStamps.find(s => s.id === selectedCategory)?.ideas}
                        </p>
                      </div>

                      <div className="pt-2">
                        <a
                          href="https://wa.me/5551989445103"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/15 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Fale Conosco no WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Zipped static files fallback info banner */}
                  {apps.length > 0 && (
                    <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                          <Boxes className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Pacotes Reais Instalados</span>
                          <span className="text-[10px] text-slate-400 leading-none">Identificamos {apps.length} demonstrações estáticas extraídas diretamente no disco do seu workspace.</span>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">✓ Sandbox pronta</span>
                    </div>
                  )}

                </div>
              )}

            </motion.div>
          )}

          {/* TAB 4: INTERACTIVE BUDGET CALCULATOR REMOVED */}

        </AnimatePresence>

      </main>

      {/* FOOTER SECTION */}
      <footer id="main-footer" className="bg-slate-950 border-t border-slate-900/80 mt-24 py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Footer branding */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
                <img src="/icone.png" alt="Suite Hub Icon" className="w-full h-full object-contain p-0.5" referrerPolicy="no-referrer" />
              </div>
              <span className="text-base font-bold text-white">Suite Hub</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Desenvolvemos aplicativos sob medida para negócios digitais, igrejas, clínicas e startups que desejam crescer através da engenharia de software premium.
            </p>
            <div className="flex items-center gap-3 text-slate-500 text-xs">
              <a href="https://wa.me/5511972499370" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              <span>•</span>
              <a href="mailto:contato@suitehub.com" className="hover:text-white transition-colors">contato@suitehub.com</a>
            </div>
          </div>

          {/* Column Links 1 */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Links Rápidos</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => { setActiveTab("home"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("solutions"); setSelectedSolution(null); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Catálogo de Soluções
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("portfolio"); setActiveSimulatorProject(null); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Portfólio & Demonstrações
                </button>
              </li>
            </ul>
          </div>

          {/* Column Links 2 */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Módulos em Destaque</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Pix Dinâmico Integrado</li>
              <li>WhatsApp Hub CRM</li>
              <li>Notificações Push inteligentes</li>
              <li>Painéis Administrativos Completos</li>
            </ul>
          </div>

          {/* Column contacts details */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Software Studio</h5>
            <span className="text-[10px] text-emerald-400 block font-bold uppercase tracking-wider">● ONLINE</span>
            <span className="text-[10px] text-slate-500 block leading-relaxed">Fale agora no chat comercial para acelerar seu protótipo figma de forma 100% gratuita!</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/60 mt-12 pt-8 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Suite Hub Software Studio • Todos os direitos reservados.</span>
          <span>Desenvolvido sob medida com React, Vite e Tailwind CSS v4</span>
        </div>
      </footer>

    </div>
  );
}
