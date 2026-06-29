import { useState } from "react";
import { 
  Check, 
  HelpCircle, 
  Send, 
  Sparkles, 
  Layers, 
  Clock, 
  DollarSign,
  Briefcase,
  Zap,
  Info
} from "lucide-react";
import { motion } from "motion/react";
import { Solution, ModuleItem } from "../types";
import { solutionsData, modulesData } from "../data";

interface BudgetCalculatorProps {
  initialSolutionId?: string;
}

export function BudgetCalculator({ initialSolutionId }: BudgetCalculatorProps) {
  const [selectedSolution, setSelectedSolution] = useState<Solution>(
    solutionsData.find(s => s.id === initialSolutionId) || solutionsData[0]
  );
  
  // Set of selected module IDs - pre-filled based on the selected solution templates!
  const [selectedModules, setSelectedModules] = useState<string[]>(
    solutionsData.find(s => s.id === initialSolutionId)?.modules || solutionsData[0].modules
  );

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [showResult, setShowResult] = useState(false);

  // When changing solution template, automatically synchronize modules to that template
  const handleSolutionChange = (solution: Solution) => {
    setSelectedSolution(solution);
    setSelectedModules(solution.modules);
  };

  const toggleModule = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(id => id !== moduleId));
    } else {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  // Calculate price and time estimation
  const calculateTotal = () => {
    const basePrice = selectedSolution.basePriceEstimate;
    const modulesPrice = selectedModules.reduce((acc, modId) => {
      const mod = modulesData.find(m => m.id === modId);
      return acc + (mod ? mod.priceWeight : 0);
    }, 0);
    
    const totalPrice = basePrice + modulesPrice;
    
    // Estimate weeks: base weeks + modules contribution
    const baseWeeks = 6;
    const additionalWeeks = Math.ceil(selectedModules.length / 4);
    const totalWeeks = baseWeeks + additionalWeeks;

    return { totalPrice, totalWeeks };
  };

  const { totalPrice, totalWeeks } = calculateTotal();

  const handleSendWhatsApp = () => {
    const activeModulesText = selectedModules
      .map(id => modulesData.find(m => m.id === id)?.name || id)
      .join(", ");

    const text = `Olá, Suite Hub! Gostaria de solicitar um orçamento para meu projeto personalizado:
    
- *Solução Base*: ${selectedSolution.title}
- *Módulos Selecionados*: ${activeModulesText}
- *Valor Estimado*: R$ ${totalPrice.toLocaleString("pt-BR")},00
- *Prazo Estimado*: ${totalWeeks} semanas
${contactName ? `\n*Meu Nome*: ${contactName}` : ""}${contactEmail ? `*Meu E-mail*: ${contactEmail}` : ""}

Tenho interesse em iniciar o planejamento e agendar o protótipo navegável. Aguardo retorno!`;

    const encodedText = encodeURIComponent(text);
    // Open whatsapp link
    window.open(`https://wa.me/5551999999999?text=${encodedText}`, "_blank");
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <header className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Arquiteto de Orçamentos
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Monte o aplicativo ideal para seu negócio
        </h3>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          Selecione a solução de base mais próxima do seu negócio, ligue ou desligue os módulos que deseja adicionar e tenha uma estimativa orçamentária e de tempo instantânea.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Selector Templates & Module List (7 and 5 cols grid) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Base Solutions Template select */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              1. Selecione a Categoria Base do Aplicativo
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {solutionsData.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => handleSolutionChange(sol)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    selectedSolution.id === sol.id
                      ? "bg-sky-950/40 border-sky-500 text-white shadow-lg shadow-sky-950/20"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xs font-bold block truncate">{sol.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Est. R$ {sol.basePriceEstimate.toLocaleString("pt-BR")}</span>
                  {selectedSolution.id === sol.id && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Interactive Module Selection */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-sky-400" />
                2. Ativar ou Desativar Recursos e Módulos
              </h4>
              <span className="text-xs text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                {selectedModules.length} de {modulesData.length} ativos
              </span>
            </div>

            {/* Grid categories of modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {modulesData.map((mod) => {
                const isSelected = selectedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? "bg-slate-900 border-sky-500/70 text-slate-100 shadow-md shadow-sky-950/10"
                        : "bg-slate-950/40 border-slate-850 hover:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                      isSelected ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}>
                      <Check className={`w-3.5 h-3.5 transition-opacity ${isSelected ? "opacity-100" : "opacity-20"}`} />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>{mod.name}</h5>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-snug">{mod.description}</p>
                      <span className="text-[9px] text-sky-400/80 font-mono mt-1 block">+ R$ {mod.priceWeight.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column: Sticky Proposal Estimation Summary (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-3">
            Métricas de Orçamento
          </h4>

          {/* Quick Recap */}
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-slate-500">Modelo Selecionado:</span>
              <span className="font-bold text-slate-200 block mt-0.5">{selectedSolution.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-3">
              <div>
                <span className="text-slate-500">Valor Base:</span>
                <span className="font-bold text-slate-300 block mt-0.5">R$ {selectedSolution.basePriceEstimate.toLocaleString("pt-BR")}</span>
              </div>
              <div>
                <span className="text-slate-500">Módulos Extra:</span>
                <span className="font-bold text-slate-300 block mt-0.5">
                  R$ {(totalPrice - selectedSolution.basePriceEstimate).toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </div>

          {/* Total display board */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950/30 border border-sky-500/20 rounded-xl p-4 text-center space-y-1">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Investimento Estimado</span>
            <div className="text-3xl font-black text-white flex items-center justify-center gap-1">
              <span className="text-sm font-normal text-slate-400 align-super">R$</span>
              <span>{totalPrice.toLocaleString("pt-BR")}</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Isento de mensalidades de licença • Código 100% seu</span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center text-xs">
            <div>
              <Clock className="w-4 h-4 mx-auto text-sky-400 mb-1" />
              <span className="text-[10px] text-slate-500 block font-medium">Cronograma</span>
              <span className="font-bold text-slate-200">{totalWeeks} semanas</span>
            </div>
            <div>
              <Zap className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <span className="text-[10px] text-slate-500 block font-medium">Sua Propriedade</span>
              <span className="font-bold text-emerald-400 text-[10px]">Código 100% Livre</span>
            </div>
          </div>

          {/* User contact detail fields */}
          <div className="space-y-3 pt-2">
            <div>
              <input
                type="text"
                placeholder="Seu Nome (Opcional)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 placeholder-slate-600"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Seu E-mail (Opcional)"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 placeholder-slate-600"
              />
            </div>
          </div>

          <button
            onClick={handleSendWhatsApp}
            className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-950/20 hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Solicitar Proposta no WhatsApp
          </button>

          <p className="text-[10px] text-slate-600 leading-relaxed text-center">
            Ao solicitar propostas, nosso arquiteto de software revisará as especificações e agendará o protótipo gratuito no Figma.
          </p>

        </div>

      </div>

    </div>
  );
}
