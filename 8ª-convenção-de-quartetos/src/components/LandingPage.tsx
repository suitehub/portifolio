/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, MapPin, Ticket, LogIn, Music, ChevronRight, Compass, Shield, Award, Users } from 'lucide-react';
import { EventConfig, ScheduleItem } from '../types';

interface LandingPageProps {
  eventConfig: EventConfig;
  schedule: ScheduleItem[];
  onNavigate: (view: string, role?: 'public' | 'participant' | 'reception' | 'organizer') => void;
}

export default function LandingPage({ eventConfig, schedule, onNavigate }: LandingPageProps) {
  // Get first 4 schedule items for the outline
  const condensedSchedule = schedule.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/10">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block leading-none">8ª Convenção</span>
              <span className="text-sm font-extrabold text-slate-900 font-display">DE QUARTETOS</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center space-x-1"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </button>
            <button
              onClick={() => onNavigate('cadastro')}
              className="px-5 py-2.5 text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95 rounded-xl transition-all cursor-pointer flex items-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Reservar Ingresso</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-20 pb-28 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-6 font-mono uppercase tracking-wider">
            ★ Edição Especial — Inscrições Abertas ★
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight leading-[1.1] mb-6">
            O Maior Encontro de <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Quarteto Vocal do Brasil
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {eventConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('cadastro')}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 rounded-2xl shadow-xl shadow-emerald-400/20 hover:shadow-emerald-500/30 transition-all cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
            >
              <Ticket className="w-5 h-5 text-slate-950" />
              <span>Garantir Vaga Gratuita</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('programacao');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold border border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-200 rounded-2xl transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5 text-slate-400" />
              <span>Ver Programação</span>
            </button>
          </div>
        </div>

        {/* Floating visual element representing a music layout / app preview */}
        <div className="max-w-5xl mx-auto mt-16 relative">
          <div className="aspect-[16/8] rounded-3xl bg-linear-to-tr from-slate-900 to-slate-800 border border-slate-800 shadow-2xl p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent" />
            
            {/* Visualizer graphic or concert representation */}
            <div className="h-full w-full flex flex-col justify-between relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 font-mono pl-2">CONVENCAO_APP_V8.EXE</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">● LIVE_STREAM</span>
              </div>

              {/* Decorative vocals graphics */}
              <div className="flex justify-around items-end h-32 px-4 gap-2">
                {[50, 85, 40, 95, 70, 45, 100, 60, 30, 80, 55, 90, 35, 75, 45].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-linear-to-t from-emerald-500/80 to-emerald-400/20 rounded-t-lg transition-all" style={{ height: `${val}%` }} />
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-4 text-center">
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-slate-500 text-xs block font-mono">1º TENOR</span>
                  <span className="text-sm font-bold text-white">Voz Brilhante</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-slate-500 text-xs block font-mono">2º TENOR</span>
                  <span className="text-sm font-bold text-white">Harmonia Média</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-slate-500 text-xs block font-mono">BARÍTONO</span>
                  <span className="text-sm font-bold text-white">Apoio Técnico</span>
                </div>
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-slate-500 text-xs block font-mono">BAIXO</span>
                  <span className="text-sm font-bold text-white">Ressonância Grave</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display">Data do Evento</h3>
              <p className="text-slate-600 text-sm mt-1">{eventConfig.date}</p>
              <span className="text-xs text-emerald-600 font-semibold mt-2 block">Salvar na agenda →</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex items-start space-x-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display">Horário Oficial</h3>
              <p className="text-slate-600 text-sm mt-1">{eventConfig.time}</p>
              <span className="text-xs text-teal-600 font-semibold mt-2 block">Abertura dos portões às 18h00</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex items-start space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display">Localização</h3>
              <p className="text-slate-600 text-sm mt-1">{eventConfig.location}</p>
              <span className="text-xs text-blue-600 font-semibold mt-2 block">Estacionamento no local</span>
            </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">Por que participar?</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-2 sm:text-4xl">
            Uma Programação Inesquecível para Amantes do Canto Vocal
          </h2>
          <p className="text-slate-500 mt-4">
            Unimos técnica, inspiração e convívio prático para elevar a qualidade do canto em quartetos a um novo patamar técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 w-fit mb-4">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display mb-2">Quartetos de Elite</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Apresentações com os grupos mais refinados e tradicionais do cenário de canto a cappella.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
            <div className="p-3 bg-teal-50 rounded-xl text-teal-600 w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display mb-2">Técnica Vocal</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Workshops práticos de afinação, respiração em grupo e dinâmicas avançadas de voz.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 w-fit mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display mb-2">Conexão Real</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Espaços de networking para troca de partituras, contatos e formação de novos grupos vocais.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display mb-2">Sorteios Exclusivos</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sorteio de microfones profissionais e prêmios para os participantes presentes ao final do evento.
            </p>
          </div>
        </div>
      </section>

      {/* Program Outline (Programação Resumida) */}
      <section id="programacao" className="bg-slate-100/70 py-20 px-6 border-y border-slate-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">Destaques da Agenda</span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-1">Programação Resumida</h2>
            </div>
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>Ver programação completa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative before:absolute before:left-6 sm:before:left-1/2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
            {condensedSchedule.map((item, idx) => (
              <div 
                key={item.id} 
                className={`relative flex flex-col sm:flex-row items-stretch ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 sm:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-md -translate-x-1/2 top-4 z-10" />

                {/* Date/Time element */}
                <div className="pl-14 sm:pl-0 sm:w-1/2 flex items-center justify-start sm:justify-end sm:px-8 text-xs font-mono font-bold text-emerald-600 mb-2 sm:mb-0">
                  <span className={`${idx % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100`}>
                    {item.time}
                  </span>
                </div>

                {/* Card element */}
                <div className="pl-14 sm:pl-0 sm:w-1/2 sm:px-8">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:border-slate-300 transition-all">
                    <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-slate-800 font-display mt-2 text-base">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 font-light leading-relaxed">{item.description}</p>
                    {item.speaker && (
                      <div className="mt-3 flex items-center text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 mr-1">Facilitador:</span>
                        <span>{item.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Venue Map Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">Como chegar</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-2 mb-6">
            Estrutura Completa no Centro de Convenções Alpha
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 font-light">
            O Grande Auditório Alpha conta com acústica de ponta projetada especialmente para concertos corais e vocais, ar condicionado central, assentos estofados premium com excelente visibilidade de todos os setores, e ampla praça de alimentação no entorno.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-800 text-sm">Endereço</strong>
                <p className="text-slate-500 text-xs mt-0.5">Av. das Nações Unidas, 1200 - Brooklin, São Paulo - SP</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-800 text-sm">Segurança & Conforto</strong>
                <p className="text-slate-500 text-xs mt-0.5">Segurança privada, posto médico de atendimento e acessibilidade completa.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Vector Map Representation */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Grande Auditório Alpha</span>
          </div>

          {/* Styled SVG map sketch for high fidelity */}
          <div className="aspect-square sm:aspect-[4/3] bg-slate-950 rounded-2xl flex items-center justify-center p-4 border border-slate-800 relative overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
              {/* Roads / Grids */}
              <path d="M 0,150 Q 200,80 400,150" fill="none" stroke="#334155" strokeWidth="12" />
              <path d="M 120,0 L 120,300" fill="none" stroke="#334155" strokeWidth="8" />
              <path d="M 280,0 L 280,300" fill="none" stroke="#334155" strokeWidth="8" />
              <path d="M 0,220 L 400,220" fill="none" stroke="#1e293b" strokeWidth="4" />
              <path d="M 0,50 Q 200,120 400,50" fill="none" stroke="#1e293b" strokeWidth="4" />

              {/* Park representation */}
              <rect x="20" y="20" width="80" height="100" rx="10" fill="#047857" opacity="0.15" />
              <text x="60" y="70" fill="#059669" fontSize="10" fontFamily="monospace" textAnchor="middle">ÁREA VERDE</text>

              {/* Subway/Metro station representation */}
              <circle cx="280" cy="250" r="14" fill="#3b82f6" opacity="0.3" />
              <text x="280" y="253" fill="#60a5fa" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">M</text>
              <text x="280" y="275" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">METRÔ BROOKLIN</text>

              {/* Convention block */}
              <rect x="140" y="100" width="110" height="80" rx="12" fill="#059669" opacity="0.25" stroke="#10b981" strokeWidth="2" />
              
              {/* Parking */}
              <rect x="150" y="230" width="60" height="40" rx="8" fill="#475569" opacity="0.2" />
              <text x="180" y="254" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">VAGAS (P1)</text>
            </svg>

            {/* Custom pin overlay */}
            <div className="absolute top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="w-3 h-1.5 bg-slate-950/80 rounded-full blur-xs mt-1" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>COORD: -23.6019, -46.6974</span>
            <span className="text-emerald-400">SAÍDA 12 DA MARGINAL PINHEIROS</span>
          </div>
        </div>
      </section>

      {/* Ticket CTA banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold font-display tracking-tight sm:text-4xl">
            As vagas são limitadas à lotação!
          </h2>
          <p className="mt-4 text-emerald-100 font-light text-base leading-relaxed">
            Reserve seu ingresso digital gratuito agora mesmo para garantir sua cadeira no maior evento de quartetos do ano. O credenciamento digital será obrigatório na portaria.
          </p>
          <div className="mt-8">
            <button
              onClick={() => onNavigate('cadastro')}
              className="px-8 py-4 bg-white text-emerald-700 hover:bg-slate-50 font-bold rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95 inline-flex items-center space-x-2"
            >
              <Ticket className="w-5 h-5 text-emerald-600" />
              <span>Cadastrar Agora Grátis</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Music className="w-6 h-6 text-emerald-400" />
              <span className="font-extrabold text-sm font-display uppercase tracking-wider">8ª Convenção</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Uma iniciativa para fomento, resgate e desenvolvimento da música vocal harmônica de quartetos.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Links do App</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('cadastro')} className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Cadastro de Participante
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Login Participante
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login', 'reception')} className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Portal Recepção (Credenciamento)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard', 'organizer')} className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Portal do Organizador (Admin)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Suporte & Contato</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>E-mail: contato@convencaodequartetos.com.br</li>
              <li>Tel: (11) 5055-1234</li>
              <li>Brooklin, São Paulo - SP</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Demonstração</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <p className="text-slate-500 font-light leading-relaxed">
                Este é um <strong className="text-emerald-400">protótipo navegável de alta fidelidade</strong> para demonstração. Use o painel flutuante inferior para navegar instantaneamente entre os perfis do participante, recepção e organizador.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 font-mono">
          <span>© 2026 8ª Convenção de Quartetos. Todos os direitos reservados.</span>
          <span className="mt-2 sm:mt-0">DESENVOLVIDO PARA PREVIEW COMERCIAL</span>
        </div>
      </footer>
    </div>
  );
}
