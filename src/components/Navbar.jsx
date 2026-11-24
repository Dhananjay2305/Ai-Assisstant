import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles, Mic, PhoneCall, Database, Workflow, Bell, Languages, Camera, ShieldAlert, Clock, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeSection, theme = 'light', onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFeaturesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features', hasDropdown: true },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Technology', href: '#tech' },
    { name: 'About', href: '#about' },
  ];

  const secondaryFeatures = [
    { name: 'Voice Control', href: '#demo', icon: Mic },
    { name: 'Calling & Messaging', href: '#communication', icon: PhoneCall },
    { name: 'Personal AI Memory', href: '#memory', icon: Database },
    { name: 'Smart Routines', href: '#routines', icon: Workflow },
    { name: 'Notification Intelligence', href: '#notifications', icon: Bell },
    { name: 'Multilingual Voice', href: '#multilingual', icon: Languages },
    { name: 'Visual AI', href: '#visual-ai', icon: Camera },
    { name: 'Emergency Assistant', href: '#emergency', icon: ShieldAlert },
    { name: 'Action Memory', href: '#action-memory', icon: Clock },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setFeaturesDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.08]' 
        : 'bg-transparent border-b border-white/[0.05]'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: SARA AI Logo & Brand Name */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-[#0066ff] to-cyan-400 p-[1.5px] shadow-[0_4px_16px_rgba(0,102,255,0.35)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="font-sans font-black text-sm text-white keep-white tracking-tight">S</span>
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
            </div>
          </div>
          <span className="font-sans text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            SARA 
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-blue-600/10 dark:bg-blue-500/20 text-[#0066ff] dark:text-[#38bdf8] border border-blue-500/30">
              AI
            </span>
          </span>
        </a>

        {/* Center: Minimal Navigation with Features Dropdown */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.name} 
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setFeaturesDropdownOpen(true)}
                  onMouseLeave={() => setFeaturesDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center gap-1 text-xs font-normal text-neutral-300 hover:text-white transition-colors py-2"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${featuresDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {featuresDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 p-2 rounded-2xl bg-[#09090b] border border-white/[0.1] shadow-2xl backdrop-blur-xl z-50">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1.5 border-b border-white/[0.05]">
                        All Capabilities
                      </div>
                      <div className="py-1">
                        {secondaryFeatures.map((feat) => {
                          const Icon = feat.icon;
                          return (
                            <a
                              key={feat.name}
                              href={feat.href}
                              onClick={(e) => handleLinkClick(e, feat.href)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span>{feat.name}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-normal text-neutral-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Theme Toggle + Small Green Status Indicator + "AI Assistant" + Blue "Get Started" Button */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-full border border-slate-300/80 dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span>AI Assistant</span>
          </div>

          <a
            href="#demo"
            onClick={(e) => handleLinkClick(e, '#demo')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-[0_0_15px_rgba(0,102,255,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-full border border-slate-300/80 dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
          <a
            href="#demo"
            onClick={(e) => handleLinkClick(e, '#demo')}
            className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[#0066ff]"
          >
            Get Started
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090b]/95 border-b border-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-neutral-300 hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="text-[10px] font-mono uppercase text-neutral-400 mb-2">Features</div>
              <div className="grid grid-cols-2 gap-2">
                {secondaryFeatures.slice(0, 6).map((feat) => (
                  <a
                    key={feat.name}
                    href={feat.href}
                    onClick={(e) => handleLinkClick(e, feat.href)}
                    className="text-xs text-neutral-400 hover:text-white py-0.5"
                  >
                    {feat.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>AI Assistant Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}