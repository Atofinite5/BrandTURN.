import React from 'react';
import { SlideLayout, SlideSubtitle, SlideTitle } from '../SlideLayout';

export const HeroSlide: React.FC = () => {
  return (
    <SlideLayout className="items-center text-center">
      <div className="mb-10">
        <div className="w-24 h-1 bg-[var(--color-primary)]/60 mx-auto mb-10" />
        <SlideTitle>
          WE DON'T <br/> PROMOTE <span className="text-white/20">BRANDS.</span>
        </SlideTitle>
        <SlideSubtitle>
          We turn them into <span className="text-white font-semibold">Digital Powerhouses</span>.
        </SlideSubtitle>
      </div>
    </SlideLayout>
  );
};
