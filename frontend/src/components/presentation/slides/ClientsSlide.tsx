import React from 'react';
import { SlideLayout, SlideTitle, SlideSubtitle, SlideContent } from '../SlideLayout';

const clients = [
  { name: 'Manyavar', logo: 'https://www.google.com/s2/favicons?domain=manyavar.com&sz=128', url: 'https://www.manyavar.com' },
  { name: 'Apollo Pharmacy', logo: 'https://www.google.com/s2/favicons?domain=apollopharmacy.in&sz=128', url: 'https://www.apollopharmacy.in' },
  { name: 'Dabur', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png', url: 'https://www.dabur.com' },
  { name: 'Colorbar', logo: '/assets/logos/colorbar.png', url: 'https://www.colorbarcosmetics.com' },
  { name: 'Policybazaar', logo: 'https://www.google.com/s2/favicons?domain=policybazaar.com&sz=128', url: 'https://www.policybazaar.com' },
  { name: 'Emami', logo: 'https://www.google.com/s2/favicons?domain=emamiltd.in&sz=128', url: 'https://www.emamiltd.in' },
  { name: 'Snapdeal', logo: 'https://www.google.com/s2/favicons?domain=snapdeal.com&sz=128', url: 'https://www.snapdeal.com' },
  { name: 'HDFC Bank', logo: 'https://www.google.com/s2/favicons?domain=hdfcbank.com&sz=128', url: 'https://www.hdfcbank.com' },
  { name: 'Plum', logo: 'https://www.google.com/s2/favicons?domain=plumgoodness.com&sz=128', url: 'https://plumgoodness.com' },
  { name: 'Ajanta', logo: 'https://www.google.com/s2/favicons?domain=ajantapharma.com&sz=128', url: 'https://www.ajantapharma.com' },
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
            className="aspect-[3/1] bg-white border border-white/20 flex items-center justify-center rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 group relative overflow-hidden shadow-sm"
          >
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-w-[80%] max-h-[80%] object-contain transition-all duration-300 transform group-hover:scale-110"
            />
          </a>
        ))}
      </SlideContent>
    </SlideLayout>
  );
};
