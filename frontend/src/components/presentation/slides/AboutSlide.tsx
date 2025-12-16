import React from 'react';
import { SlideLayout, SlideSubtitle, SlideTitle } from '../SlideLayout';

export const AboutSlide: React.FC = () => {
  return (
    <SlideLayout>
      <SlideTitle>About BrandTURN</SlideTitle>
      <SlideSubtitle>
        We craft data-driven, high-impact brand experiences that scale.
      </SlideSubtitle>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{h:'150+',p:'Projects'}, {h:'80+',p:'Clients'}, {h:'12',p:'Awards'}].map((s,i)=> (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-4xl font-bold">{s.h}</div>
            <div className="text-white/70 mt-1 tracking-wide uppercase text-xs">{s.p}</div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};
