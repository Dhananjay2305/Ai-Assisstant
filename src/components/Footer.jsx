import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    { name: 'Privacy', href: '#privacy' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
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
    <footer className="bg-black relative text-neutral-400 text-xs overflow-hidden">
      
      {/* Bottom CTA Section: "Meet your new personal assistant." (Matches Reference Screenshot) */}
      <div className="py-24 border-t border-white/[0.06] relative text-center">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[200px] bg-blue-600/[0.1] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Meet your new personal assistant.
          </h2>
          <p className="mt-3 text-sm text-neutral-400 font-normal">
            Experience a smarter way to interact with your phone.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#demo"
              onClick={(e) => handleLinkClick(e, '#demo')}
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2 group"
            >
              <span>Explore SARA AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Row */}
      <div className="border-t border-white/[0.06] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8">
            
            {/* Logo & Tagline */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-[#0066ff] to-cyan-400 p-[1.5px] shadow-[0_4px_16px_rgba(0,102,255,0.35)] flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                    <span className="font-sans font-black text-sm text-white keep-white tracking-tight">S</span>
                    <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                  </div>
                </div>
                <span className="font-sans text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  SARA 
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-blue-600/10 dark:bg-blue-500/20 text-[#0066ff] dark:text-[#38bdf8] border border-blue-500/30">
                    AI
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-500 font-normal">
                Your Phone. Your Voice. Your Personal AI.
              </p>
            </div>

            {/* Navigation Links & Socials */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <nav className="flex flex-wrap items-center gap-5 sm:gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs font-normal text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Social Icons */}
              <div className="flex items-center gap-4 text-neutral-400">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* X / Twitter icon */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                  aria-label="X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Copyright & Back to Top */}
          <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
            <div>
              © 2026 SARA AI. All rights reserved.
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
