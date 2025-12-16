import React from 'react';
import { SlideLayout, SlideTitle, SlideContent } from '../SlideLayout';
import { Globe } from 'lucide-react';

export const GlobalSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <Globe size={600} strokeWidth={0.5} />
      </div>

      <div className="relative z-10">
        <SlideTitle>GO GLOBAL WITH BRANDTURN</SlideTitle>
        
        <SlideContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12 max-w-4xl">
           {[
             'TikTok Global Campaigns', 
             'YouTube & Instagram Scale', 
             'UGC & Digital Strategy', 
             'Measurable Global Results'
           ].map((item, i) => (
             <div key={i} className="pl-6 border-l-2 border-[var(--color-primary)]/30">
               <h3 className="text-2xl font-medium">{item}</h3>
             </div>
           ))}
        </SlideContent>
      </div>
    </SlideLayout>
  );
};
