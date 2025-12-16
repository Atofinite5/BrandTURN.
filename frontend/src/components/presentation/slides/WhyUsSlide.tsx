import React from 'react';
import { SlideLayout, SlideTitle, SlideContent } from '../SlideLayout';

export const WhyUsSlide: React.FC = () => {
  const reasons = [
    "ROI-Driven Approach",
    "Verified Trusted Creators",
    "Fast High-Quality Execution",
    "Transparent Reporting",
    "End-to-End Growth Partner"
  ];

  return (
    <SlideLayout>
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="md:w-1/3">
           <SlideTitle className="text-5xl md:text-7xl leading-none">
             WHY <br/> US?
           </SlideTitle>
           <div className="w-16 h-2 bg-[var(--color-primary)] mt-4" />
        </div>

        <div className="md:w-2/3 w-full">
          <SlideContent className="space-y-6">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <span className="text-[var(--color-primary)] font-mono text-xl">0{i + 1}</span>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-[var(--color-primary)]/50 transition-colors" />
                <span className="text-xl md:text-2xl font-light">{reason}</span>
              </div>
            ))}
          </SlideContent>
        </div>
      </div>
    </SlideLayout>
  );
};
