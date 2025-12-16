import React from 'react';
import { SlideLayout, SlideContent } from '../SlideLayout';
import { Play } from 'lucide-react';

export const ShortsSlide: React.FC = () => {
  return (
    <SlideLayout className="text-center">
      <SlideContent className="flex justify-center mb-12">
        <div className="w-24 h-24 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center animate-pulse">
          <Play size={40} className="fill-[var(--color-primary)] text-[var(--color-primary)] ml-2" />
        </div>
      </SlideContent>
      
      <SlideContent>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
          SHORTS & VIRAL CONTENT
        </h2>
        <div className="h-px w-32 bg-white/20 mx-auto mb-8" />
        <p className="text-2xl md:text-4xl font-light leading-relaxed max-w-4xl mx-auto">
          Short-Form Content That <span className="text-[var(--color-primary)]">Travels Fast.</span> <br/>
          Engineered for <span className="font-bold">Reach, Retention & Recall.</span>
        </p>
      </SlideContent>
    </SlideLayout>
  );
};
