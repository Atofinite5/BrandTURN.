import React from 'react';
import { SlideLayout, SlideContent } from '../SlideLayout';

export const PromiseSlide: React.FC = () => {
  return (
    <SlideLayout className="flex items-center justify-center text-center">
      <SlideContent>
        <div className="text-3xl md:text-6xl font-display font-light leading-tight">
          We blend <span className="text-[var(--color-primary)] font-bold">creativity</span>, 
          <span className="text-[var(--color-primary)] font-bold"> speed</span>, <br className="hidden md:block"/> and 
          <span className="text-[var(--color-primary)] font-bold"> data</span> to scale <br className="hidden md:block"/>
          brands with confidence.
        </div>
      </SlideContent>
    </SlideLayout>
  );
};
