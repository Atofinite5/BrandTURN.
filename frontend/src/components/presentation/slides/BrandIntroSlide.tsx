import React from 'react';
import { SlideLayout, SlideTitle, SlideContent } from '../SlideLayout';

export const BrandIntroSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <SlideContent className="text-[var(--color-primary)] font-mono text-sm tracking-widest mb-4">
            WHO WE ARE
          </SlideContent>
          <SlideTitle className="text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            BrandTURN
          </SlideTitle>
          <SlideContent>
            <p className="text-3xl font-light text-white leading-relaxed border-l-4 border-[var(--color-primary)] pl-6">
              Influencer Marketing That <br/>
              <span className="font-bold">Delivers Results.</span>
            </p>
          </SlideContent>
        </div>
        
        <div className="md:w-1/2">
          <SlideContent>
            <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent opacity-50" />
              <div className="text-center z-10">
                <div className="text-6xl font-bold mb-2">2025</div>
                <div className="text-sm tracking-[0.5em] uppercase text-white/50">Thynk Unlimited</div>
              </div>
            </div>
          </SlideContent>
        </div>
      </div>
    </SlideLayout>
  );
};
