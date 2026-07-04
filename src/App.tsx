import { useState, useEffect, useRef } from "react";
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
  Settings,
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
  Lock,
  Globe,
  Database,
  ArrowUpRight,
  Terminal,
  Activity,
  Workflow
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
import StickyProcess from "./components/StickyProcess";

// High-tech category stamps for the interactive demo hub
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
  // Navigation & filtering states
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "portfolio">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Financeiro");
  
  // Real Apps loaded from disk / static apps.json list
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

  // Starfield simulation state (CosmoQ Starfield particles)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; speed: number }[]>([]);

  // Telemetry real clock
  const [systemTime, setSystemTime] = useState("");

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
      base = "/";
    }
    return base;
  };

  const getAssetUrl = (path: string) => {
    if (!path) return "";
    const base = getBaseUrl();
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}${cleanPath}`;
  };

  // Generate stars and update telemetry clock
  useEffect(() => {
    const generatedStars = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.8 ? 3 : Math.random() > 0.4 ? 2 : 1,
      delay: Math.random() * 5,
      speed: 3 + Math.random() * 5
    }));
    setStars(generatedStars);

    const updateClock = () => {
      const now = new Date();
      setSystemTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch apps.json from public directory or fallback
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
      case "Church": return <Church className={className} />;
      case "Stethoscope": return <Stethoscope className={className} />;
      case "Ticket": return <Ticket className={className} />;
      case "Building": return <Building className={className} />;
      case "Settings": return <Settings className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getSolutionEmoji = (id: string) => {
    switch (id) {
      case "igrejas": return "⛪";
      case "clinicas": return "🏥";
      case "eventos": return "🎟️";
      case "financeiro": return "💰";
      case "empresarial": return "🏢";
      default: return "⚡";
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

  // Scroll Animations Config (different types for different sections)
  const animFadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const animStaggerContainer = {
    initial: {},
    whileInView: {},
    viewport: { once: true, margin: "-80px" },
    transition: { staggerChildren: 0.1 }
  };

  const animScaleReveal = {
    initial: { opacity: 0, scale: 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, type: "spring", stiffness: 80, damping: 15 }
  };

  const anim3DCardReveal = (idx: number) => { return {
    initial: { opacity: 0, rotateX: 22, y: 40 },
    whileInView: { opacity: 1, rotateX: 0, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }
  }; };

  const animAlternatingReveal = (idx: number) => { return {
    initial: { opacity: 0, x: idx % 2 === 0 ? -45 : 45 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }
  }; };

  return (
    <div id="suite-hub-root" className="min-h-screen bg-[#030306] text-slate-100 font-sans selection:bg-sky-500 selection:text-white overflow-x-clip relative">
      
      {/* 1. ATMOSPHERIC STAR PARTICLE FIELD BACKDROP */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <div 
            key={star.id}
            className={`${star.size === 3 ? "space-star-lg" : "space-star"}`}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.speed}s`
            }}
          />
        ))}
      </div>

      {/* 2. DOTTED CYBER GRID SYSTEM OVERLAY */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0" />

      {/* 3. THIN LINE STRUT SYSTEM (CosmoQ signature framework layout) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Vertical alignment line struts */}
        <div className="absolute left-[10%] top-0 bottom-0 grid-line-y opacity-30" />
        <div className="absolute left-[25%] top-0 bottom-0 grid-line-y opacity-15 hidden lg:block" />
        <div className="absolute right-[25%] top-0 bottom-0 grid-line-y opacity-15 hidden lg:block" />
        <div className="absolute right-[10%] top-0 bottom-0 grid-line-y opacity-30" />
      </div>

      {/* 4. NEBULA GRADIENT GLOW ORBS (Immersive cosmic sky ambient) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[1800px] left-10 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[300px] right-10 w-[700px] h-[700px] bg-fuchsia-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* HEADER / PREMIUM HUD NAVIGATION */}
      <header id="main-header" className="sticky top-0 z-50 bg-[#030306]/65 border-b border-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] select-none">
        
        {/* Accent neon strip top */}
        <div className="h-[2px] w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
          
          {/* Logo brand */}
          <div 
            onClick={() => { setActiveTab("home"); setSelectedSolution(null); setActiveSimulatorProject(null); scrollToTop(); }}
            className="flex items-center gap-3 cursor-pointer group z-10 pl-0 xl:pl-20"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:scale-105 group-hover:border-sky-500/40 transition-all duration-300 backdrop-blur-md relative">
              <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-sky-500/15 transition-colors" />
              <img src={getAssetUrl("/icone.png")} alt="Suite Hub Icon" className="w-full h-full object-contain p-1.5 relative z-10" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-display font-black tracking-wider text-white group-hover:text-sky-400 transition-colors">SUITE HUB</span>
              </div>
              <span className="text-[9px] text-slate-500 font-sans uppercase tracking-wider block leading-tight">Software Studio</span>
            </div>
          </div>

          {/* Desktop Navigation (Sleek minimalist capsules) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-2 py-1.5 rounded-full backdrop-blur-md">
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
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.15)]" 
                    : "text-slate-400 hover:text-slate-200 border border-transparent hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Contact Actions Button */}
          <div className="hidden md:flex items-center gap-4 z-10 pr-0 xl:pr-20">
            <div className="text-right hidden lg:block font-sans">
              <span className="text-[9px] text-slate-500 block uppercase tracking-wider">Atendimento ágil</span>
              <span className="text-[10px] text-sky-400 font-bold block uppercase tracking-wide">
                Fale Conosco
              </span>
            </div>
            <a
              href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de conversar sobre um projeto com a Suite Hub.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl shadow-lg shadow-sky-950/40 hover:shadow-sky-500/25 border border-sky-400/20 hover:scale-103 transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Comercial
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
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
              className="md:hidden border-t border-white/5 bg-[#030306]/95 backdrop-blur-xl px-4 py-5 space-y-3 shadow-2xl"
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
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold block transition-all ${
                    activeTab === tab.id
                      ? "bg-sky-500/10 text-white border border-sky-500/20"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <a
                  href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de falar com o atendimento da Suite Hub.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl"
                >
                  <Phone className="w-4 h-4" />
                  Atendimento WhatsApp
                </a>
                <div className="flex justify-between items-center px-4 pt-2 text-[10px] text-slate-500 font-sans">
                  <span>Atendimento em Tempo Real</span>
                  <span>{systemTime}</span>
                </div>
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
              transition={{ duration: 0.35 }}
              className="space-y-28 md:space-y-36"
            >
              
              {/* 5. HERO SECTION WITH RADIAL ORBITS (Mirrors CosmoQ layout) */}
              <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative min-h-[70vh]">
                
                {/* Horizontal line divider on top */}
                <div className="absolute top-[-30px] left-0 right-0 grid-line-x opacity-15" />

                {/* Left block - Outstanding typography & badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10"
                >
                  {/* Glowing custom pill badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(56,189,248,0.1)] backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    DESENVOLVIMENTO DE APPS PREMIUM
                  </div>
                  
                  {/* Majestic Display Title (Outfit font) */}
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight text-white leading-tight">
                    Aplicativos personalizados que transformam ideias em{" "}
                    <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.2)]">
                      soluções reais.
                    </span>
                  </h1>

                  <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                    Na Suite Hub, desenvolvemos aplicativos modernos para empresas, igrejas, clínicas, eventos e profissionais que desejam digitalizar processos e crescer através de engenharia de software de ponta.
                  </p>

                  {/* High-end micro-features row */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[10px] text-slate-500 font-mono pt-2">
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-sky-400" /> SEM CUSTO DE LICENÇA</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-sky-400" /> FIRESTORE ESCALÁVEL</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-sky-400" /> DESIGN EXCLUSIVO</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <motion.a
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu projeto com a Suite Hub.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/15 hover:shadow-sky-500/25 transition-all duration-300 flex items-center justify-center gap-2 border border-sky-400/20 cursor-pointer"
                    >
                      Solicitar Orçamento via WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                    
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setActiveTab("solutions"); setSelectedSolution(null); scrollToTop(); }}
                      className="w-full sm:w-auto px-7 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-md shadow-inner hover:text-white"
                    >
                      Conhecer Soluções
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right block - Floating mockup device surrounded by space rings */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex justify-center relative min-h-[550px] items-center"
                >
                  
                  {/* Concentric rotating orbits (CosmoQ visual engine) */}
                  <div className="orbit-ring w-[440px] h-[440px] opacity-25" />
                  <div className="orbit-ring-fast w-[340px] h-[340px] opacity-35" />
                  <div className="absolute w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Elegant floating mockup console frame */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.03, rotateY: 8, rotateX: 4 }}
                    style={{ perspective: 1000 }}
                    className="w-[285px] h-[530px] bg-[#05050a]/80 border-[5px] border-white/10 rounded-[2.8rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between p-4 select-none backdrop-blur-2xl"
                  >
                    {/* Speaker capsule notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-900 rounded-b-2xl border-b border-white/5 z-20" />
                    
                    {/* Status panel bar */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1 px-1 z-10">
                      <span>15:14</span>
                      <span className="text-sky-400">● SH_LTE_CONNECTED</span>
                    </div>

                    {/* Simulated mobile screen interface */}
                    <div className="flex-1 mt-4 flex flex-col justify-between overflow-hidden relative">
                      
                      {/* Grid background inside mock screen */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                      <div className="space-y-4 relative z-10">
                        {/* Custom logo banner inside phone */}
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                          <div className="w-7 h-7 bg-sky-600/20 border border-sky-400/30 rounded-lg text-sky-400 flex items-center justify-center text-xs font-bold font-display">S</div>
                          <div>
                            <span className="text-[10px] font-bold text-white block tracking-wide">Suite Hub Admin</span>
                            <span className="text-[7px] text-emerald-400 block font-mono font-medium tracking-wider">DATABASE_SYNCED_OK</span>
                          </div>
                        </div>

                        {/* Fictional operating chart */}
                        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl space-y-2 backdrop-blur-md">
                          <div className="flex justify-between items-center">
                            <span className="text-[7px] text-slate-500 font-mono tracking-widest uppercase">Estatísticas da Operação</span>
                            <span className="text-[8px] text-sky-400 font-bold font-mono">98.2% EFF</span>
                          </div>
                          <div className="flex justify-between items-end h-14 gap-1.5 px-0.5">
                            <div className="w-3 h-[30%] bg-sky-600/40 rounded-t-sm" />
                            <div className="w-3 h-[55%] bg-sky-600/70 rounded-t-sm" />
                            <div className="w-3 h-[80%] bg-indigo-500 rounded-t-sm" />
                            <div className="w-3 h-[45%] bg-sky-500 rounded-t-sm" />
                            <div className="w-3 h-[95%] bg-emerald-500 rounded-t-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                          </div>
                        </div>

                        {/* Simulated list of items inside device */}
                        <div className="space-y-2">
                          <span className="text-[7px] text-slate-500 font-mono block uppercase tracking-widest">Painel Operacional</span>
                          
                          <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center text-[8px] hover:border-sky-500/20 transition-all">
                            <div>
                              <span className="font-bold text-slate-200 block">Dra. Ana Cláudia</span>
                              <span className="text-slate-500 text-[7px] font-mono">Clínicas • Agendamento Ativo</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono font-bold">14:00</span>
                          </div>

                          <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center text-[8px] hover:border-sky-500/20 transition-all">
                            <div>
                              <span className="font-bold text-slate-200 block">Credenciamento RSVP</span>
                              <span className="text-slate-500 text-[7px] font-mono">Eventos • Leitor de QR Code</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded font-mono font-bold">ACTIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Main bottom launcher click */}
                      <button 
                        onClick={() => { setActiveTab("portfolio"); scrollToTop(); }}
                        className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-[9px] uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-sky-500/20 cursor-pointer z-10"
                      >
                        Abrir Laboratório de Demos
                      </button>
                    </div>

                    {/* Fictional Home pill indicator */}
                    <div className="w-20 h-1 bg-slate-800 rounded-full mx-auto mt-2" />
                  </motion.div>

                  {/* Absolute Cyber Badge Card floating */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -right-2 bg-[#05050a]/90 border border-white/10 p-3.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 max-w-[190px] backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300"
                  >
                    <span className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl shadow-inner">
                      <Zap className="w-5 h-5 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono block tracking-widest">DEMOS</span>
                      <span className="text-[11px] font-bold text-white block mt-0.5 font-display">Simuladores Ativos</span>
                    </div>
                  </motion.div>

                  {/* Fictional Crosshairs */}
                  <div className="absolute top-10 left-10 text-slate-700 font-mono text-[9px] select-none pointer-events-none">+ SEC_A9</div>
                  <div className="absolute bottom-12 left-4 text-slate-700 font-mono text-[9px] select-none pointer-events-none">+ SH_GND</div>

                </motion.div>
              </section>

              {/* 6. OVERVIEW / STATS HUD ROW (Bento design) */}
              <motion.div 
                {...animFadeInUp}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 glass-card rounded-3xl text-center shadow-2xl relative overflow-hidden glass-reflection border border-white/10"
              >
                {/* Decorative background grid node line */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none" />

                {[
                  { value: "100%", label: "DESENVOLVIMENTO SOB MEDIDA", sub: "Sem templates genéricos" },
                  { value: "07", label: "ETAPAS DO PROCESSO ÁGIL", sub: "Garantia de ponta a ponta" },
                  { value: "20+", label: "MÓDULOS TECNOLÓGICOS", sub: "Aceleração de entrega" },
                  { value: "Zero", label: "CUSTOS DE LICENCIAMENTO", sub: "Propriedade intelectual livre" }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1.5 py-3 border-r border-white/5 last:border-0 relative z-10 px-2">
                    <div className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 tracking-tight neon-glow-text">{stat.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-300 font-bold uppercase tracking-wider font-mono">{stat.label}</div>
                    <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium font-sans leading-none">{stat.sub}</div>
                  </div>
                ))}
              </motion.div>

              {/* 7. SOBRE SECTION WITH PULSING SVG NODE NETWORK DIAGRAM */}
              <section id="sobre" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
                
                {/* Visual Section Line strut */}
                <div className="absolute top-[-50px] left-0 right-0 grid-line-x opacity-10" />

                {/* Left side - Spectacular interactive cyber node network diagram (UX phenomenon!) */}
                <motion.div 
                  variants={animScaleReveal}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:col-span-5 flex justify-center order-2 lg:order-1"
                >
                  <div className="p-1 bg-white/5 border border-white/10 rounded-3xl w-full max-w-sm backdrop-blur-xl relative overflow-hidden group shadow-2xl glowing-hover-card">
                    {/* Glowing card reflection glass */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="bg-[#050508]/90 p-6 rounded-[1.4rem] border border-white/5 text-center space-y-6 relative z-10">
                      
                      {/* Floating System Header */}
                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 border-b border-white/5 pb-2">
                        <span>SYSTEM SCHEMA</span>
                        <span className="text-sky-400">ACTIVE NETWORKING</span>
                      </div>

                      {/* Breathtaking SVG Node Connection Diagram (Pulsing Lines, Glowing circles) */}
                      <div className="relative h-56 w-full bg-[#030305]/50 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-2">
                        
                        {/* Dynamic SVG canvas */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          {/* Pulsing connections lines */}
                          <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
                          <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1.5" />
                          <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
                          <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1.5" />

                          {/* Interactive particle pulsing glow points traveling along paths */}
                          <circle r="3" fill="#38bdf8" className="animate-pulse">
                            <animateMotion dur="3s" repeatCount="indefinite" path="M 120,112 L 36,44" />
                          </circle>
                          <circle r="3" fill="#818cf8" className="animate-pulse">
                            <animateMotion dur="4s" repeatCount="indefinite" path="M 120,112 L 204,44" />
                          </circle>
                          <circle r="3" fill="#38bdf8" className="animate-pulse">
                            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 120,112 L 36,180" />
                          </circle>
                          <circle r="3" fill="#818cf8" className="animate-pulse">
                            <animateMotion dur="4.5s" repeatCount="indefinite" path="M 120,112 L 204,180" />
                          </circle>
                        </svg>

                        {/* Central Hub Node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border-2 border-sky-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] z-10 animate-pulse">
                          <Cpu className="w-6 h-6 text-sky-400" />
                        </div>

                        {/* Peripheral Node 1 - PWA offline */}
                        <div className="absolute top-[10%] left-[5%] p-2 bg-[#05050a] border border-white/10 rounded-lg shadow-lg z-10 flex items-center gap-1 hover:border-sky-500/40 transition-colors">
                          <Globe className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-[7px] font-mono text-slate-300">PWA_OFFLINE</span>
                        </div>

                        {/* Peripheral Node 2 - Firestore */}
                        <div className="absolute top-[10%] right-[5%] p-2 bg-[#05050a] border border-white/10 rounded-lg shadow-lg z-10 flex items-center gap-1 hover:border-sky-500/40 transition-colors">
                          <Database className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-[7px] font-mono text-slate-300">FIRESTORE</span>
                        </div>

                        {/* Peripheral Node 3 - Admin Panel */}
                        <div className="absolute bottom-[10%] left-[5%] p-2 bg-[#05050a] border border-white/10 rounded-lg shadow-lg z-10 flex items-center gap-1 hover:border-sky-500/40 transition-colors">
                          <Terminal className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-[7px] font-mono text-slate-300">WEB_ADMIN</span>
                        </div>

                        {/* Peripheral Node 4 - Auth */}
                        <div className="absolute bottom-[10%] right-[5%] p-2 bg-[#05050a] border border-white/10 rounded-lg shadow-lg z-10 flex items-center gap-1 hover:border-indigo-500/40 transition-colors">
                          <Lock className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-[7px] font-mono text-slate-300">SECURE_AUTH</span>
                        </div>

                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center justify-center gap-1.5">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          Arquitetura de Alto Desempenho
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-light">
                          Escrevemos códigos nativos integrados com Google Firestore, eliminando servidores caros, mantendo seu app leve, ultrarrápido e com custo de infraestrutura quase nulo.
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>

                {/* Right side - Storytelling Content with cyber corner highlight */}
                <motion.div 
                  initial={{ opacity: 0, x: 45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 space-y-6 order-1 lg:order-2 pl-0 lg:pl-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Quem Somos
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
                    Olá! Somos a Suite Hub.
                  </h2>

                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                    <p>
                      Desenvolvemos aplicativos personalizados para empresas, igrejas, clínicas, feiras e startups que buscam modernizar sua operação, acelerar fluxos e garantir a melhor usabilidade aos seus públicos.
                    </p>
                    <p className="text-slate-400">
                      Cada projeto é desenhado e programado do absoluto zero. Não dependemos de criadores de templates engessados ou plataformas low-code que cobram anuidades abusivas. Você terá acesso completo ao código-fonte, garantindo a **propriedade intelectual exclusiva** do seu produto.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => { setActiveTab("portfolio"); scrollToTop(); }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/40 text-xs font-bold text-sky-400 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <span>Ver Depoimentos de Parceiros</span>
                      <ChevronRight className="w-4 h-4 text-sky-400" />
                    </button>
                  </div>
                </motion.div>

              </section>

              {/* 8. NOSSAS SOLUÇÕES BENTO GRID (Breathtaking modular reveal) */}
              <section id="solucoes-grid" className="space-y-12 relative">
                
                {/* Horizontal section grid divider line */}
                <div className="absolute top-[-50px] left-0 right-0 grid-line-x opacity-10" />

                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                    Catálogo de Soluções
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                    Nossas Soluções Sob Medida
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light">
                    Explore nossas baselines pré-construídas para acelerar sua entrega ou encomende um projeto totalmente novo.
                  </p>
                </header>

                {/* 3D staggered flip card bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solutionsData.slice(0, 5).map((sol, index) => {
                    const solTheme = [
                      { primary: 'text-indigo-400', glow: 'group-hover:from-indigo-500/10 group-hover:to-purple-500/5', border: 'hover:border-indigo-500/40', glowText: 'text-indigo-400/60', bullet: 'bg-indigo-400', shadow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]', iconBg: 'bg-indigo-500/10 border-indigo-500/20' },
                      { primary: 'text-teal-400', glow: 'group-hover:from-teal-500/10 group-hover:to-cyan-500/5', border: 'hover:border-teal-500/40', glowText: 'text-teal-400/60', bullet: 'bg-teal-400', shadow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]', iconBg: 'bg-teal-500/10 border-teal-500/20' },
                      { primary: 'text-rose-400', glow: 'group-hover:from-rose-500/10 group-hover:to-pink-500/5', border: 'hover:border-rose-500/40', glowText: 'text-rose-400/60', bullet: 'bg-rose-400', shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]', iconBg: 'bg-rose-500/10 border-rose-500/20' },
                      { primary: 'text-sky-400', glow: 'group-hover:from-sky-500/10 group-hover:to-blue-500/5', border: 'hover:border-sky-500/40', glowText: 'text-sky-400/60', bullet: 'bg-sky-400', shadow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]', iconBg: 'bg-sky-500/10 border-sky-500/20' },
                      { primary: 'text-amber-400', glow: 'group-hover:from-amber-500/10 group-hover:to-orange-500/5', border: 'hover:border-amber-500/40', glowText: 'text-amber-400/60', bullet: 'bg-amber-400', shadow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]', iconBg: 'bg-amber-500/10 border-amber-500/20' }
                    ][index % 5];

                    return (
                      <motion.div
                        key={sol.id}
                        whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
                        className={`group p-6 rounded-2xl bg-slate-950/90 border border-white/5 ${solTheme.border} ${solTheme.shadow} transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl`}
                      >
                        {/* High-fidelity procedural microgrid texture */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] opacity-70" />
                        
                        {/* Interactive dynamic background light bloom */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent ${solTheme.glow} transition-all duration-500 -z-10`} />
                        
                        {/* Interactive linear neon laser track */}
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-current group-hover:from-transparent group-hover:to-transparent transition-all duration-700 opacity-60 text-sky-400" />

                        {/* Fine technical blueprint corner accents */}
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-sky-400/30 transition-colors" />
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 group-hover:border-sky-400/30 transition-colors" />
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 group-hover:border-sky-400/30 transition-colors" />
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-sky-400/30 transition-colors" />

                        <div className="space-y-4 relative z-10">
                          {/* Premium offset layout with custom-styled geometric icon structure */}
                          <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-xl ${solTheme.iconBg} border flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                              {/* Background organic glass reflection */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent" />
                              {getLucideIcon(sol.icon, `w-5 h-5 ${solTheme.primary} group-hover:scale-110 transition-all duration-500`)}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-base font-display font-black text-white group-hover:text-white transition-colors duration-300">
                              {sol.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                              {sol.description}
                            </p>
                          </div>

                          {/* Technical blueprint list showing features with micro-bullets */}
                          <div className="space-y-2.5 pt-3 border-t border-white/[0.04]">
                            <span className="text-[10px] font-sans font-semibold text-slate-500 uppercase tracking-wider block">Principais Recursos</span>
                            <div className="grid grid-cols-1 gap-1.5">
                              {sol.features.slice(0, 3).map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-2.5 group/feat">
                                  <div className={`w-1.5 h-1.5 rounded-sm rotate-45 ${solTheme.bullet} opacity-40 group-hover/feat:opacity-100 group-hover/feat:scale-110 transition-all duration-300`} />
                                  <span className="text-[10px] text-slate-400 font-sans font-normal truncate group-hover/feat:text-white transition-colors duration-200">
                                    {feat}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 relative z-10">
                          <button
                            onClick={() => handleSolutionCardClick(sol)}
                            className="w-full py-3 bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                          >
                            Analisar Módulos e FAQ
                            <ChevronRight className={`w-3.5 h-3.5 ${solTheme.primary} group-hover:translate-x-1 transition-transform`} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Ultimate custom block placeholder for 100% custom projects (phenomenon bento card) */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
                    className="p-6 bg-gradient-to-br from-[#0c0d1e] via-[#090a14] to-[#04050a] border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-2xl"
                  >
                    {/* Glowing system halo */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-indigo-500/25 to-sky-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
                    
                    {/* Abstract tech grid background */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-xl shadow-inner relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[2px]" />
                        <Workflow className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-sans font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-400/20">
                            Sob Medida
                          </span>
                        </div>
                        <h4 className="text-lg font-display font-black text-white">Aplicativo 100% Personalizado</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                          Tem uma regra de negócio complexa ou uma ideia de startup inovadora? Desenhamos as interfaces no Figma e desenvolvemos todo o código sob medida.
                        </p>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Tenho uma ideia de app 100% personalizado e gostaria de desenhar o escopo com a Suite Hub.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-gradient-to-r from-indigo-600/30 to-indigo-600/15 hover:from-indigo-600 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border border-indigo-400/30 hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm relative z-10"
                    >
                      Estruturar Escopo Grátis
                      <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>

                </div>
              </section>

              {/* 9. COMO TRABALHAMOS (Futuristic Framer-Style Sticky Scroll-driven Showcase) */}
              <section id="trabalho-timeline" className="relative">
                <StickyProcess />
              </section>

              {/* 10. DIFERENCIAIS SECTION (Space bento paneling) */}
              <section id="diferenciais" className="space-y-12 relative">
                
                {/* Horizontal section grid line */}
                <div className="absolute top-[-50px] left-0 right-0 grid-line-x opacity-10" />

                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                    Nossos Diferenciais
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                    Por que escolher a Suite Hub?
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light">
                    Garantimos engenharia refinada, estética profissional e custos operacionais reduzidos para o seu negócio.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {differentialsData.map((dif, idx) => {
                    const diffColors = [
                      { text: 'text-indigo-400', glow: 'from-indigo-500/10 to-transparent', border: 'hover:border-indigo-500/30' },
                      { text: 'text-sky-400', glow: 'from-sky-500/10 to-transparent', border: 'hover:border-sky-500/30' },
                      { text: 'text-teal-400', glow: 'from-teal-500/10 to-transparent', border: 'hover:border-teal-500/30' },
                      { text: 'text-rose-400', glow: 'from-rose-500/10 to-transparent', border: 'hover:border-rose-500/30' },
                      { text: 'text-amber-400', glow: 'from-amber-500/10 to-transparent', border: 'hover:border-amber-500/30' },
                      { text: 'text-violet-400', glow: 'from-violet-500/10 to-transparent', border: 'hover:border-violet-500/30' }
                    ][idx % 6];

                    return (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                        className={`group p-6 rounded-2xl bg-gradient-to-b from-slate-900/40 to-slate-950/40 border border-white/5 ${diffColors.border} hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl`}
                      >
                        {/* High-fidelity procedural microgrid texture */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] opacity-40 pointer-events-none" />
                        
                        {/* Animated localized backdrop highlight glow */}
                        <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-tr ${diffColors.glow} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                        {/* Large, premium display index tag layered in the background */}
                        <div className="absolute right-4 top-4 text-7xl font-mono font-black text-white/[0.02] group-hover:text-white/[0.05] group-hover:-translate-y-1 transition-all duration-500 pointer-events-none select-none">
                          0{idx + 1}
                        </div>

                        {/* Technical corner angles */}
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-white/25 transition-colors" />
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-white/25 transition-colors" />

                        <div className="space-y-4 relative z-10">
                          {/* Premium offset layout with custom-styled geometric icon structure */}
                          <div className={`w-11 h-11 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-slate-900/80 group-hover:border-sky-500/30 transition-all duration-500 shadow-inner relative overflow-hidden`}>
                            {/* Inner ambient shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-100 group-hover:opacity-0 transition-opacity" />
                            {getLucideIcon(dif.icon, `w-4 h-4 ${diffColors.text} group-hover:scale-110 transition-transform duration-500`)}
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-sky-400 uppercase tracking-wider font-display leading-tight transition-colors duration-300">
                              {dif.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light transition-colors duration-300 group-hover:text-slate-300">
                              {dif.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2" />
                      </motion.div>
                    );
                  })}
                </div>

              </section>

              {/* 11. DEPOIMENTOS DE PARCEIROS (Editorial Vibe) */}
              <section id="depoimentos" className="space-y-12 relative">
                
                {/* Horizontal line */}
                <div className="absolute top-[-50px] left-0 right-0 grid-line-x opacity-10" />

                <header className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Depoimentos de Sucesso
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                    O que dizem os nossos parceiros
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light">
                    Confira relatos reais de líderes religiosos, médicos e gestores de tecnologia que escalaram com a Suite Hub.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonialsData.map((test, index) => (
                    <motion.div 
                      key={test.id} 
                      {...animFadeInUp}
                      className="p-6 glass-card rounded-2xl flex flex-col justify-between space-y-6 relative shadow-xl overflow-hidden glowing-hover-card"
                    >
                      {/* Subtle quoting watermarks */}
                      <span className="absolute top-3 right-6 text-sky-500/5 text-7xl font-serif select-none pointer-events-none">“</span>
                      
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed italic font-sans font-light relative z-10">
                        "{test.content}"
                      </p>
 
                      <div className="flex items-center gap-3 border-t border-white/5 pt-4 z-10 relative">
                        <img 
                          src={test.avatar} 
                          alt={test.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-md"
                        />
                        <div>
                          <span className="text-xs font-bold text-white block font-display">{test.name}</span>
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{test.role} • {test.company}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </section>

              {/* 12. CALL TO ACTION CHAMION BLOCK (Concentric Vortex / CosmoQ core design) */}
              <motion.section 
                {...animScaleReveal}
                id="chamada-final" 
                className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-[#0a0a14] via-[#050508] to-[#030306] p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)]"
              >
                {/* Visual orbital ring decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-white/5 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold tracking-widest uppercase font-mono">
                    PRODUÇÃO COMERCIAL ATIVA
                  </div>
                  <h2 className="text-3xl sm:text-5xl xl:text-6xl font-display font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
                    Sua ideia merece um aplicativo de alta fidelidade.
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans font-light">
                    Desenvolva seu aplicativo personalizado com quem entende de alta performance, design de interface impecável e custos de infraestrutura inteligentes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4 relative z-10">
                  <a
                    href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu aplicativo personalizado com a Suite Hub.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-600/20 transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-1.5 border border-sky-400/10"
                  >
                    Solicitar Orçamento
                  </a>
                  <a
                    href={`https://wa.me/5511972499370?text=${encodeURIComponent("Olá! Gostaria de falar no WhatsApp com a Suite Hub.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-md hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Falar no WhatsApp
                  </a>
                </div>

                {/* Micro telemetry logs at bottom of vortex */}
                <div className="pt-6 text-[8px] font-mono text-slate-600 flex justify-center gap-4 relative z-10 select-none">
                  <span>DEPLOYED_CONTAINER_OK</span>
                  <span>•</span>
                  <span>ENCRYPTION_SSL_ACTIVE</span>
                </div>
              </motion.section>

            </motion.div>
          )}

          {/* TAB 2: CATÁLOGO DE SOLUÇÕES (DETALHADO OU GRID) */}
          {activeTab === "solutions" && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
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
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-sans">Catálogo Completo</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
                      Explore Nosso Catálogo de Soluções
                    </h2>
                    <p className="text-slate-400 text-sm max-w-3xl leading-relaxed font-sans font-light">
                      Selecione uma das nossas soluções de baseline reutilizáveis para compreender suas funcionalidades profundas, módulos integrados e diferenciais de engenharia.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutionsData.map((sol, index) => {
                      const solTheme = [
                        { primary: 'text-indigo-400', glow: 'group-hover:from-indigo-500/10 group-hover:to-purple-500/5', border: 'hover:border-indigo-500/40', glowText: 'text-indigo-400/60', shadow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]', iconBg: 'bg-indigo-500/10 border-indigo-500/20' },
                        { primary: 'text-teal-400', glow: 'group-hover:from-teal-500/10 group-hover:to-cyan-500/5', border: 'hover:border-teal-500/40', glowText: 'text-teal-400/60', shadow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]', iconBg: 'bg-teal-500/10 border-teal-500/20' },
                        { primary: 'text-rose-400', glow: 'group-hover:from-rose-500/10 group-hover:to-pink-500/5', border: 'hover:border-rose-500/40', glowText: 'text-rose-400/60', shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]', iconBg: 'bg-rose-500/10 border-rose-500/20' },
                        { primary: 'text-sky-400', glow: 'group-hover:from-sky-500/10 group-hover:to-blue-500/5', border: 'hover:border-sky-500/40', glowText: 'text-sky-400/60', shadow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]', iconBg: 'bg-sky-500/10 border-sky-500/20' },
                        { primary: 'text-amber-400', glow: 'group-hover:from-amber-500/10 group-hover:to-orange-500/5', border: 'hover:border-amber-500/40', glowText: 'text-amber-400/60', shadow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]', iconBg: 'bg-amber-500/10 border-amber-500/20' }
                      ][index % 5];

                      return (
                        <motion.div 
                          key={sol.id} 
                          whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
                          className={`group p-6 rounded-2xl bg-slate-950/90 border border-white/5 ${solTheme.border} ${solTheme.shadow} transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl`}
                        >
                          {/* High-fidelity procedural microgrid texture */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] opacity-70" />
                          
                          {/* Interactive dynamic background light bloom */}
                          <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent ${solTheme.glow} transition-all duration-500 -z-10`} />

                          {/* Fine technical blueprint corner accents */}
                          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-sky-400/30 transition-colors" />
                          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-sky-400/30 transition-colors" />

                          <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                              <div className={`w-10 h-10 rounded-xl ${solTheme.iconBg} border flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent" />
                                {getLucideIcon(sol.icon, `w-4 h-4 ${solTheme.primary}`)}
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="text-base font-display font-black text-white group-hover:text-white transition-colors duration-300">{sol.title}</h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light line-clamp-3 group-hover:text-slate-300 transition-colors">
                                {sol.description}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-4 text-xs relative z-10">
                            <button
                              onClick={() => { setSelectedSolution(sol); scrollToTop(); }}
                              className="w-full py-2.5 bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Ver Detalhes do Catálogo
                              <ChevronRight className={`w-3.5 h-3.5 ${solTheme.primary} group-hover:translate-x-1 transition-transform`} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
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
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {activeSimulatorProject ? (
                // Immersive Simulator Component mounted
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
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
                      Explore Nossos Aplicativos por Verticais
                    </h2>
                    <p className="text-slate-400 text-sm max-w-4xl leading-relaxed font-sans font-light">
                      Selecione um selo para filtrar as soluções. Toque em <strong className="text-sky-400">Experimentar Demonstração</strong> para iniciar o simulador interativo direto na sua tela!
                    </p>
                  </header>

                  {/* High-tech CosmoQ Circular Wheel Category Selector */}
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
                              : "bg-white/5 border-white/10 hover:border-sky-500/20 text-slate-400 hover:text-white backdrop-blur-md"
                          }`}
                        >
                          <div className={`p-3 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? "bg-sky-500/20 border-sky-400/30 text-sky-400 scale-110"
                              : "bg-white/5 border-white/10 text-slate-500 group-hover:text-slate-300 backdrop-blur-sm"
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold tracking-wide uppercase font-display">{stamp.name}</span>
                          
                          {/* Selected indicator pulsing dot */}
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Filtered Projects Grid */}
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {filteredProjects.map((proj, index) => (
                        <motion.div 
                          key={proj.id} 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          whileHover={{ y: -6, scale: 1.015 }}
                          className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xl relative glowing-hover-card"
                        >
                          {/* Card image/picture frame */}
                          <div className="relative h-44 overflow-hidden border-b border-white/10">
                            <img 
                              src={getAssetUrl(proj.image)} 
                              alt={proj.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#030305]/80 border border-white/10 rounded text-[9px] font-bold text-sky-400 uppercase font-mono tracking-wider backdrop-blur-md">
                              {proj.category}
                            </span>
                          </div>

                          {/* Text details container */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-2">
                              <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                                {proj.name}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans font-light line-clamp-3">
                                {proj.description}
                              </p>
                            </div>

                            {/* Features list tags */}
                            <div className="space-y-2">
                              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Funcionalidades:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.features.slice(0, 3).map((f, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-white/[0.02] rounded text-[9px] text-slate-300 border border-white/10 backdrop-blur-sm">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs gap-4 relative z-10">
                              <div className="flex flex-wrap gap-1 shrink-0">
                                {proj.tech.slice(0, 2).map((t, idx) => (
                                  <span key={idx} className="text-[8px] font-mono text-slate-500 font-bold uppercase">#{t}</span>
                                ))}
                              </div>
                              
                              <button
                                onClick={() => handleOpenDemo(proj)}
                                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                              >
                                Testar Demo
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Elegant interactive empty state when no demo active for stamp */
                    <div className="glass-card rounded-3xl p-8 md:p-14 text-center max-w-3xl mx-auto space-y-6 backdrop-blur-xl shadow-2xl relative overflow-hidden glowing-hover-card">
                      <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500 backdrop-blur-sm shadow-inner">
                        {(() => {
                          const activeStamp = categoryStamps.find(s => s.id === selectedCategory);
                          const ActiveIcon = activeStamp ? activeStamp.icon : Sparkles;
                          return <ActiveIcon className="w-8 h-8 text-sky-400" />;
                        })()}
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white font-display">Aplicativo {categoryStamps.find(s => s.id === selectedCategory)?.name} Sob Medida</h3>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed font-sans font-light">
                          Não possuímos uma simulação estática ativa nesta categoria, mas estruturamos e codificamos aplicativos completos com integração Firebase de alta escalabilidade.
                        </p>
                      </div>

                      {/* Displaying targets ideas list */}
                      <div className="bg-[#050508]/60 border border-white/5 rounded-2xl p-5 text-left max-w-xl mx-auto space-y-3 backdrop-blur-md">
                        <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Aplicações Típicas:</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                          {categoryStamps.find(s => s.id === selectedCategory)?.ideas}
                        </p>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`https://wa.me/5511972499370?text=${encodeURIComponent(`Olá! Gostaria de falar sobre o desenvolvimento de um aplicativo na vertical de ${categoryStamps.find(s => s.id === selectedCategory)?.name} com a Suite Hub.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          Consultar no WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Demos static list backup info telemetry card */}
                  {apps.length > 0 && (
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-inner relative overflow-hidden">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 shadow-inner">
                          <Boxes className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Instalações em Sandbox Detectadas</span>
                          <span className="text-[10px] text-slate-500 leading-none block font-sans font-light mt-0.5">Identificamos {apps.length} pacotes de aplicativos estáticos extraídos na sandbox.</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold uppercase">✓ Conectado</span>
                    </div>
                  )}

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* FOOTER SECTION WITH TELEMETRY LOGS */}
      <footer id="main-footer" className="bg-[#020204] border-t border-white/5 mt-24 py-12 md:py-20 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Footer branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
                <img src={getAssetUrl("/icone.png")} alt="Suite Hub Icon" className="w-full h-full object-contain p-0.5" referrerPolicy="no-referrer" />
              </div>
              <span className="text-base font-display font-black text-white tracking-wider">SUITE HUB</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light max-w-sm">
              Desenvolvemos aplicativos personalizados de alta performance para negócios digitais, igrejas, clínicas e startups que buscam a excelência em engenharia de software sob medida.
            </p>
            <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
              <a href="https://wa.me/5511972499370" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              <span>•</span>
              <a href="mailto:contato@suitehub.com" className="hover:text-white transition-colors">contato@suitehub.com</a>
            </div>
          </div>

          {/* Column Links 1 */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs font-extrabold text-white uppercase tracking-widest font-mono">Navegação</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setActiveTab("home"); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left font-sans font-light">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("solutions"); setSelectedSolution(null); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left font-sans font-light">
                  Catálogo de Soluções
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("portfolio"); setActiveSimulatorProject(null); scrollToTop(); }} className="hover:text-white transition-colors cursor-pointer text-left font-sans font-light">
                  Portfólio & Demonstrações
                </button>
              </li>
            </ul>
          </div>

          {/* Column contacts details */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-extrabold text-white uppercase tracking-widest font-sans">Desenvolvimento</h5>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-sans font-bold tracking-wider uppercase">Atendimento Comercial Ativo</span>
            </div>
            <span className="text-[10px] text-slate-500 block leading-relaxed font-sans">Contate nosso atendimento comercial para alinhar seu projeto e acelerar sua entrega sem taxas ocultas.</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-12 pt-8 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <span>© {new Date().getFullYear()} Suite Hub Software Studio • CNPJ sob registro • Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <span>Hora Local: {systemTime}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
