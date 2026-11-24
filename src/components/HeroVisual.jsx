import React from 'react';
import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      
      {/* 1. Deep Core Sapphire Lighting Bloom */}
      <div className="absolute top-[20%] right-[5%] w-[650px] h-[450px] bg-gradient-to-tr from-[#003db3]/35 via-[#0066ff]/25 to-transparent blur-[120px] rounded-full" />
      <div className="absolute bottom-[5%] right-[15%] w-[450px] h-[250px] bg-cyan-400/20 blur-[90px] rounded-full" />

      {/* 2. Fluid 3D Glossy Sapphire & Cyan Silk Ribbons */}
      <svg
        className="w-full h-full object-cover absolute top-0 left-0"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Deep Navy/Sapphire Base Ribbon Gradient */}
          <linearGradient id="silkDeepRibbon" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#010724" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#00247a" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#0055ff" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#001a5e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Liquid Silk Primary Ribbon Gradient with Electric Sapphire to Cyan */}
          <linearGradient id="silkPrimary" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#001038" stopOpacity="0.3" />
            <stop offset="20%" stopColor="#004ae6" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#0088ff" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#00227a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#02091f" stopOpacity="0.1" />
          </linearGradient>

          {/* Glowing Cyan Ribbon Accent */}
          <linearGradient id="silkCyanRibbon" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#001844" stopOpacity="0" />
            <stop offset="30%" stopColor="#00f0ff" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#0066ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000824" stopOpacity="0" />
          </linearGradient>

          {/* Razor Specular Ridge Glint */}
          <linearGradient id="silkSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* 3D Depth Shadow */}
          <filter id="silkShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="25" stdDeviation="30" floodColor="#000d29" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Ribbon Layer 1: Background Deep Flowing Wave (sweeping behind the phone) */}
        <motion.path
          filter="url(#silkShadow)"
          d="M 550 900 C 700 700, 850 780, 1050 580 C 1250 380, 1380 420, 1460 300 L 1460 900 Z"
          animate={{
            d: [
              "M 550 900 C 700 700, 850 780, 1050 580 C 1250 380, 1380 420, 1460 300 L 1460 900 Z",
              "M 550 900 C 680 720, 870 750, 1070 560 C 1230 400, 1360 440, 1460 310 L 1460 900 Z",
              "M 550 900 C 700 700, 850 780, 1050 580 C 1250 380, 1380 420, 1460 300 L 1460 900 Z"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#silkDeepRibbon)"
          opacity="0.85"
        />

        {/* Ribbon Layer 2: Main Curving Sapphire Silk Ribbon sweeping across from left to right */}
        <motion.path
          filter="url(#silkShadow)"
          d="M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480 L 1490 900 L -50 900 Z"
          animate={{
            d: [
              "M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480 L 1490 900 L -50 900 Z",
              "M -50 740 C 370 640, 650 800, 960 630 C 1240 470, 1360 560, 1490 490 L 1490 900 L -50 900 Z",
              "M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480 L 1490 900 L -50 900 Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#silkPrimary)"
          opacity="0.9"
        />

        {/* Ribbon Layer 3: Dynamic Cyan Swirl Wrapping Behind & Beneath the 3D Phone */}
        <motion.path
          d="M 250 850 C 580 690, 820 780, 1100 540 C 1320 340, 1420 520, 1490 420 L 1490 900 L 250 900 Z"
          animate={{
            d: [
              "M 250 850 C 580 690, 820 780, 1100 540 C 1320 340, 1420 520, 1490 420 L 1490 900 L 250 900 Z",
              "M 250 860 C 560 710, 840 760, 1080 550 C 1300 360, 1440 500, 1490 430 L 1490 900 L 250 900 Z",
              "M 250 850 C 580 690, 820 780, 1100 540 C 1320 340, 1420 520, 1490 420 L 1490 900 L 250 900 Z"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#silkCyanRibbon)"
          opacity="0.8"
        />

        {/* Ribbon Layer 4: Razor-Sharp Glossy Specular Crest Highlight Line */}
        <motion.path
          d="M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480"
          animate={{
            d: [
              "M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480",
              "M -50 740 C 370 640, 650 800, 960 630 C 1240 470, 1360 560, 1490 490",
              "M -50 750 C 350 620, 680 820, 980 620 C 1220 460, 1380 580, 1490 480"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          stroke="url(#silkSpecular)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ribbon Layer 5: Inner Glass Refraction Highlight Line */}
        <motion.path
          d="M 300 810 C 620 680, 860 740, 1120 530 C 1310 370, 1410 490, 1490 430"
          animate={{
            d: [
              "M 300 810 C 620 680, 860 740, 1120 530 C 1310 370, 1410 490, 1490 430",
              "M 300 820 C 600 700, 880 720, 1100 540 C 1330 380, 1390 480, 1490 440",
              "M 300 810 C 620 680, 860 740, 1120 530 C 1310 370, 1410 490, 1490 430"
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom seamless black gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
