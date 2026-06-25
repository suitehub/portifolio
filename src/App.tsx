import { useState, useEffect } from "react";
import { 
  Layers, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  FileArchive, 
  ArrowLeft, 
  Briefcase, 
  Info, 
  Cpu, 
  Sparkles,
  Play,
  Heart,
  BookOpen,
  CheckSquare,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AppItem {
  id: string;
  name: string;
  archiveName: string;
  entryPath: string;
  type: "zip" | "rar";
  size: number;
}

// Helper to get full URL responsive to subfolder hosting like GitHub Pages
const getFullUrl = (relativePath: string) => {
  if (relativePath.startsWith("http")) return relativePath;
  const loc = window.location;
  const basePath = loc.pathname.endsWith("/")
    ? loc.pathname
    : loc.pathname.slice(0, loc.pathname.lastIndexOf("/") + 1);
  return `${basePath}${relativePath}`;
};

export default function App() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // For reloading the iframe

  useEffect(() => {
    // Try fetching static apps.json first (ideal for GitHub Pages/Actions static hosting), with API fallback
    fetch(getFullUrl("apps.json"))
      .then((res) => {
        if (!res.ok) throw new Error("Static apps.json not found, trying API");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setApps(data);
        } else if (data && Array.isArray(data.apps)) {
          setApps(data.apps);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Static apps.json fallback triggered:", err.message);
        fetch(getFullUrl("api/apps"))
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.apps)) {
              setApps(data.apps);
            } else if (Array.isArray(data)) {
              setApps(data);
            }
            setLoading(false);
          })
          .catch((apiErr) => {
            console.error("Error fetching apps list:", apiErr);
            setLoading(false);
          });
      });
  }, []);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.archiveName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Custom icon mapping based on app keywords
  const getAppIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("casamento")) return <Heart className="w-8 h-8 text-rose-500" />;
    if (lower.includes("biblico") || lower.includes("estudo")) return <BookOpen className="w-8 h-8 text-amber-500" />;
    if (lower.includes("confirma")) return <CheckSquare className="w-8 h-8 text-emerald-500" />;
    if (lower.includes("turma") || lower.includes("viva") || lower.includes("pessoas")) return <Users className="w-8 h-8 text-sky-500" />;
    return <Cpu className="w-8 h-8 text-purple-500" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!selectedApp ? (
          // MAIN PORTFOLIO GRID VIEW
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20"
          >
            {/* Header */}
            <header className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-purple-400 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-black/20">
                <Sparkles className="w-4.5 h-4.5" />
                Portfólio de Demonstrações
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
                Meus Apps Interativos
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                Explore, navegue e teste meus aplicativos desenvolvidos diretamente nesta página. 
                Cada bloco é uma sandbox viva do app real.
              </p>
            </header>

            {/* Quick Stats & Search bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-slate-900/40 p-4 rounded-2xl border border-slate-850 backdrop-blur-md">
              <div className="flex items-center gap-4 text-sm text-slate-400 w-full md:w-auto justify-around md:justify-start">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Total de Apps: <strong className="text-white">{apps.length}</strong></span>
                </div>
                <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <FileArchive className="w-4 h-4 text-blue-400" />
                  <span>Espaço de Demonstração: <strong className="text-white">
                    {formatSize(apps.reduce((acc, app) => acc + app.size, 0))}
                  </strong></span>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar aplicativo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-slate-100 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Extraindo pacotes e preparando as demonstrações...</p>
              </div>
            ) : filteredApps.length === 0 ? (
              // Empty state
              <div className="text-center py-20 border border-dashed border-slate-850 rounded-3xl bg-slate-900/20">
                <Layers className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-300">Nenhum aplicativo encontrado</h3>
                <p className="text-slate-500 mt-1 max-w-md mx-auto">
                  {searchQuery 
                    ? "Tente mudar os termos da sua pesquisa ou limpe o filtro." 
                    : "Adicione arquivos ZIP ou RAR no diretório do seu projeto para que eles apareçam aqui."}
                </p>
              </div>
            ) : (
              // Grid of Apps
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/70 border border-slate-850 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Hover Glow decoration */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
                          {getAppIcon(app.name)}
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.type === "rar" 
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          .{app.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                        {app.name}
                      </h3>
                      
                      <p className="text-xs text-slate-500 font-mono mt-1 select-all">
                        {app.archiveName}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {formatSize(app.size)}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span>Demo Pronta</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setViewport("desktop");
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-500/20 group-hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Acessar Aplicativo
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Portfolio Footer Info */}
            <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
              <div className="flex justify-center items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-400" />
                <span>Os aplicativos acima foram extraídos e são executados de forma 100% estática local no navegador.</span>
              </div>
              <p>© {new Date().getFullYear()} Portfólio de Demonstrações • Criado com React & Tailwind</p>
            </footer>
          </motion.div>
        ) : (
          // ACTIVE IMMERSIVE PREVIEW VIEW
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-screen"
          >
            {/* Top Bar Navigation */}
            <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-slate-900 border-b border-slate-850 z-20 shadow-md">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-950/80 hover:bg-slate-950 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="hidden xs:block p-1.5 bg-slate-950 rounded-md border border-slate-850">
                    {getAppIcon(selectedApp.name)}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white max-w-[150px] sm:max-w-xs truncate">
                      {selectedApp.name}
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono truncate hidden sm:block">
                      {selectedApp.archiveName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Viewport Control Buttons */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
                <button
                  onClick={() => setViewport("desktop")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewport === "desktop" 
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/30" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Visualização Desktop (100%)"
                >
                  <Monitor className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewport === "tablet" 
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/30" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Visualização Tablet (768px)"
                >
                  <Tablet className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewport === "mobile" 
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/30" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Visualização Celular (375px)"
                >
                  <Smartphone className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Recarregar demonstração"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <a
                  href={getFullUrl(selectedApp.entryPath)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 hover:bg-purple-950/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Nova Guia</span>
                </a>
              </div>
            </header>

            {/* Iframe stage container */}
            <div className="flex-1 bg-slate-950 p-4 md:p-6 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              {/* Dynamic Mockup Shell based on selected Viewport */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
                  height: "100%",
                  maxWidth: "100%"
                }}
                className={`bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative`}
              >
                {/* Simulated Web Browser Header */}
                <div className="bg-slate-900 border-b border-slate-850 px-4 py-2.5 flex items-center gap-3">
                  {/* Window circles */}
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  {/* Simulated URL bar */}
                  <div className="flex-1 bg-slate-950/80 rounded-lg py-1 px-3 text-[11px] text-slate-500 font-mono flex items-center justify-between border border-slate-850/60 truncate select-all">
                    <span className="truncate">{window.location.origin}{getFullUrl(selectedApp.entryPath)}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 ml-2">HTTPS</span>
                  </div>
                </div>

                {/* Actual Application Iframe */}
                <div className="flex-1 w-full h-full bg-white relative">
                  <iframe
                    key={iframeKey}
                    src={getFullUrl(selectedApp.entryPath)}
                    title={selectedApp.name}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
