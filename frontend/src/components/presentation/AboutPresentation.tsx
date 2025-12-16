import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSlide } from './slides/HeroSlide';
import { BrandIntroSlide } from './slides/BrandIntroSlide';
import { AboutSlide } from './slides/AboutSlide';
import { ServicesSlide } from './slides/ServicesSlide';
import { ChannelsSlide } from './slides/ChannelsSlide';
import { ShortsSlide } from './slides/ShortsSlide';
import { WhyUsSlide } from './slides/WhyUsSlide';
import { GlobalSlide } from './slides/GlobalSlide';
import { ClientsSlide } from './slides/ClientsSlide';
import { PromiseSlide } from './slides/PromiseSlide';
import { CTASlide } from './slides/CTASlide';

gsap.registerPlugin(ScrollTrigger);

export const AboutPresentation: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => [
    <HeroSlide key="s0" />, 
    <BrandIntroSlide key="s1" />,
    <AboutSlide key="s2" />, 
    <ServicesSlide key="s3" />,
    <ChannelsSlide key="s4" />,
    <ShortsSlide key="s5" />,
    <WhyUsSlide key="s6" />,
    <GlobalSlide key="s7" />,
    <ClientsSlide key="s8" />,
    <PromiseSlide key="s9" />,
    <CTASlide key="s10" />
  ], []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.ap-slide');
      
      // Initial state
      panels.forEach((panel, i) => {
        gsap.set(panel, { 
          autoAlpha: i === 0 ? 1 : 0, 
          y: i === 0 ? 0 : 100,
          scale: i === 0 ? 1 : 0.95,
          position: 'absolute', 
          inset: 0 
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Smooth scrubbing
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      panels.forEach((panel, i) => {
        if (i > 0) {
          // Previous slide exits
          tl.to(panels[i - 1], { 
            autoAlpha: 0, 
            scale: 0.95,
            y: -50, 
            duration: 1, 
            ease: 'power2.inOut' 
          }, `slide-${i}`)
          
          // Current slide enters
          .to(panel, { 
            autoAlpha: 1, 
            scale: 1,
            y: 0, 
            duration: 1, 
            ease: 'power2.inOut' 
          }, `slide-${i}-enter`); // Overlap slightly
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [slides.length]);

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: `${slides.length * 100}vh` }}>
      <div ref={pinRef} className="h-screen w-full overflow-hidden bg-black shadow-2xl">
        {slides.map((slide, idx) => (
          <div key={idx} className="ap-slide w-full h-full flex items-center justify-center p-4 md:p-12">{slide}</div>
        ))}
      </div>
    </div>
  );
};
