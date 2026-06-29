import { 
  ArrowLeft, 
  Check, 
  Users, 
  Puzzle, 
  Sparkles, 
  HelpCircle,
  TrendingUp,
  Boxes,
  Lock,
  ChevronDown,
  Church,
  Stethoscope,
  Ticket,
  LineChart,
  Building,
  Settings,
  ShieldCheck,
  Send,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { Solution } from "../types";
import { modulesData } from "../data";

interface SolutionDetailsProps {
  solution: Solution;
  onBack: () => void;
}

export function SolutionDetails({ solution, onBack }: SolutionDetailsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Map solution icon string to actual Lucide component
  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case "Church":
        return <Church className="w-8 h-8 text-sky-400" />;
      case "Stethoscope":
        return <Stethoscope className="w-8 h-8 text-sky-400" />;
      case "Ticket":
        return <Ticket className="w-8 h-8 text-sky-400" />;
      case "LineChart":
        return <LineChart className="w-8 h-8 text-sky-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-sky-400" />;
      case "Building":
        return <Building className="w-8 h-8 text-sky-400" />;
      default:
        return <Settings className="w-8 h-8 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Sub-Header Back Navigation */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao catálogo geral</span>
        </button>
        <span className="text-[10px] px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-bold uppercase">
          Suite Hub Soluções Catalogadas
        </span>
      </div>

      {/* 2. Hero Solution Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-880 bg-slate-900/40 p-6 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-md">
                {getSolutionIcon(solution.icon)}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Solução Reutilizável</span>
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{solution.title}</h2>
              </div>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {solution.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/5511972499370?text=${encodeURIComponent(`Olá! Gostaria de fazer um orçamento para o projeto de ${solution.title} desenvolvido pela Suite Hub.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                Solicitar Orçamento via WhatsApp
              </a>
              <a
                href={`https://wa.me/5511972499370?text=${encodeURIComponent(`Olá! Tenho interesse em saber mais sobre o ${solution.title} desenvolvido pela Suite Hub.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center"
              >
                Falar com Especialista
              </a>
            </div>
          </div>

          {/* Solution Metadata Board */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-850 pb-2">
              Informações Gerais
            </h4>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Users className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Público-Alvo</span>
                  <p className="font-medium text-slate-300 mt-0.5">{solution.targetAudience}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 border-t border-slate-900 pt-3">
                <ShieldCheck className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Banco de Dados</span>
                  <p className="font-medium text-slate-300 mt-0.5">Google Firestore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Features & Key Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Features Checklist */}
        <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="p-1 bg-sky-500/15 text-sky-400 rounded-md">
              <Sparkles className="w-4 h-4" />
            </span>
            Recursos Técnicos de Destaque
          </h3>
          <ul className="space-y-3">
            {solution.features.map((feat, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Checklist */}
        <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="p-1 bg-emerald-500/15 text-emerald-400 rounded-md">
              <TrendingUp className="w-4 h-4" />
            </span>
            Impacto e Benefícios Operacionais
          </h3>
          <ul className="space-y-3">
            {solution.benefits.map((ben, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                <span className="leading-relaxed">{ben}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Included Modules List */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
          <Boxes className="w-5 h-5 text-sky-400" />
          Módulos Suite Hub Recomendados Para Esta Solução
        </h3>
        <p className="text-xs text-slate-400">
          Estes módulos são integráveis nativamente na arquitetura desta solução, permitindo acelerar o prazo de entrega em até 50%.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {solution.modules.map((modId) => {
            const mod = modulesData.find(m => m.id === modId);
            if (!mod) return null;
            return (
              <div key={modId} className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex flex-col justify-between space-y-2">
                <div>
                  <h5 className="text-xs font-bold text-slate-200">{mod.name}</h5>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1 line-clamp-2">{mod.description}</p>
                </div>
                <span className="text-[9px] text-sky-400 font-mono">Incluso no baseline</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Frequently Asked Questions FAQ */}
      <div className="space-y-6">
        <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          Perguntas Frequentes Sobre a Solução
        </h3>
        
        <div className="space-y-3 max-w-4xl">
          {solution.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/40 border border-slate-850 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-sm text-slate-200 font-bold hover:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-900/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Call to Action Banner */}
      <div className="bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-sky-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white tracking-tight">Pronto para digitalizar seu negócio?</h4>
          <p className="text-xs text-slate-400">Leve de 6 a 8 semanas para colocar sua solução na Google Play e App Store.</p>
        </div>
        <a
          href={`https://wa.me/5511972499370?text=${encodeURIComponent(`Olá! Quero dar início ao projeto do aplicativo: ${solution.title}.`)}`}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 cursor-pointer inline-flex items-center"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
