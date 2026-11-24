import React from 'react';
import { motion } from 'framer-motion';

export default function AiOrb({ state = 'idle', size = 'lg', className = '', onClick }) {
  // Sizes mapping
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-56 h-56 sm:w-64 sm:h-64',
    xl: 'w-72 h-72 sm:w-80 sm:h-80',
  };

  const currentSize = sizeClasses[size] || sizeClasses.lg;

  // Visual characteristics depending on state
  const stateGlows = {
    idle: 'from-cyan-500/25 via-indigo-600/25 to-purple-600/25 shadow-[0_0_50px_rgba(56,189,248,0.25)]',
    listening: 'from-cyan-400/50 via-sky-500/50 to-blue-600/50 shadow-[0_0_80px_rgba(6,182,212,0.6)]',
    thinking: 'from-purple-500/50 via-indigo-500/50 to-pink-500/50 shadow-[0_0_80px_rgba(168,85,247,0.6)]',
    speaking: 'from-blue-500/50 via-cyan-400/50 to-violet-500/50 shadow-[0_0_80px_rgba(56,189,248,0.6)]',
    completed: 'from-emerald-400/50 via-teal-500/50 to-cyan-500/50 shadow-[0_0_80px_rgba(16,185,129,0.5)]',
  };

  const orbColor = stateGlows[state] || stateGlows.idle;

  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer select-none ${currentSize} ${className}`}
    >
      {/* Outer Pulse Wave for Listening / Speaking */}
      {(state === 'listening' || state === 'speaking') && (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [1, 1.25, 1.5], opacity: [0.7, 0.3, 0] }}
            transition={{ duration: 1.6, delay: 0.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-indigo-500/30 blur-lg pointer-events-none"
          />
        </>
      )}

      {/* Orbiting Ring 1 */}
      <motion.div
        animate={{ 
          rotate: state === 'thinking' ? 360 : [0, 360],
          scale: state === 'listening' ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          rotate: { duration: state === 'thinking' ? 4 : 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute inset-[-8%] rounded-full border border-cyan-400/30 border-dashed pointer-events-none"
      />

      {/* Orbiting Ring 2 (Counter-clockwise tilt) */}
      <motion.div
        animate={{ 
          rotate: state === 'thinking' ? -360 : [0, -360],
        }}
        transition={{ 
          rotate: { duration: state === 'thinking' ? 6 : 25, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute inset-[-18%] rounded-full border border-purple-500/20 pointer-events-none"
        style={{ transform: 'rotateX(60deg)' }}
      >
        <span className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
      </motion.div>

      {/* Main Glowing Orb */}
      <motion.div
        animate={{
          scale: state === 'listening' ? [1, 1.08, 0.98, 1.05, 1] :
                 state === 'speaking' ? [1, 1.06, 0.96, 1.04, 1] :
                 state === 'thinking' ? [0.96, 1.04, 0.96] :
                 [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: state === 'listening' ? 1.4 :
                    state === 'speaking' ? 0.8 :
                    state === 'thinking' ? 1.2 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`w-full h-full rounded-full bg-gradient-to-tr ${orbColor} backdrop-blur-2xl p-1 relative flex items-center justify-center transition-all duration-700`}
      >
        {/* Core Sphere Inner Glow */}
        <div className="w-full h-full rounded-full bg-[#070b1e]/90 relative overflow-hidden flex items-center justify-center border border-white/20">
          
          {/* Animated Internal Liquid Gradient / Plasma */}
          <motion.div
            animate={{
              rotate: state === 'thinking' ? [0, 360] : [0, 180, 360],
              scale: state === 'speaking' ? [1, 1.2, 1] : [1, 1.08, 1],
            }}
            transition={{
              rotate: { duration: state === 'thinking' ? 3 : 12, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute -inset-4 opacity-75 blur-md"
            style={{
              background: state === 'completed'
                ? 'radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(6,182,212,0.6) 40%, transparent 70%)'
                : state === 'thinking'
                ? 'conic-gradient(from 0deg, #a855f7, #38bdf8, #ec4899, #a855f7)'
                : state === 'listening'
                ? 'radial-gradient(circle, rgba(56,189,248,0.9) 0%, rgba(37,99,235,0.7) 50%, transparent 80%)'
                : 'conic-gradient(from 180deg, #0284c7, #8b5cf6, #06b6d4, #0284c7)',
            }}
          />

          {/* Central Bright Energy Core */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {state === 'completed' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold text-lg shadow-[0_0_20px_#34d399]"
              >
                ✓
              </motion.div>
            ) : state === 'listening' || state === 'speaking' ? (
              /* Mini Audio Waveform inside the Core */
              <div className="flex items-center gap-1.5 h-10 px-3">
                {[40, 85, 60, 100, 75, 90, 45].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: state === 'speaking' 
                        ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`]
                        : [`${h * 0.2}%`, `${h * 0.7}%`, `${h * 0.2}%`]
                    }}
                    transition={{
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="w-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                  />
                ))}
              </div>
            ) : state === 'thinking' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent shadow-[0_0_15px_#38bdf8]"
              />
            ) : (
              /* Idle Pulse Dot & Logo Monogram */
              <div className="text-center">
                <span className="font-display font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  SARA
                </span>
                <span className="block text-[9px] tracking-widest text-cyan-300/80 font-mono mt-0.5">
                  AI CORE
                </span>
              </div>
            )}
          </div>

          {/* Glint Highlight Top Left */}
          <div className="absolute top-2 left-3 w-1/3 h-1/4 rounded-full bg-white/20 blur-[2px] transform -rotate-45 pointer-events-none" />
        </div>
      </motion.div>

      {/* State Label Pill */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
          state === 'listening' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse' :
          state === 'thinking' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
          state === 'speaking' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
          state === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
          'bg-slate-800/60 text-slate-400 border-white/10'
        }`}>
          ● {state}
        </span>
      </div>
    </div>
  );
}
