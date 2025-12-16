import React from 'react';
import { SlideLayout, SlideTitle, SlideSubtitle, SlideContent } from '../SlideLayout';

const clients = [
  { name: 'Aura Bloom', logo: '/assets/logos/AuraBloomCosmetics.png', url: 'https://aurabloom999.com' },
  { name: 'Cloud Nova', logo: '/assets/logos/CloudNovaSystems.png', url: 'https://www.google.com/search?q=Cloud+Nova+Systems' },
  { name: 'Frame Fox', logo: '/assets/logos/FrameFoxProductions.png', url: 'https://www.google.com/search?q=Frame+Fox+Productions' },
  { name: 'Green Globe', logo: '/assets/logos/GreenGlobeFoundation.png', url: 'https://greenglobe.com' },
  { name: 'Hindrise', logo: '/assets/logos/HindriseCorp.png', url: 'https://hindrise.org' },
  { name: 'Lambda Sphere', logo: '/assets/logos/LambdaSphereAI.png', url: 'https://www.google.com/search?q=Lambda+Sphere+AI' },
  { name: 'Luxora', logo: '/assets/logos/LuxoraFashionHouse.png', url: 'https://www.google.com/search?q=Luxora+Fashion+House' },
  { name: 'Metro Bank', logo: '/assets/logos/MetroBankIndia.png', url: 'https://www.google.com/search?q=Metro+Bank+India' },
];

export const ClientsSlide: React.FC = () => {
  return (
    <SlideLayout className="text-center">
      <SlideTitle>TRUSTED BY LEADING BRANDS</SlideTitle>
      <SlideSubtitle>From Startups to Industry Leaders</SlideSubtitle>
      
      <SlideContent className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 px-4 md:px-8">
        {clients.map((client, i) => (
          <a 
            key={i} 
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-[3/1] bg-white/5 border border-white/10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:scale-105 group relative overflow-hidden"
          >
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-w-[70%] max-h-[60%] object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
            />
          </a>
        ))}
      </SlideContent>
    </SlideLayout>
  );
};
