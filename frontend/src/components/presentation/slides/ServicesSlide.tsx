import React from 'react';
import { SlideLayout, SlideSubtitle, SlideTitle } from '../SlideLayout';

export const ServicesSlide: React.FC = () => {
  return (
    <SlideLayout>
      <SlideTitle>What We Do</SlideTitle>
      <SlideSubtitle>Strategy, Creative, Media, and Growth Engineering.</SlideSubtitle>
      <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
        {['Brand Strategy','Content & Social','Performance Media','Web & Commerce','Video & Production','Analytics & Data'].map((item)=> (
          <li key={item} className="p-4 rounded-xl border border-white/10 bg-white/5">{item}</li>
        ))}
      </ul>
    </SlideLayout>
  );
};
