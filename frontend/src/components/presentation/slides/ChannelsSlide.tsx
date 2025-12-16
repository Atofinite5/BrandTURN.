import React from 'react';
import { SlideLayout, SlideContent } from '../SlideLayout';
import { Youtube, Instagram } from 'lucide-react';

export const ChannelsSlide: React.FC = () => {
  return (
    <SlideLayout>
      <div className="flex flex-col md:flex-row h-full gap-8 md:gap-0">
        {/* YouTube Side */}
        <div className="flex-1 flex flex-col justify-center p-8 border-r border-white/10">
          <SlideContent>
            <div className="flex items-center gap-4 mb-6">
              <Youtube size={48} className="text-red-500" />
              <h2 className="text-4xl font-display font-bold">YouTube</h2>
            </div>
            <p className="text-3xl font-light text-white/80 leading-relaxed">
              High-Trust <br/>
              <span className="font-bold text-white">Long-Form Conversions</span>
            </p>
          </SlideContent>
        </div>

        {/* Instagram Side */}
        <div className="flex-1 flex flex-col justify-center p-8 md:pl-16">
          <SlideContent className="delay-200">
             <div className="flex items-center gap-4 mb-6">
              <Instagram size={48} className="text-pink-500" />
              <h2 className="text-4xl font-display font-bold">Instagram</h2>
            </div>
            <p className="text-3xl font-light text-white/80 leading-relaxed">
              Engagement That <br/>
              <span className="font-bold text-white">Builds Recall</span>
            </p>
          </SlideContent>
        </div>
      </div>
    </SlideLayout>
  );
};
