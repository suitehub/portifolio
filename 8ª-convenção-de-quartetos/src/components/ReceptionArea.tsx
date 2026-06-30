/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, CheckCircle, UserX, UserCheck, Search, ShieldCheck, 
  MapPin, Phone, Mail, QrCode, ArrowLeft, LogOut, Check, ChevronRight, X 
} from 'lucide-react';
import { Participant } from '../types';

interface ReceptionAreaProps {
  participants: Participant[];
  onCheckIn: (id: string) => void;
  onLogout: () => void;
}

export default function ReceptionArea({ participants, onCheckIn, onLogout }: ReceptionAreaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<Participant | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Compute stats in real time based on parent state!
  const totalInscritos = participants.length;
  const presentes = participants.filter((p) => p.status === 'Presente').length;
  const ausentes = totalInscritos - presentes;
  const taxaPresenca = totalInscritos > 0 ? Math.round((presentes / totalInscritos) * 100) : 0;

  // Filter participants
  const filteredParticipants = participants.filter((p) => {
    const searchString = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(searchString) || 
           p.city.toLowerCase().includes(searchString) || 
           p.phone.includes(searchTerm) ||
           p.email.toLowerCase().includes(searchString);
  });

  const handleConfirmCheckIn = (p: Participant) => {
    onCheckIn(p.id);
    
    // Play virtual beep sound or show success toast
    setSuccessToast(`Entrada de ${p.name.split(' ')[0]} confirmada!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);

    // If selected, update local reference
    if (selectedPart && selectedPart.id === p.id) {
      setSelectedPart({ ...selectedPart, status: 'Presente', checkInTime: 'Agora' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white relative">
      
      {/* Top Reception Header Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 sticky top-0 z-30 shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-slate-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider block uppercase">Portal do Credenciamento</span>
              <span className="text-sm font-extrabold text-slate-100 tracking-wider font-display uppercase">Equipe de Recepção</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>TERMINAL RECP-01 ONLINE</span>
            </div>
            
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-medium text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer transition-all border border-slate-700/80"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Success Beep Alert toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 font-bold text-sm flex items-center space-x-3 border-2 border-white"
          >
            <CheckCircle className="w-5 h-5 text-slate-950" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* If detailed participant view is active */}
        {selectedPart ? (
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => setSelectedPart(null)}
              className="mb-6 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Lista de Presença</span>
            </button>

            {/* Detailed Participant Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider font-bold block uppercase">Visualizando Registro</span>
                  <h2 className="text-lg font-bold font-display mt-0.5">{selectedPart.name}</h2>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedPart.status === 'Presente' || participants.find(p=>p.id === selectedPart.id)?.status === 'Presente'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {(selectedPart.status === 'Presente' || participants.find(p=>p.id === selectedPart.id)?.status === 'Presente') ? 'Presente' : 'Pendente'}
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Details list */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <UserCheck className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Nome Completo</span>
                      <p className="text-sm font-semibold text-slate-800">{selectedPart.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">E-mail</span>
                      <p className="text-sm font-semibold text-slate-800">{selectedPart.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Telefone</span>
                      <p className="text-sm font-semibold text-slate-800">{selectedPart.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Cidade de Origem</span>
                      <p className="text-sm font-semibold text-slate-800">{selectedPart.city}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code and Check-in action */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center text-center">
                  <QrCode className="w-24 h-24 text-slate-800 mb-4 stroke-1" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    ID: {selectedPart.id.toUpperCase()}
                  </span>
                  
                  {/* Status interactive badge */}
                  {(selectedPart.status === 'Presente' || participants.find(p=>p.id === selectedPart.id)?.status === 'Presente') ? (
                    <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100 flex items-center space-x-1.5">
                      <Check className="w-4 h-4" />
                      <span>Credenciamento Confirmado</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConfirmCheckIn(selectedPart)}
                      className="mt-4 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <UserCheck className="w-4 h-4 text-slate-950" />
                      <span>Confirmar Entrada</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-slate-100/60 p-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedPart(null)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Fechar Detalhes
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Stats Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5 sm:space-x-4">
                <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase block truncate">Total Inscritos</span>
                  <strong className="text-base sm:text-xl font-bold text-slate-800 font-display block leading-none mt-1">{totalInscritos}</strong>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5 sm:space-x-4">
                <div className="p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase block truncate">Presentes</span>
                  <strong className="text-base sm:text-xl font-bold text-slate-800 font-display block leading-none mt-1">{presentes}</strong>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5 sm:space-x-4">
                <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                  <UserX className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase block truncate">Ausentes</span>
                  <strong className="text-base sm:text-xl font-bold text-slate-800 font-display block leading-none mt-1">{ausentes}</strong>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5 sm:space-x-4">
                <div className="p-2.5 sm:p-3 bg-teal-50 text-teal-600 rounded-xl shrink-0">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono uppercase block truncate">Taxa Presença</span>
                  <strong className="text-base sm:text-xl font-bold text-slate-800 font-display block leading-none mt-1">{taxaPresenca}%</strong>
                </div>
              </div>

            </div>

            {/* Live Search and table segment */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-base font-display">Localizar Inscrição de Participante</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Use o campo abaixo para filtrar por nome, celular, e-mail ou cidade.</p>
                </div>

                {/* Input block */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Pesquisar participantes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500/50 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-hidden text-xs transition-all"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Table rendering list */}
              <div className="overflow-x-auto">
                <table className="min-w-[650px] md:w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-4 px-6">Nome Completo</th>
                      <th className="py-4 px-6">Telefone</th>
                      <th className="py-4 px-6">Cidade</th>
                      <th className="py-4 px-6 text-center">Status</th>
                      <th className="py-4 px-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((part) => (
                        <tr 
                          key={part.id}
                          className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                          onClick={() => setSelectedPart(part)}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center font-display shrink-0">
                                {part.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-semibold text-slate-800 block group-hover:text-emerald-600 transition-colors">{part.name}</span>
                                <span className="text-slate-400 text-[10px]">{part.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-mono font-medium">{part.phone}</td>
                          <td className="py-4 px-6 text-slate-500">{part.city}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              part.status === 'Presente'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${part.status === 'Presente' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {part.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-2">
                              {part.status === 'Pendente' ? (
                                <button
                                  onClick={() => handleConfirmCheckIn(part)}
                                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg cursor-pointer transition-all active:scale-95 flex items-center space-x-1 hover:shadow-xs text-[11px]"
                                >
                                  <Check className="w-3.5 h-3.5 text-slate-950" />
                                  <span>Confirmar Entrada</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-mono italic pr-3">
                                  {part.checkInTime || 'Credenciado'}
                                </span>
                              )}
                              <button
                                onClick={() => setSelectedPart(part)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                                title="Ver Detalhes"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                          Nenhum participante localizado com "{searchTerm}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table pagination stats footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>MOSTRANDO {filteredParticipants.length} DE {totalInscritos} INSCRITOS</span>
                <span>8ª CONVENÇÃO DE QUARTETOS • CREDENCIAMENTO DIGITAL</span>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
