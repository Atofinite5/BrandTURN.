import React from 'react';
import { SlideLayout, SlideSubtitle, SlideTitle } from '../SlideLayout';

export const HeroSlide: React.FC = () => {
  return (
    <SlideLayout className="items-center text-center">
      <div className="mb-10">
        <div className="w-48 h-1 bg-[var(--color-primary)] mx-auto mb-10" />
        <SlideTitle>
          WE DON'T <br/> PROMOTE <span className="inline-block bg-[var(--color-primary)] text-black px-8 py-4">BRANDS.</span>
        </SlideTitle>
        <SlideSubtitle>
          We turn them into <span className="text-white font-semibold">Digital Powerhouses</span>.
        </SlideSubtitle>
      </div>
    </SlideLayout>
  );
};
