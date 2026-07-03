import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCcw, 
  Send, 
  Check, 
  User, 
  Calendar, 
  Clock, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  Video, 
  Sparkles, 
  ChevronRight, 
  Bell,
  MessageSquare,
  Church,
  Heart,
  FileText,
  Lock,
  ArrowLeft,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, AppItem } from "../types";

interface AppSimulatorProps {
  project: Project;
  realApp?: AppItem | null;
  onBack: () => void;
}

export function AppSimulator({ project, realApp, onBack }: AppSimulatorProps) {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [iframeKey, setIframeKey] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // States for Clinica simulator
  const [clinicTab, setClinicTab] = useState<"home" | "booking" | "telemed" | "records">("home");
  const [selectedDoctor, setSelectedDoctor] = useState("Dra. Ana Cláudia Lemos - Cardiologia");
  const [selectedDate, setSelectedDate] = useState("Amanhã");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState<any[]>([
    { doctor: "Dr. Roberto Santos - Pediatra", date: "Ontem", time: "14:00", status: "Realizada" }
  ]);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: "doctor", text: "Olá! Sou a Dra. Ana. Em que posso te ajudar hoje?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  // States for Financeiro simulator
  const [financeTab, setFinanceTab] = useState<"dashboard" | "invoices" | "ia">("dashboard");
  const [invoices, setInvoices] = useState<any[]>([
    { id: 1, client: "Supermercado Nova Era", value: "R$ 4.500,00", due: "Hoje", status: "Pendente" },
    { id: 2, client: "Construtora Sigma", value: "R$ 12.800,00", due: "Em 5 dias", status: "Pendente" },
    { id: 3, client: "Clínica Sorria", value: "R$ 2.400,00", due: "Vencido (Ontem)", status: "Vencido" },
    { id: 4, client: "Igreja da Graça", value: "R$ 1.200,00", due: "Pago", status: "Pago" },
  ]);
  const [totalRevenue, setTotalRevenue] = useState(20900);
  const [iaAnalyzing, setIaAnalyzing] = useState(false);
  const [iaAnalysis, setIaAnalysis] = useState("");
  const [pixModalInvoice, setPixModalInvoice] = useState<any | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (text: string) => {
    setNotifications((prev) => [text, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(0, -1));
    }, 5000);
  };

  const handleClinicBook = () => {
    if (!selectedTime) {
      addNotification("Por favor, selecione um horário!");
      return;
    }
    const newAppt = {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      status: "Confirmado"
    };
    setAppointments([newAppt, ...appointments]);
    addNotification(`Sucesso! Consulta com ${selectedDoctor.split(" - ")[0]} agendada para ${selectedDate} às ${selectedTime}!`);
    setClinicTab("home");
    setSelectedTime("");
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    setTimeout(() => {
      const botResponses = [
        "Certo, entendi. Analisando o seu prontuário, isso parece estar dentro do esperado.",
        "Você poderia me confirmar se tem sentido esses sintomas com frequência?",
        "Perfeito! Vou anexar uma guia de exames de rotina no seu perfil. Você pode baixar na aba Prontuários.",
        "Para maior segurança, prescrevi um antialérgico leve. A receita já está disponível com assinatura digital!"
      ];
      const botMsg = {
        sender: "doctor",
        text: botResponses[Math.floor(Math.random() * botResponses.length)]
      };
      setChatMessages((prev) => [...prev, botMsg]);
      addNotification("Nova mensagem da Dra. Ana Cláudia!");
    }, 1500);
  };

  const handleTriggerIa = () => {
    setIaAnalyzing(true);
    setIaAnalysis("");
    setTimeout(() => {
      setIaAnalyzing(false);
      setIaAnalysis(
        "Faturamento projetado para os próximos 30 dias: R$ 38.500 (+18% vs mês anterior). Ponto de atenção: A inadimplência na fatura 'Clínica Sorria' pode impactar seu fluxo no dia 10. Sugestão: Disparar cobrança amigável via WhatsApp Hub com Pix dinâmico agora mesmo."
      );
      addNotification("IA Analytics concluiu a análise preditiva!");
    }, 2000);
  };

  const handlePayInvoice = (invoice: any) => {
    setPixModalInvoice(invoice);
  };

  const handleConfirmPixPayment = () => {
    if (!pixModalInvoice) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === pixModalInvoice.id ? { ...inv, status: "Pago", due: "Pago hoje" } : inv
      )
    );
    addNotification(`Pagamento de ${pixModalInvoice.value} recebido com sucesso via Pix!`);
    setPixModalInvoice(null);
  };

  const handleWhatsAppAlert = (invoice: any) => {
    addNotification(`Lembrete de cobrança disparado via WhatsApp para o cliente ${invoice.client}!`);
  };

  const getFullUrl = (relativePath: string) => {
    if (relativePath.startsWith("http")) return relativePath;
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
    const cleanRelative = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
    return `${base}${cleanRelative}`;
  };

  return (
    <div className="flex flex-col h-full min-h-[85vh] glass-card rounded-3xl overflow-hidden shadow-2xl relative glass-reflection">
      
      {/* Simulation Dashboard Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/15 gap-4 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 border border-white/15 rounded-lg transition-colors cursor-pointer backdrop-blur-sm shadow-inner hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Portfólio</span>
          </button>
          <div className="h-5 w-[1px] bg-white/15 hidden md:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-sky-500/10 text-sky-400 rounded border border-sky-500/30 text-xs font-bold uppercase backdrop-blur-sm">
                {project.category}
              </span>
              <h2 className="text-base font-black text-white tracking-tight">{project.name}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 hidden sm:block">
              {project.description}
            </p>
          </div>
        </div>

        {/* Viewport controls for iframe */}
        {project.demoType === "iframe" && (
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/15 backdrop-blur-md">
            <button
              onClick={() => setViewport("mobile")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewport === "mobile" 
                  ? "bg-sky-600/30 text-white border border-sky-500/40 shadow-inner" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              title="Celular"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewport === "tablet" 
                  ? "bg-sky-600/30 text-white border border-sky-500/40 shadow-inner" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              title="Tablet"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport("desktop")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewport === "desktop" 
                  ? "bg-sky-600/30 text-white border border-sky-500/40 shadow-inner" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              title="Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {project.demoType === "iframe" && (
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-white/10"
              title="Recarregar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] px-2 py-1 rounded bg-sky-500/10 text-sky-400 border border-white/10 font-mono font-bold backdrop-blur-sm">
            PROTÓTIPO ATIVO
          </span>
        </div>
      </div>

      {/* Simulator Stage */}
      <div className="flex-1 bg-transparent p-4 md:p-8 flex items-center justify-center overflow-auto relative min-h-[600px]">
        
        {/* Stage Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Dynamic App Notifications HUD (Simulates native mobile pushes!) */}
        <AnimatePresence>
          {notifications.map((notif, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-slate-900/95 border border-sky-500/50 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-start gap-3 text-sm text-slate-200"
            >
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-400 uppercase tracking-wide">Suite Hub App Notification</span>
                  <span className="text-[10px] text-slate-500">agora</span>
                </div>
                <p className="text-xs mt-1 text-slate-300 leading-relaxed font-medium">{notif}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Outer Device Mockup Container */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className={`relative glass-card-glow flex flex-col overflow-hidden shadow-2xl ${
            project.demoType === "iframe" && viewport === "desktop" 
              ? "w-full max-w-6xl h-[650px] border-white/15 rounded-[2rem]" 
              : project.demoType === "iframe" && viewport === "tablet"
              ? "w-[768px] h-[650px] max-w-full border-white/15 rounded-[2.5rem]"
              : "w-[360px] h-[640px] rounded-[3.2rem] border-[12px] border-white/20 shadow-black/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* SIMULATOR VIEWS (Clinica and Financeiro customized visual prototypes) */}
          {project.demoType === "simulator" ? (
            <div className="flex flex-col h-full bg-slate-950 text-slate-200 select-none overflow-hidden relative">
              
              {/* Smartphone Top Notch & Status Indicators */}
              <div className="h-8 bg-slate-950 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-400 z-30 select-none">
                <span>{currentTime}</span>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-800 rounded-b-xl border border-t-0 border-slate-700" />
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]">5G</span>
                  <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-500 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* SIMULATOR: CLINICA APPLICTAION */}
              {project.simulatorPreset === "clinica" && (
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Clinic App Header */}
                  <header className="px-4 py-3 bg-white/[0.02] border-b border-white/10 backdrop-blur-xl flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/20 shadow-inner">
                        MC
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-white tracking-tight">Med&Clin Assist</h4>
                        <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500" />
                          Pronto Atendimento Ativo
                        </span>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addNotification("Você possui 1 nova receita médica digital!")} 
                      className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg relative border border-white/10 transition-all cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-slate-950" />
                    </motion.button>
                  </header>

                  {/* Clinic Screen Views */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    
                    {clinicTab === "home" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-sky-900/40 to-indigo-950/40 border border-sky-500/20 rounded-2xl p-4">
                          <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Olá, João Ferelli</span>
                          <h3 className="text-sm font-extrabold text-white mt-0.5">Como se sente hoje?</h3>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Acesse consultas rápidas, receitas e agenda de exames na palma da sua mão.</p>
                          
                          <div className="mt-3 flex gap-2">
                            <button 
                              onClick={() => setClinicTab("telemed")}
                              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
                            >
                              <Video className="w-3 h-3" /> Telemedicina
                            </button>
                            <button 
                              onClick={() => setClinicTab("booking")}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-bold transition-all"
                            >
                              Marcar Consulta
                            </button>
                          </div>
                        </div>

                        {/* Quick Services */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Serviços Rápidos</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div 
                              onClick={() => setClinicTab("telemed")}
                              className="p-3 bg-white/[0.04] border border-white/15 rounded-xl cursor-pointer hover:border-sky-500/30 transition-all text-center backdrop-blur-md shadow-sm"
                            >
                              <Video className="w-5 h-5 mx-auto text-sky-400 mb-1" />
                              <span className="text-[10px] font-semibold block">Pronto Atendimento</span>
                              <span className="text-[8px] text-slate-500">Espera: 5 min</span>
                            </div>
                            <div 
                              onClick={() => setClinicTab("records")}
                              className="p-3 bg-white/[0.04] border border-white/15 rounded-xl cursor-pointer hover:border-sky-500/30 transition-all text-center backdrop-blur-md shadow-sm"
                            >
                              <FileText className="w-5 h-5 mx-auto text-sky-400 mb-1" />
                              <span className="text-[10px] font-semibold block">Histórico & Receitas</span>
                              <span className="text-[8px] text-slate-500">1 pendente</span>
                            </div>
                          </div>
                        </div>

                        {/* Appointments List */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Seus Compromissos</h4>
                          <div className="space-y-2">
                            {appointments.map((appt, i) => (
                              <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs backdrop-blur-sm shadow-sm">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-sky-400 shadow-inner">
                                    <Calendar className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <span className="font-bold text-white block leading-tight">{appt.doctor.split(" - ")[0]}</span>
                                    <span className="text-[9px] text-slate-400 mt-0.5 block">{appt.doctor.split(" - ")[1]} • {appt.date} às {appt.time}</span>
                                  </div>
                                </div>
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  appt.status === "Confirmado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/10 text-slate-400 border border-white/10"
                                }`}>
                                  {appt.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {clinicTab === "booking" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-sky-400" /> Agendar Consulta
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Especialidade e Médico</label>
                            <select 
                              value={selectedDoctor} 
                              onChange={(e) => setSelectedDoctor(e.target.value)}
                              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-sky-500/40 backdrop-blur-md cursor-pointer"
                            >
                              <option>Dra. Ana Cláudia Lemos - Cardiologia</option>
                              <option>Dr. Roberto Santos - Pediatra</option>
                              <option>Dra. Marina Costa - Dermatologia</option>
                              <option>Dr. Thiago Silva - Clínico Geral</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Escolher Data</label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {["Hoje", "Amanhã", "Quarta-feira"].map((d) => (
                                <button
                                  key={d}
                                  onClick={() => setSelectedDate(d)}
                                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                                    selectedDate === d 
                                      ? "bg-sky-600 border-sky-500 text-white" 
                                      : "bg-slate-900 border-slate-800 text-slate-400"
                                  }`}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Horários Disponíveis</label>
                            <div className="grid grid-cols-4 gap-1">
                              {["09:00", "10:30", "14:00", "15:30", "16:00", "17:30"].map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                                    selectedTime === t 
                                      ? "bg-sky-600 border-sky-500 text-white" 
                                      : "bg-slate-900 border-slate-800 text-slate-400"
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <button
                              onClick={handleClinicBook}
                              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                            >
                              Confirmar Agendamento
                            </button>
                            <button
                              onClick={() => setClinicTab("home")}
                              className="w-full py-2 bg-transparent text-slate-400 text-xs mt-2"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {clinicTab === "telemed" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full min-h-[380px]">
                        {!isCallActive ? (
                          <div className="text-center py-6 space-y-4">
                            <div className="w-16 h-16 bg-sky-500/10 rounded-full border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400 animate-pulse">
                              <Video className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">Pronto Atendimento Online</h4>
                              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                                Conecte-se em uma sala virtual de telemedicina segura e criptografada com a Dra. Ana Cláudia Lemos.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setIsCallActive(true);
                                addNotification("Conectando chamada criptografada...");
                              }}
                              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition-all"
                            >
                              Iniciar Teleconsulta
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col justify-between space-y-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                            {/* Simulated Video Feed Area */}
                            <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-slate-850">
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 text-white text-[8px] font-bold rounded flex items-center gap-1">
                                <span className="w-1 h-1 bg-white rounded-full animate-ping" /> AO VIVO
                              </div>
                              
                              <div className="text-center space-y-1">
                                <div className="w-10 h-10 rounded-full bg-slate-800 mx-auto border border-sky-500 flex items-center justify-center text-sky-400 overflow-hidden">
                                  <User className="w-6 h-6" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 block">Conectado: Dra. Ana Cláudia Lemos</span>
                              </div>
                              
                              {/* Small corner feedback */}
                              <div className="absolute bottom-2 right-2 w-10 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                                <User className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            {/* Simulated Text Chat for consultation */}
                            <div className="flex-1 bg-slate-950/80 p-2 rounded-lg border border-slate-850 h-32 overflow-y-auto space-y-2 flex flex-col text-[10px]">
                              {chatMessages.map((msg, i) => (
                                <div 
                                  key={i} 
                                  className={`p-2 rounded-xl max-w-[80%] leading-snug ${
                                    msg.sender === "doctor" 
                                      ? "bg-slate-900 border border-slate-850 text-slate-200 self-start" 
                                      : "bg-sky-600 text-white self-end"
                                  }`}
                                >
                                  {msg.text}
                                </div>
                              ))}
                            </div>

                            {/* Chat Quick responses (interactive prompt simulation!) */}
                            <div className="flex gap-1 overflow-x-auto pb-1">
                              {["Estou com dor de cabeça", "Preciso de receita", "Dúvida sobre exames"].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    setChatInput(opt);
                                  }}
                                  className="px-2 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-750 rounded-full text-[8px] whitespace-nowrap cursor-pointer shrink-0"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>

                            {/* Chat input form */}
                            <div className="flex gap-1">
                              <input
                                type="text"
                                placeholder="Digite uma mensagem..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                              />
                              <button
                                onClick={handleSendChatMessage}
                                className="p-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-500"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                setIsCallActive(false);
                                addNotification("Chamada de telemedicina encerrada.");
                              }}
                              className="w-full py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-[10px] font-bold rounded-lg border border-rose-900/40"
                            >
                              Desconectar Chamada
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {clinicTab === "records" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1">
                          <FileText className="w-4 h-4 text-sky-400" /> Prontuário & Receitas Digitais
                        </h3>

                        <div className="space-y-2">
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-[11px] font-bold text-white">Receita Digital #38842</h5>
                                <span className="text-[9px] text-slate-400">Prescrito por Dra. Ana Cláudia Lemos</span>
                              </div>
                              <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[8px] font-bold">Assinado ICP-Brasil</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">Amoxicilina 500mg • Tomar de 8 em 8 horas por 7 dias.</p>
                            <button 
                              onClick={() => addNotification("PDF da receita médica baixado para o seu aparelho!")}
                              className="mt-2.5 w-full py-1 bg-slate-800 text-[10px] font-bold rounded hover:bg-slate-750 text-slate-300"
                            >
                              Baixar PDF Assinado
                            </button>
                          </div>

                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-[11px] font-bold text-white">Atestado Médico Digital</h5>
                                <span className="text-[9px] text-slate-400">Emitido por Dr. Roberto Santos</span>
                              </div>
                              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[8px] font-bold">Validade: 2 dias</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">Recomendação de afastamento por fadiga viral.</p>
                            <button 
                              onClick={() => addNotification("PDF do atestado médico baixado!")}
                              className="mt-2.5 w-full py-1 bg-slate-800 text-[10px] font-bold rounded hover:bg-slate-750 text-slate-300"
                            >
                              Baixar Atestado
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </div>

                  {/* Clinic Bottom Tab Navigation */}
                  <nav className="h-12 bg-white/[0.02] border-t border-white/10 grid grid-cols-4 select-none z-15 backdrop-blur-md">
                    {[
                      { id: "home", label: "Início", icon: User },
                      { id: "booking", label: "Agendar", icon: Calendar },
                      { id: "telemed", label: "Consulta", icon: Video },
                      { id: "records", label: "Receitas", icon: FileText },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = clinicTab === tab.id;
                      return (
                        <motion.button
                          key={tab.id}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setClinicTab(tab.id as any)}
                          className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer relative ${
                            isActive ? "text-sky-400" : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {isActive && (
                            <motion.div 
                              layoutId="activeClinicIndicator" 
                              className="absolute inset-0 bg-sky-500/[0.03] z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon className="w-4 h-4 z-10" />
                          <span className="text-[8px] font-semibold z-10">{tab.label}</span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* SIMULATOR: GESTÃO FINANCEIRA APPLICATION */}
              {project.simulatorPreset === "financeiro" && (
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Finance Header */}
                  <header className="px-4 py-3 bg-white/[0.02] border-b border-white/10 backdrop-blur-xl flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20 shadow-inner">
                        $
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-white tracking-tight">Suite Finanças</h4>
                        <span className="text-[9px] text-slate-400 font-mono">Faturamento do Mês</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-400">R$ {totalRevenue.toLocaleString("pt-BR")},00</span>
                    </div>
                  </header>

                  {/* Finance Screen Views */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    
                    {financeTab === "dashboard" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {/* Financial Mini Stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
                            <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Receitas</span>
                            <h4 className="text-sm font-bold text-emerald-400 mt-1">R$ 24.500</h4>
                            <span className="text-[8px] text-emerald-500 font-medium">+12% este mês</span>
                          </div>
                          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
                            <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Despesas</span>
                            <h4 className="text-sm font-bold text-rose-400 mt-1">R$ 3.600</h4>
                            <span className="text-[8px] text-rose-500 font-medium">-5% este mês</span>
                          </div>
                        </div>

                        {/* Financial Interactive Chart Simulator */}
                        <div className="bg-slate-900 border border-slate-850 rounded-xl p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Faturamento Semanal</h5>
                            <span className="text-[9px] text-sky-400 flex items-center gap-0.5 cursor-pointer" onClick={() => addNotification("Dados de faturamento exportados para o clipboard!")}>
                              Exportar
                            </span>
                          </div>

                          {/* Render beautiful custom CSS vertical bars chart */}
                          <div className="h-24 flex items-end justify-between gap-1.5 pt-4 px-2">
                            {[
                              { label: "S1", value: 35, color: "bg-sky-500" },
                              { label: "S2", value: 65, color: "bg-sky-500" },
                              { label: "S3", value: 45, color: "bg-emerald-500" },
                              { label: "S4", value: 85, color: "bg-emerald-500" },
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                <span className="text-[8px] text-slate-400 font-mono font-bold">{bar.value}%</span>
                                <div 
                                  className={`w-full ${bar.color} rounded-t-sm transition-all duration-700`} 
                                  style={{ height: `${bar.value}%` }} 
                                />
                                <span className="text-[8px] text-slate-500 font-mono">{bar.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recent Transactions list */}
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Cobranças Pendentes</h4>
                          <div className="space-y-1.5">
                            {invoices.filter(i => i.status !== "Pago").map((inv) => (
                              <div key={inv.id} className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-slate-200 block">{inv.client}</span>
                                  <span className="text-[9px] text-slate-400 mt-0.5 block">{inv.value} • {inv.due}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleWhatsAppAlert(inv)}
                                    className="p-1 bg-sky-950 text-sky-400 border border-sky-900/40 rounded hover:bg-sky-900/30 text-[9px] font-bold"
                                    title="Notificar WhatsApp"
                                  >
                                    Cobrar
                                  </button>
                                  <button
                                    onClick={() => handlePayInvoice(inv)}
                                    className="p-1 bg-emerald-950 text-emerald-400 border border-emerald-900/40 rounded hover:bg-emerald-900/30 text-[9px] font-bold"
                                  >
                                    Pix
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {financeTab === "invoices" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-bold text-white flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-emerald-400" /> Fluxo de Faturamento
                          </h3>
                          <button 
                            onClick={() => {
                              const name = prompt("Nome do cliente:");
                              const val = prompt("Valor da cobrança (Ex: R$ 1.500,00):");
                              if (name && val) {
                                setInvoices([...invoices, { id: Date.now(), client: name, value: val, due: "Hoje", status: "Pendente" }]);
                                addNotification(`Cobrança de ${val} para ${name} criada com sucesso!`);
                              }
                            }}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold rounded"
                          >
                            + Novo
                          </button>
                        </div>

                        <div className="space-y-2">
                          {invoices.map((inv) => (
                            <div key={inv.id} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
                              <div className="text-xs">
                                <span className="font-bold text-white block">{inv.client}</span>
                                <span className="text-[9px] text-slate-400 block mt-0.5">Vencimento: {inv.due}</span>
                                <span className="text-xs font-bold mt-1 text-emerald-400 block">{inv.value}</span>
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                  inv.status === "Pago" 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : inv.status === "Vencido"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}>
                                  {inv.status}
                                </span>
                                {inv.status !== "Pago" && (
                                  <button
                                    onClick={() => handlePayInvoice(inv)}
                                    className="px-2 py-0.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded text-[9px] font-semibold"
                                  >
                                    Pagar Pix
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {financeTab === "ia" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto mb-3 animate-pulse">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <h4 className="text-xs font-bold text-white">Análise Preditiva de Fluxo de Caixa</h4>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                            Nossa Inteligência Artificial analisa seus recebimentos históricos e prevê gargalos de caixa para os próximos meses.
                          </p>
                          
                          <button
                            onClick={handleTriggerIa}
                            disabled={iaAnalyzing}
                            className="mt-4 px-4 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                          >
                            {iaAnalyzing ? "Analisando..." : "Analisar com IA"}
                          </button>
                        </div>

                        {iaAnalyzing && (
                          <div className="flex flex-col items-center justify-center py-4 space-y-2">
                            <div className="w-6 h-6 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                            <span className="text-[9px] text-slate-500">Computando projeção financeira...</span>
                          </div>
                        )}

                        {iaAnalysis && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-sky-950/20 border border-sky-500/30 rounded-xl"
                          >
                            <span className="text-[9px] font-bold text-sky-400 block mb-1 uppercase tracking-wider">Resultado da IA</span>
                            <p className="text-[10px] text-slate-300 leading-relaxed font-medium">{iaAnalysis}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                  </div>

                  {/* Pix Payment Modal Simulation Inside Phone */}
                  <AnimatePresence>
                    {pixModalInvoice && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/85 z-40 flex items-center justify-center p-4 text-center"
                      >
                        <motion.div 
                          initial={{ scale: 0.9 }} 
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.9 }}
                          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-full max-w-xs space-y-4"
                        >
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                              <Zap className="w-3 h-3" /> PIX Dinâmico Gerado
                            </span>
                            <button onClick={() => setPixModalInvoice(null)} className="text-slate-500 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 block">Cobrança para:</span>
                            <span className="text-xs font-bold text-white block">{pixModalInvoice.client}</span>
                            <span className="text-sm font-extrabold text-emerald-400 block">{pixModalInvoice.value}</span>
                          </div>

                          {/* Simulated QR Code box */}
                          <div className="w-24 h-24 bg-white p-2.5 mx-auto rounded-lg border border-slate-800 flex items-center justify-center">
                            {/* Abstract QR code vector style */}
                            <div className="w-full h-full bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:6px_6px] relative">
                              {/* Corner markers */}
                              <div className="absolute top-0 left-0 w-4 h-4 border-2 border-black" />
                              <div className="absolute top-0 right-0 w-4 h-4 border-2 border-black" />
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-black" />
                            </div>
                          </div>

                          <p className="text-[9px] text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                            Código Pix copia e cola gerado de forma única para compensação imediata.
                          </p>

                          <div className="space-y-1.5 pt-2">
                            <button
                              onClick={() => {
                                addNotification("Código Pix copiado!");
                              }}
                              className="w-full py-1.5 bg-slate-800 hover:bg-slate-750 text-white text-[10px] font-bold rounded-lg"
                            >
                              Copiar Código Pix
                            </button>
                            <button
                              onClick={handleConfirmPixPayment}
                              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow"
                            >
                              Simular Baixa do Pagamento
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Finance Bottom Tab Navigation */}
                  <nav className="h-12 bg-white/[0.02] border-t border-white/10 grid grid-cols-3 select-none z-15 backdrop-blur-md">
                    {[
                      { id: "dashboard", label: "Geral", icon: TrendingUp },
                      { id: "invoices", label: "Cobranças", icon: DollarSign },
                      { id: "ia", label: "IA Previsão", icon: Sparkles },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = financeTab === tab.id;
                      return (
                        <motion.button
                          key={tab.id}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFinanceTab(tab.id as any)}
                          className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer relative ${
                            isActive ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {isActive && (
                            <motion.div 
                              layoutId="activeFinanceIndicator" 
                              className="absolute inset-0 bg-emerald-500/[0.03] z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon className="w-4 h-4 z-10" />
                          <span className="text-[8px] font-semibold z-10">{tab.label}</span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Physical Smartphone Home Button Bar */}
              <div className="h-5 bg-slate-950 flex items-center justify-center select-none z-20">
                <div className="w-24 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          ) : (
            // IFRAME PREVIEW FOR REAL HOSTEABLE DIRECTORY DEMOS
            <div className="flex-1 w-full h-full bg-white relative flex flex-col overflow-hidden">
              
              {/* Simulated Mobile/Browser Header */}
              {viewport !== "desktop" && (
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-3 text-slate-400 z-10 text-xs">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 bg-slate-950 rounded py-0.5 px-2 text-[10px] text-slate-500 font-mono text-center truncate">
                    {realApp ? realApp.archiveName : `${project.id}-demo.suitehub.com`}
                  </div>
                </div>
              )}

              <div className="flex-1 w-full h-full bg-white relative">
                {realApp ? (
                  <iframe
                    key={iframeKey}
                    src={getFullUrl(realApp.entryPath)}
                    title={realApp.name}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-800 space-y-4">
                    <span className="p-3 bg-amber-100 text-amber-700 rounded-full">
                      <RotateCcw className="w-6 h-6 animate-spin" />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900">Carregando arquivo de demonstração</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Sincronizando arquivos do pacote estático no seu navegador. Isso pode levar alguns segundos.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Info / instructions */}
      <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>💡 Toque nos botões de navegação, simule pagamentos Pix ou envie mensagens para interagir!</span>
        <span>© Suite Hub • Tecnologia e Inovação sob Medida</span>
      </div>
    </div>
  );
}
