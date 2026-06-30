/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, RefreshCw, Music, CheckCircle2, Volume2, ShieldAlert } from 'lucide-react';
import { Participant } from '../types';

interface SorteioProps {
  participants: Participant[];
}

export default function Sorteio({ participants }: SorteioProps) {
  const [shuffling, setShuffling] = useState(false);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [tempName, setTempName] = useState('Clique para Sorteio');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; scale: number }>>([]);

  const triggerConfetti = () => {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];
    const newParticles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // relative to center
      y: Math.random() * -100 - 10, // shoot upwards
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.8 + 0.4
    }));
    setParticles(newParticles);
  };

  const handleStartRaffle = () => {
    if (participants.length === 0) return;
    
    setShuffling(true);
    setWinner(null);
    setParticles([]);

    // Filter by present if any exist, to make it realistic!
    const presentList = participants.filter((p) => p.status === 'Presente');
    const drawingPool = presentList.length > 0 ? presentList : participants;

    let iterations = 0;
    const maxIterations = 30;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * drawingPool.length);
      setTempName(drawingPool[randomIndex].name);
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        
        // Final draw
        const finalWinnerIndex = Math.floor(Math.random() * drawingPool.length);
        const drawnWinner = drawingPool[finalWinnerIndex];
        
        setWinner(drawnWinner);
        setTempName(drawnWinner.name);
        setShuffling(false);
        triggerConfetti();
      }
    }, 100);
  };

  const resetRaffle = () => {
    setWinner(null);
    setTempName('Clique para Sorteio');
    setParticles([]);
  };

  // Helper to hide part of phone for security demo feel
  const maskPhone = (phone: string) => {
    return phone.slice(0, 9) + '****';
  };

  return (
    <div className="bg-slate-950 text-white p-4 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] sm:min-h-[500px]">
      
      {/* Immersive glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-indigo-500/10 blur-[60px] pointer-events-none" />

      {/* Confetti canvas visual rendering using pure elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: '50%', y: '80%', scale: 0, opacity: 1 }}
            animate={{ 
              x: `calc(50% + ${p.x}vw)`, 
              y: `calc(80% + ${p.y}vh)`, 
              scale: p.scale,
              opacity: [1, 1, 0.8, 0],
              rotate: Math.random() * 720
            }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute w-3 h-3 rounded-sm"
            style={{ 
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg text-center flex flex-col items-center">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sorteador Eletrônico Oficial</span>
        </span>

        {/* Music Sound Mixer styling container */}
        <div className="w-full max-w-[340px] sm:max-w-[400px] bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-inner relative mb-10">
          
          {/* Top visualizer bar */}
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-slate-500" />
              <span className="text-[9px] text-slate-500 font-mono">STATUS: {shuffling ? 'EMBARALHANDO...' : winner ? 'SORTEADO' : 'PRONTO'}</span>
            </div>
            
            <div className="flex space-x-1">
              <div className={`w-2 h-2 rounded-full ${shuffling ? 'bg-amber-400 animate-ping' : winner ? 'bg-emerald-400' : 'bg-slate-700'}`} />
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
          </div>

          {/* Shuffling Screen display */}
          <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-6 min-h-[140px] flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {shuffling ? (
                <motion.div 
                  key="shuffling"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 w-full"
                >
                  <p className="text-xl font-bold font-display text-emerald-400 tracking-tight truncate">
                    {tempName}
                  </p>
                  
                  {/* Pseudo signal frequencies */}
                  <div className="flex justify-center items-center space-x-1 h-6">
                    {[3, 8, 5, 9, 4, 7, 2, 8, 5].map((val, idx) => (
                      <div 
                        key={idx} 
                        className="w-1 bg-emerald-500 rounded-full animate-pulse" 
                        style={{ 
                          height: `${val * 10}%`,
                          animationDuration: `${0.3 + idx * 0.1}s`
                        }} 
                      />
                    ))}
                  </div>
                </motion.div>
              ) : winner ? (
                <motion.div
                  key="winner"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-3 text-center w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-black text-white font-display tracking-tight leading-tight">
                      {winner.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      {winner.city}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono tracking-widest mt-1 uppercase font-bold">
                      {maskPhone(winner.phone)}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="text-center"
                >
                  <Music className="w-8 h-8 text-slate-700 mx-auto mb-2.5" />
                  <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">
                    {tempName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action trigger button */}
          <div className="mt-8">
            {!winner ? (
              <button
                onClick={handleStartRaffle}
                disabled={shuffling || participants.length === 0}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 cursor-pointer active:scale-98 transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 text-slate-950 ${shuffling ? 'animate-spin' : ''}`} />
                <span>{shuffling ? 'SORTEANDO...' : 'REALIZAR SORTEIO'}</span>
              </button>
            ) : (
              <button
                onClick={resetRaffle}
                className="w-full py-4 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold rounded-2xl cursor-pointer transition-all active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Realizar Novo Sorteio</span>
              </button>
            )}
          </div>

        </div>

        {/* Warning panel about participants subset */}
        <div className="flex items-center space-x-2 text-slate-500 text-xs bg-slate-900/40 px-4 py-3 rounded-2xl border border-slate-800 max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <p className="text-left leading-relaxed font-light">
            O sorteador prioriza automaticamente participantes marcados como <strong>"Presente"</strong> no credenciamento. (Total elegível: {participants.filter(p=>p.status === 'Presente').length > 0 ? `${participants.filter(p=>p.status === 'Presente').length} presentes` : `${participants.length} inscritos`}).
          </p>
        </div>
      </div>
    </div>
  );
}
