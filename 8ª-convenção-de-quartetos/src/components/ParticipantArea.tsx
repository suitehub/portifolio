/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, QrCode, Calendar, Clock, LogOut, 
  Map, Bell, ShieldAlert, CheckCircle, ChevronLeft, Search, Music, Sparkles,
  Menu, X
} from 'lucide-react';
import { Participant, ScheduleItem } from '../types';

interface ParticipantAreaProps {
  currentUser: Participant;
  schedule: ScheduleItem[];
  onLogout: () => void;
  onNavigate: (view: string, role?: 'public' | 'participant' | 'reception' | 'organizer') => void;
}

export default function ParticipantArea({ currentUser, schedule, onLogout, onNavigate }: ParticipantAreaProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'programacao' | 'meus-dados'>('home');
  const [scheduleFilter, setScheduleFilter] = useState<'Todos' | 'Geral' | 'Musical' | 'Intervalo' | 'Abertura' | 'Encerramento'>('Todos');
  const [scheduleSearch, setScheduleSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSchedule = schedule.filter((item) => {
    const matchesFilter = scheduleFilter === 'Todos' || item.category === scheduleFilter;
    const matchesSearch = item.title.toLowerCase().includes(scheduleSearch.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(scheduleSearch.toLowerCase())) ||
                          (item.speaker && item.speaker.toLowerCase().includes(scheduleSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shrink-0">
        {/* App Logo */}
        <div className="p-4 md:p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-slate-950">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider block uppercase">8ª Convenção</span>
              <span className="text-xs font-black tracking-widest text-slate-100 uppercase font-display">DE QUARTETOS</span>
            </div>
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Participant Brief Profile and Navigation - Collapsible on Mobile */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden md:flex md:flex-col md:flex-1'}`}>
          {/* Participant Brief Profile */}
          <div className="p-6 bg-slate-950/40 border-b border-slate-800/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-400 text-slate-950 font-bold flex items-center justify-center font-display shadow-lg shadow-emerald-500/10">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-slate-200 truncate">{currentUser.name}</h4>
                <p className="text-[10px] text-slate-500 truncate font-mono uppercase">CONVENÇÃO PARTICIPANTE</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 font-medium">Inscrição Validada</span>
            </div>
          </div>

          {/* Menu Navigation */}
          <nav className="p-4 space-y-1 flex-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full px-4 py-3 text-sm font-medium rounded-xl flex items-center space-x-3 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/15'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span>Meu Ingresso / Início</span>
            </button>

            <button
              onClick={() => { setActiveTab('programacao'); setMobileMenuOpen(false); }}
              className={`w-full px-4 py-3 text-sm font-medium rounded-xl flex items-center space-x-3 transition-colors cursor-pointer ${
                activeTab === 'programacao'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/15'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Programação</span>
            </button>

            <button
              onClick={() => { setActiveTab('meus-dados'); setMobileMenuOpen(false); }}
              className={`w-full px-4 py-3 text-sm font-medium rounded-xl flex items-center space-x-3 transition-colors cursor-pointer ${
                activeTab === 'meus-dados'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/15'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Meus Dados</span>
            </button>
          </nav>

          {/* Exit portal button */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={onLogout}
              className="w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-red-950/20 border border-slate-800 hover:border-red-900/30 rounded-xl flex items-center space-x-3 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sair do Aplicativo</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
        
        {/* HEADER BAR FOR CONVERSIONS */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono">Painel do Participante</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display sm:text-3xl">
              {activeTab === 'home' && 'Bem-vindo à Convenção!'}
              {activeTab === 'programacao' && 'Agenda do Evento'}
              {activeTab === 'meus-dados' && 'Meus Dados Cadastrais'}
            </h1>
          </div>
          
          {/* Notification Alert Accent */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-2 flex items-center space-x-2 text-xs text-emerald-700 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Entrada confirmada: {currentUser.status === 'Presente' ? 'Presente (Credenciado)' : 'Reservado (Pendente)'}</span>
          </div>
        </header>

        {/* TAB 1: MEU INGRESSO & INÍCIO */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Credencial (Ticket Pass Card) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-xs bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800"
              >
                {/* Visual cutout circles representing a classic ticket pass stub */}
                <div className="absolute left-0 top-[60%] w-6 h-12 bg-slate-50 rounded-r-full -translate-x-3 border-r border-slate-800" />
                <div className="absolute right-0 top-[60%] w-6 h-12 bg-slate-50 rounded-l-full translate-x-3 border-l border-slate-800" />

                {/* Card Header */}
                <div className="p-6 bg-linear-to-br from-emerald-500 to-teal-600 text-slate-950 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest border border-slate-950/20 px-2 py-0.5 rounded">
                      8ª Convenção
                    </span>
                    <Music className="w-5 h-5 text-slate-950" />
                  </div>
                  <h3 className="font-extrabold text-lg leading-tight font-display tracking-tight uppercase">
                    Passaporte Digital
                  </h3>
                  <p className="text-[10px] text-slate-900 font-mono tracking-wider mt-1 font-bold">
                    ACESSO COMPLETO • SÃO PAULO
                  </p>
                </div>

                {/* Card Body - Participant info */}
                <div className="p-6 pt-8 pb-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] text-slate-500 font-mono block">PARTICIPANTE</span>
                      <strong className="text-slate-100 text-sm font-medium">{currentUser.name}</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block">CIDADE</span>
                        <strong className="text-slate-300 text-xs font-medium">{currentUser.city}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block">RESERVA</span>
                        <strong className="text-emerald-400 text-xs font-bold font-mono">CONFIRMADA</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket dotted divider line */}
                <div className="border-t border-dashed border-slate-800 my-2 px-6 mx-auto w-[85%]" />

                {/* Card Bottom - QR Code */}
                <div className="p-6 pt-4 flex flex-col items-center bg-slate-900/40">
                  {/* Decorative animated music-theme QR code */}
                  <div className="p-4 bg-white rounded-2xl relative group shadow-lg">
                    <svg viewBox="0 0 100 100" className="w-32 h-32">
                      {/* Stylized QR Code elements */}
                      <rect x="0" y="0" width="25" height="25" fill="#020617" />
                      <rect x="5" y="5" width="15" height="15" fill="#ffffff" />
                      <rect x="8" y="8" width="9" height="9" fill="#020617" />
                      
                      <rect x="75" y="0" width="25" height="25" fill="#020617" />
                      <rect x="80" y="5" width="15" height="15" fill="#ffffff" />
                      <rect x="83" y="8" width="9" height="9" fill="#020617" />

                      <rect x="0" y="75" width="25" height="25" fill="#020617" />
                      <rect x="5" y="80" width="15" height="15" fill="#ffffff" />
                      <rect x="8" y="83" width="9" height="9" fill="#020617" />

                      {/* Random aesthetic QR blocks */}
                      <rect x="35" y="5" width="10" height="10" fill="#020617" />
                      <rect x="55" y="10" width="15" height="5" fill="#020617" />
                      <rect x="35" y="25" width="5" height="15" fill="#020617" />
                      <rect x="50" y="30" width="15" height="10" fill="#020617" />
                      <rect x="20" y="45" width="25" height="5" fill="#020617" />
                      <rect x="10" y="55" width="10" height="15" fill="#020617" />
                      <rect x="35" y="55" width="15" height="10" fill="#020617" />
                      
                      <rect x="70" y="35" width="10" height="25" fill="#020617" />
                      <rect x="85" y="45" width="10" height="10" fill="#020617" />
                      <rect x="55" y="65" width="15" height="15" fill="#020617" />
                      <rect x="80" y="70" width="15" height="15" fill="#020617" />
                      
                      <rect x="30" y="80" width="15" height="5" fill="#020617" />
                      <rect x="35" y="90" width="20" height="5" fill="#020617" />

                      {/* Custom Music Symbol overlay in the center */}
                      <circle cx="50" cy="50" r="14" fill="#10b981" />
                      <path d="M 47,56 L 47,44 L 56,41 L 56,53" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="44" cy="56" r="3" fill="#ffffff" />
                      <circle cx="53" cy="53" r="3" fill="#ffffff" />
                    </svg>

                    {/* QR watermark indicator */}
                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-xs">
                      <span className="bg-slate-950 text-white text-[9px] font-mono font-bold tracking-wider px-2 py-1 rounded">
                        MOCK PASS VALID
                      </span>
                    </div>
                  </div>

                  {/* QR instruction */}
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest mt-4 uppercase">
                    ID: {currentUser.id.toUpperCase()}
                  </span>
                  <p className="text-[10px] text-slate-400 font-light text-center mt-1">
                    Apresente este QR Code no credenciamento ao chegar ao auditório.
                  </p>
                </div>
              </motion.div>

              {/* Quick visual ticket action */}
              <button
                onClick={() => window.print()}
                className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1.5 cursor-pointer hover:underline"
              >
                <span>Baixar Passaporte em PDF</span>
              </button>
            </div>

            {/* Informações importantes e status */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Welcome card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Área do Participante</span>
                <h2 className="text-xl font-bold text-slate-800 mt-1 font-display">
                  Olá, {currentUser.name}!
                </h2>
                <p className="text-slate-500 text-sm mt-2 font-light leading-relaxed">
                  Estamos extremamente felizes com sua inscrição na <strong>8ª Convenção Nacional de Quartetos</strong>. Prepare-se para vivenciar uma imersão musical inesquecível, cercado de harmonia, conhecimento técnico e inspiração de alto nível vocal.
                </p>

                {/* Live update regarding status */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                  <div className={`p-2 rounded-xl text-xs font-bold ${currentUser.status === 'Presente' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-800 text-sm">Status da sua Reserva</strong>
                    <p className="text-slate-500 text-xs mt-0.5 font-light">
                      {currentUser.status === 'Presente' 
                        ? 'Você já se credenciou na recepção oficial e sua entrada foi liberada! Excelente convenção!' 
                        : 'Sua vaga está garantida de forma segura. Apresente o QR Code ao lado na portaria para realizar o credenciamento e liberar sua pulseira de acesso.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações de Utilidade Pública */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 font-display text-base mb-4 flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  <span>Avisos Importantes</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex space-x-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      <strong>Horário do Credenciamento:</strong> Os portões se abrirão às 18:00 na sexta-feira (24/07). Recomendamos chegar com pelo menos 45 minutos de antecedência para evitar filas de credenciamento.
                    </p>
                  </div>

                  <div className="flex space-x-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      <strong>Material Incluso:</strong> Na recepção, você receberá um crachá de identificação de setor, caderno de partituras oficial e caneta temática da convenção.
                    </p>
                  </div>

                  <div className="flex space-x-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      <strong>Gravação Coletiva:</strong> O ensaio do grande coro de quartetos no sábado será gravado profissionalmente em áudio e vídeo de alta definição. O ensaio é obrigatório para todos que desejarem cantar na faixa oficial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Summary Widget */}
              <div className="bg-linear-to-br from-slate-900 to-slate-800 text-slate-200 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white font-display text-sm">Local do Evento</h4>
                  <p className="text-slate-400 text-xs mt-1">Grande Auditório Alpha - São Paulo, SP</p>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">Av. das Nações Unidas, 1200</p>
                </div>
                <button 
                  onClick={() => setActiveTab('programacao')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Abrir Mapa
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PROGRAMAÇÃO COMPLETA */}
        {activeTab === 'programacao' && (
          <div className="space-y-6">
            
            {/* Search and Filters bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar atrações, temas ou facilitadores..."
                  value={scheduleSearch}
                  onChange={(e) => setScheduleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500/50 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-hidden text-xs transition-all"
                />
              </div>

              {/* Quick Filter Pill list */}
              <div className="flex flex-wrap items-center gap-2">
                {(['Todos', 'Geral', 'Musical', 'Intervalo', 'Abertura', 'Encerramento'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setScheduleFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      scheduleFilter === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* List schedule Items */}
            <div className="space-y-4">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-emerald-500/20 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-4 items-start md:items-center"
                  >
                    
                    {/* Time block */}
                    <div className="md:w-32 shrink-0 flex md:flex-col items-start gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold tracking-wider">
                        {item.time.split(' ')[2]}
                      </span>
                      <span className="text-slate-500 text-xs font-mono">
                        {item.time.split(' ')[0]}
                      </span>
                    </div>

                    {/* Dotted border vertical separator */}
                    <div className="hidden md:block self-stretch w-[1px] bg-slate-100" />

                    {/* Main details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                          item.category === 'Musical' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          item.category === 'Intervalo' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          item.category === 'Abertura' || item.category === 'Encerramento' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {item.category}
                        </span>
                        {item.speaker && (
                          <span className="text-[10px] text-slate-400 font-light">
                            • Facilitado por <strong className="text-slate-600 font-medium">{item.speaker}</strong>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-800 font-display mt-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl py-12 px-6 text-center border border-slate-200/80">
                  <p className="text-slate-400 text-sm">Nenhuma atração localizada com os filtros aplicados.</p>
                  <button 
                    onClick={() => { setScheduleFilter('Todos'); setScheduleSearch(''); }}
                    className="mt-3 text-xs font-bold text-emerald-600 cursor-pointer hover:underline"
                  >
                    Redefinir Filtros
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: MEUS DADOS CADASTRAIS */}
        {activeTab === 'meus-dados' && (
          <div className="max-w-2xl bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
            <h3 className="font-bold text-slate-800 font-display text-lg mb-6 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <User className="w-5 h-5 text-emerald-500" />
              <span>Informações Pessoais do Participante</span>
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Nome Completo</label>
                  <span className="block mt-1.5 text-sm font-semibold text-slate-800">{currentUser.name}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">E-mail Cadastrado</label>
                  <span className="block mt-1.5 text-sm font-semibold text-slate-800">{currentUser.email}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Celular / Telefone</label>
                  <span className="block mt-1.5 text-sm font-semibold text-slate-800">{currentUser.phone}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Cidade / Estado</label>
                  <span className="block mt-1.5 text-sm font-semibold text-slate-800">{currentUser.city}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Status do Ingresso</label>
                  <span className="inline-flex mt-1.5 items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Reserva Confirmada
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Data de Registro</label>
                  <span className="block mt-1.5 text-sm font-semibold text-slate-800">{currentUser.registrationDate || '29/06/2026'}</span>
                </div>
              </div>

              {/* Informações complementares de alteração */}
              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl text-xs text-slate-500 leading-relaxed font-light">
                <span className="font-bold text-slate-700 block mb-1 uppercase tracking-wider text-[9px] font-mono">Como alterar seus dados?</span>
                Caso precise realizar qualquer correção em seu e-mail, telefone ou nome, entre em contato diretamente com a equipe organizadora no guichê de credenciamento ou envie uma mensagem para <strong>suporte@convencaodequartetos.com.br</strong> portando o código de reserva.
              </div>

              {/* Back button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar para o Painel</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
