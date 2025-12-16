import React from 'react';
import { SlideLayout, SlideContent } from '../SlideLayout';
import { Instagram, Globe, Mail } from 'lucide-react';

export const CTASlide: React.FC = () => {
  return (
    <SlideLayout className="text-center">
      <SlideContent className="flex flex-col items-center justify-center h-full relative z-10">
        {/* Brand Logo */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-500 cursor-default">
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-none select-none">
              Brand<span className="text-[var(--color-primary)]">TURN</span>
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mt-4 opacity-50" />
        </div>
        
        {/* Main Headline */}
        <h2 className="text-2xl md:text-4xl font-light leading-relaxed mb-16 max-w-6xl mx-auto tracking-wide text-white/90">
          TURN YOUR BRAND INTO THE NEXT <br/>
          <span className="font-bold text-[var(--color-primary)] text-4xl md:text-6xl mt-4 block filter drop-shadow-[0_0_15px_rgba(255,216,77,0.3)]">
            DIGITAL POWERHOUSE
          </span>
        </h2>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full max-w-4xl px-4">
          <a href="https://brandturn.co.in" target="_blank" rel="noopener noreferrer" 
             className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 
                        hover:border-[var(--color-primary)]/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,216,77,0.1)]
                        transition-all duration-500 ease-out backdrop-blur-sm">
             <div className="p-5 rounded-full bg-black border border-white/20 
                             group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-6
                             transition-all duration-500 ease-out shadow-lg">
               <Globe size={32} strokeWidth={1.5} />
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium group-hover:text-[var(--color-primary)]/80 transition-colors">Website</span>
                <span className="text-xl font-medium tracking-wide text-white group-hover:text-white transition-colors">brandturn.co.in</span>
             </div>
          </a>

          <a href="#" 
             className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 
                        hover:border-[var(--color-primary)]/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,216,77,0.1)]
                        transition-all duration-500 ease-out backdrop-blur-sm">
             <div className="p-5 rounded-full bg-black border border-white/20 
                             group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:scale-110 group-hover:-rotate-6
                             transition-all duration-500 ease-out shadow-lg">
               <Instagram size={32} strokeWidth={1.5} />
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium group-hover:text-[var(--color-primary)]/80 transition-colors">Social Media</span>
                <span className="text-xl font-medium tracking-wide text-white group-hover:text-white transition-colors">@BrandTurn</span>
             </div>
          </a>

           <a href="mailto:contact@brandturn.co.in" 
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 
                         hover:border-[var(--color-primary)]/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,216,77,0.1)]
                         transition-all duration-500 ease-out backdrop-blur-sm">
             <div className="p-5 rounded-full bg-black border border-white/20 
                             group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-6
                             transition-all duration-500 ease-out shadow-lg">
               <Mail size={32} strokeWidth={1.5} />
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium group-hover:text-[var(--color-primary)]/80 transition-colors">Contact Us</span>
                <span className="text-xl font-medium tracking-wide text-white group-hover:text-white transition-colors">Get In Touch</span>
             </div>
          </a>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 w-full text-center">
          <div className="text-[var(--color-primary)] font-display font-bold text-lg mb-2 tracking-wide opacity-80">THYNK UNLIMITED</div>
          <div className="text-white/30 font-mono text-[10px] tracking-[0.6em] uppercase">
            © 2025 ALL RIGHTS RESERVED
          </div>
        </div>
      </SlideContent>
    </SlideLayout>
  );
};
