import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductIntro from './components/ProductIntro';
import BackgroundAssistant from './components/BackgroundAssistant';
import HowItWorks from './components/HowItWorks';
import VoiceAssistantDemo from './components/VoiceAssistantDemo';
import FeaturesSection from './components/FeaturesSection';
import SmartCommunication from './components/SmartCommunication';
import PersonalMemory from './components/PersonalMemory';
import PersonalActionMemory from './components/PersonalActionMemory';
import SmartRoutines from './components/SmartRoutines';
import NotificationIntelligence from './components/NotificationIntelligence';
import ContextAwareness from './components/ContextAwareness';
import MultilingualAssistant from './components/MultilingualAssistant';
import VisualAssistant from './components/VisualAssistant';
import EmergencyAssistant from './components/EmergencyAssistant';
import TechStack from './components/TechStack';
import PrivacySecurity from './components/PrivacySecurity';
import Roadmap from './components/Roadmap';
import AboutSara from './components/AboutSara';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';

export default function App() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [externalCommand, setExternalCommand] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sara_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('sara_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleTriggerCommand = (cmdText) => {
    setExternalCommand(cmdText);
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 
        'product', 
        'background-assistant', 
        'how-it-works', 
        'demo', 
        'features', 
        'communication', 
        'memory', 
        'action-memory', 
        'routines', 
        'notifications', 
        'context', 
        'multilingual', 
        'visual-ai', 
        'emergency', 
        'tech', 
        'privacy', 
        'roadmap', 
        'about'
      ];
      const scrollY = window.pageYOffset;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-[#ededed]' : 'bg-[#f8fafc] text-slate-900'} antialiased overflow-x-hidden selection:bg-[#0066ff] selection:text-white relative`}>
      
      {/* Dynamic Interactive Liquid Glass & Particle Backdrop */}
      <InteractiveBackground theme={theme} />

      {/* Minimal Equinox-Inspired Navbar with Theme Toggle */}
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative z-10">
        {/* 1. Hero Section: Centered Editorial Headline + 3D Liquid Glass Waves */}
        <Hero onSelectCommand={handleTriggerCommand} />

        {/* 2. Product Preview: "One assistant. Endless possibilities." + Realistic Smartphone Mockup */}
        <ProductIntro onTriggerCommand={handleTriggerCommand} />

        {/* 3. New Feature: Background Voice Assistant ("Your assistant, even when the website is closed.") */}
        <BackgroundAssistant />

        {/* 4. Android Assistant Architecture: "From Voice to Real Actions." (6-Step Pipeline & Native OS Capabilities) */}
        <HowItWorks />

        {/* 5. Interactive Website Demo: Live Voice & Text Input, Neural Waveform, History, Safe Simulator */}
        <VoiceAssistantDemo
          externalCommand={externalCommand}
          selectedLang={selectedLang}
          onSelectLang={setSelectedLang}
        />

        {/* 6. Premium Features Section: Equinox minimal cards linking to all capabilities */}
        <FeaturesSection onTriggerCommand={handleTriggerCommand} />

        {/* 7. Dedicated Smart Calling & Messaging with Safety Confirmation Gates */}
        <SmartCommunication onTriggerCommand={handleTriggerCommand} />

        {/* 8. Dedicated Personal AI Memory Section with On-Device Filter */}
        <PersonalMemory onTriggerCommand={handleTriggerCommand} />

        {/* 9. Dedicated Personal Action Memory (Learned Habits & Custom Macro Triggers) */}
        <PersonalActionMemory onTriggerCommand={handleTriggerCommand} />

        {/* 10. Dedicated Smart Routines Section (Study Mode, Morning Briefing, Bedtime) */}
        <SmartRoutines onTriggerCommand={handleTriggerCommand} />

        {/* 11. Dedicated Notification Intelligence Section */}
        <NotificationIntelligence onTriggerCommand={handleTriggerCommand} />

        {/* 12. Dedicated Context-Aware Intelligence Section */}
        <ContextAwareness onTriggerCommand={handleTriggerCommand} />

        {/* 13. Dedicated Multilingual Assistant Section (English, Telugu, Hindi, Marathi) */}
        <MultilingualAssistant
          selectedLang={selectedLang}
          onSelectLang={setSelectedLang}
          onTriggerCommand={handleTriggerCommand}
        />

        {/* 14. Dedicated Visual AI Assistant Section */}
        <VisualAssistant onTriggerCommand={handleTriggerCommand} />

        {/* 15. Dedicated Emergency Assistant Section */}
        <EmergencyAssistant onTriggerCommand={handleTriggerCommand} />

        {/* 16. Technology Section: Kotlin, Android Studio, Jetpack Compose, OpenAI, Assistant APIs */}
        <TechStack />

        {/* 17. Privacy & Security Section: User-Controlled Permissions, Keystore Encryption */}
        <PrivacySecurity />

        {/* 18. Roadmap: Distinguishing Implemented vs Planned Android Capabilities */}
        <Roadmap />

        {/* 19. About SARA AI: Mission & Vision */}
        <AboutSara onTriggerCommand={handleTriggerCommand} />
      </main>

      {/* 20. Minimal Premium Footer */}
      <Footer />

    </div>
  );
}