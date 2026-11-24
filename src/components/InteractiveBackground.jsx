import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveBackground({ theme = 'light' }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [targetPos, setTargetPos] = useState({ x: -1000, y: -1000 });
  const isLight = theme === 'light';

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp follow for interactive cursor spotlight
  useEffect(() => {
    let animId;
    const lerp = () => {
      setMousePos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500 ${isLight ? 'bg-[#f8fafc]' : 'bg-black'}`}>
      
      {/* 1. Base Vignette */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isLight 
          ? 'bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#eef2f6]' 
          : 'bg-gradient-to-b from-[#020617] via-black to-[#010411]'
      }`} />

      {/* 2. Dynamic Interactive Mouse Spotlight */}
      {mousePos.x > -500 && (
        <div
          className={`absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-300 ${isLight ? 'opacity-20' : 'opacity-30'}`}
          style={{
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
            background: isLight 
              ? 'radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 102, 255, 0.45) 0%, rgba(56, 189, 248, 0.15) 40%, transparent 70%)',
          }}
        />
      )}

      {/* 3. Ambient Sapphire & Cyan Focal Blooms */}
      <div className={`absolute top-[8%] right-[10%] w-[550px] h-[550px] blur-[160px] rounded-full transition-opacity duration-500 ${isLight ? 'bg-[#0055ff]/8' : 'bg-[#0055ff]/15'}`} />
      <div className={`absolute top-[35%] left-[5%] w-[450px] h-[450px] blur-[150px] rounded-full transition-opacity duration-500 ${isLight ? 'bg-[#0038a8]/6' : 'bg-[#0038a8]/12'}`} />
      <div className={`absolute top-[65%] right-[5%] w-[500px] h-[500px] blur-[170px] rounded-full transition-opacity duration-500 ${isLight ? 'bg-[#0088ff]/6' : 'bg-[#0088ff]/12'}`} />
      <div className={`absolute bottom-[5%] left-[20%] w-[600px] h-[400px] blur-[180px] rounded-full transition-opacity duration-500 ${isLight ? 'bg-[#0052cc]/5' : 'bg-[#0052cc]/10'}`} />

      {/* 4. Subtle Ambient Floating Particle Glints / Stardust */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isLight ? 'opacity-30' : 'opacity-40'}`}>
        {[
          { top: '12%', left: '18%', delay: 0, dur: 4 },
          { top: '22%', left: '78%', delay: 1, dur: 5 },
          { top: '38%', left: '42%', delay: 2, dur: 4.5 },
          { top: '55%', left: '14%', delay: 1.5, dur: 6 },
          { top: '68%', left: '88%', delay: 0.5, dur: 5.2 },
          { top: '82%', left: '32%', delay: 2.2, dur: 4.8 },
          { top: '92%', left: '72%', delay: 1.8, dur: 5.5 },
        ].map((pt, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: [0.15, 0.8, 0.15],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: pt.dur,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut',
            }}
            className={`absolute w-1 h-1 rounded-full ${isLight ? 'bg-blue-500 shadow-[0_0_8px_#38bdf8]' : 'bg-cyan-300 shadow-[0_0_8px_#38bdf8]'}`}
            style={{ top: pt.top, left: pt.left }}
          />
        ))}
      </div>

      {/* 5. Fine Mesh Noise Overlay for high-end texture */}
      <div 
        className={`absolute inset-0 mix-blend-overlay ${isLight ? 'opacity-[0.035]' : 'opacity-[0.025]'}`}
        style={{
          backgroundImage: isLight 
            ? `radial-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 0)` 
            : `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
