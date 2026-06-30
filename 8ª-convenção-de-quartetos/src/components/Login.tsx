/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Lock, User, ArrowLeft, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';
import { Participant } from '../types';

interface LoginProps {
  participants: Participant[];
  onLoginSuccess: (user: Participant) => void;
  onStaffLoginSuccess: () => void;
  onNavigate: (view: string, role?: 'public' | 'participant' | 'reception' | 'organizer') => void;
  initialMode?: 'participant' | 'reception';
}

export default function Login({ 
  participants, 
  onLoginSuccess, 
  onStaffLoginSuccess, 
  onNavigate,
  initialMode = 'participant'
}: LoginProps) {
  const [mode, setMode] = useState<'participant' | 'reception'>(initialMode);
  
  // Participant form
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partError, setPartError] = useState('');

  // Reception form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [receptionError, setReceptionError] = useState('');

  const [loading, setLoading] = useState(false);

  // Take first 3 active participants for the quick autofill demo
  const sampleParticipants = participants.slice(0, 3);

  const handleParticipantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPartError('');
    if (!email || !phone) return;

    setLoading(true);
    setTimeout(() => {
      // Find matching mock participant
      const match = participants.find(
        (p) => p.email.toLowerCase().trim() === email.toLowerCase().trim() || 
               p.phone.replace(/\D/g, '') === phone.replace(/\D/g, '')
      );

      setLoading(false);
      if (match) {
        onLoginSuccess(match);
      } else {
        setPartError('Credenciais não encontradas. Tente usar um dos preenchimentos rápidos abaixo!');
      }
    }, 1000);
  };

  const handleQuickAutofill = (p: Participant) => {
    setEmail(p.email);
    setPhone(p.phone);
    setPartError('');
  };

  const handleReceptionLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setReceptionError('');
    if (!username || !password) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Fictional credentials for reception team
      if (username.trim().toLowerCase() === 'recepcao' && password === '1234') {
        onStaffLoginSuccess();
      } else {
        setReceptionError('Usuário ou senha incorretos. Dica: use usuário "recepcao" e senha "1234"');
      }
    }, 1000);
  };

  const autofillStaff = () => {
    setUsername('recepcao');
    setPassword('1234');
    setReceptionError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
      {/* Light spots */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px] translate-y-1/2 -translate-x-1/3" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />

      {/* Back button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center space-x-2 text-sm font-medium font-mono cursor-pointer transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Início</span>
      </button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 overflow-hidden">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />

          {/* Segmented Controller (Tabs) */}
          <div className="bg-slate-950 p-1.5 rounded-2xl flex border border-slate-800/80 mb-8">
            <button
              onClick={() => {
                setMode('participant');
                setPartError('');
                setReceptionError('');
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center uppercase tracking-wider ${
                mode === 'participant'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Participante
            </button>
            <button
              onClick={() => {
                setMode('reception');
                setPartError('');
                setReceptionError('');
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center uppercase tracking-wider ${
                mode === 'reception'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recepção / Staff
            </button>
          </div>

          {/* Tab 1: Participant Login */}
          {mode === 'participant' && (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white font-display">Acesso do Participante</h2>
                <p className="text-slate-400 text-xs mt-1 font-light">
                  Insira o e-mail ou telefone cadastrado na reserva.
                </p>
              </div>

              <form onSubmit={handleParticipantLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="seu-email@dominio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-700 focus:outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    Ou Telefone celular
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-700 focus:outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                {partError && (
                  <p className="text-red-400 text-xs mt-2 text-center bg-red-950/25 p-3 rounded-xl border border-red-900/30">
                    {partError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-2xl cursor-pointer transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Entrar</span>
                      <LogIn className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Fill Box (Aesthetic demo helper) */}
              <div className="mt-8 border-t border-slate-800/60 pt-6">
                <span className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preenchimento Rápido para Teste</span>
                </span>
                
                <div className="space-y-2">
                  {sampleParticipants.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleQuickAutofill(p)}
                      className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 text-xs text-slate-300 flex justify-between items-center transition-all cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-white">{p.name}</p>
                        <p className="text-slate-500 mt-0.5">{p.email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                        Autofill
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-6 text-center text-xs text-slate-500">
                Ainda não tem ingresso reservado?{' '}
                <button
                  onClick={() => onNavigate('cadastro')}
                  className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  Cadastre-se agora
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Reception Login */}
          {mode === 'reception' && (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white font-display">Acesso Credenciamento</h2>
                <p className="text-slate-400 text-xs mt-1 font-light">
                  Módulo exclusivo para equipe de recepção e check-in.
                </p>
              </div>

              <form onSubmit={handleReceptionLogin} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    Usuário
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Digite o usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-700 focus:outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="Digite a senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-700 focus:outline-hidden text-sm transition-all"
                    />
                  </div>
                </div>

                {receptionError && (
                  <p className="text-red-400 text-xs mt-2 text-center bg-red-950/25 p-3 rounded-xl border border-red-900/30">
                    {receptionError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-2xl cursor-pointer transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Entrar no Painel</span>
                      <LogIn className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Helper for reception credentials */}
              <div className="mt-8 border-t border-slate-800/60 pt-6">
                <button
                  type="button"
                  onClick={autofillStaff}
                  className="w-full py-3 px-4 border border-slate-800 border-dashed hover:border-slate-700 bg-slate-950/40 rounded-2xl text-xs text-slate-300 flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Autocompletar Staff</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                    User: recepcao / Pass: 1234
                  </span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
