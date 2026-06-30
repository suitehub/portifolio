/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, ArrowLeft, Ticket, CheckCircle } from 'lucide-react';
import { Participant } from '../types';

interface CadastroProps {
  onAddParticipant: (newPart: Omit<Participant, 'id' | 'status' | 'registrationDate'>) => void;
  onNavigate: (view: string, role?: 'public' | 'participant' | 'reception' | 'organizer') => void;
}

export default function Cadastro({ onAddParticipant, onNavigate }: CadastroProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.city) return;

    setLoading(true);
    setTimeout(() => {
      onAddParticipant({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city
      });
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length > 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      } else if (numbers.length > 2) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else if (numbers.length > 0) {
        return `(${numbers}`;
      }
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
      {/* Visual glowing backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px] translate-y-1/2 -translate-x-1/3" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />

      {/* Back button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center space-x-2 text-sm font-medium font-mono cursor-pointer transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Início</span>
      </button>

      {/* Card Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 overflow-hidden">
          
          {/* Top colored accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />

          {!success ? (
            <>
              <div className="mb-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">Inscrição Digital</h2>
                <p className="text-slate-400 text-xs mt-1.5 font-light">
                  Preencha os campos para obter seu passaporte gratuito da convenção.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Gabriel Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-600 focus:outline-hidden text-sm transition-all focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    E-mail de Contato
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Ex: gabriel@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-600 focus:outline-hidden text-sm transition-all focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Telefone celular
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-600 focus:outline-hidden text-sm transition-all focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Cidade / UF
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: São Paulo - SP"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-2xl text-white placeholder-slate-600 focus:outline-hidden text-sm transition-all focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 px-6 py-4 bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-sm rounded-2xl cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-400/10 active:scale-98 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Realizar Cadastro</span>
                      <Ticket className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Login */}
              <div className="mt-6 text-center text-xs text-slate-500">
                Já possui uma reserva cadastrada?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  Acesse sua área de participante
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white font-display">Inscrição Efetuada!</h2>
              <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed">
                Excelente! Sua reserva para a <strong>8ª Convenção de Quartetos</strong> foi gerada em nosso sistema com sucesso.
              </p>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 my-6 text-left space-y-2">
                <div className="text-xs text-slate-500 font-mono flex justify-between">
                  <span>PARTICIPANTE:</span>
                  <span className="text-slate-300 font-semibold">{formData.name}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono flex justify-between">
                  <span>CIDADE:</span>
                  <span className="text-slate-300 font-semibold">{formData.city}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-semibold">RESERVA CONFIRMADA</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('login')}
                className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl cursor-pointer transition-all"
              >
                Prosseguir para o Login
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
