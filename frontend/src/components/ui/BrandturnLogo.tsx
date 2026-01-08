import React from 'react';

const BrandturnLogo = ({ className = "w-20 h-20" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="-5 -5 115 115" className="w-full h-full overflow-visible" aria-label="Brandturn Logo">
        <defs>
          <filter id="sticker-glow-component" x="-50%" y="-50%" width="200%" height="200%">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="4" />
            <feFlood floodColor="white" result="WHITE" />
            <feComposite in="WHITE" in2="DILATED" operator="in" result="OUTLINE" />
            <feMerge>
              <feMergeNode in="OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g filter="url(#sticker-glow-component)">
          {/* Yellow B shape - Precise Geometry */}
          <path 
            d="M 10 5 Q 5 5 5 10 L 5 90 Q 5 95 10 95 L 45 95 C 75 95 85 80 85 70 C 85 60 70 50 55 50 C 70 50 85 40 85 25 C 85 10 70 5 45 5 Z"
            fill="#FFE500"
          />
          
          {/* Black Holes (Eyes) */}
          <circle cx="38" cy="28" r="9" fill="black" />
          <circle cx="38" cy="72" r="11" fill="black" />

          {/* Black Serif 't' */}
          <path 
            d="M 72 48 L 72 56 L 66 56 L 66 62 L 72 62 L 72 82 Q 72 94 84 92 L 88 91 L 88 84 L 84 85 Q 78 85 78 78 L 78 62 L 90 62 L 90 56 L 78 56 L 78 48 Z"
            fill="black"
          />
          
          {/* Black Dot */}
          <circle cx="98" cy="88" r="6" fill="black" />
        </g>
      </svg>
    </div>
  );
};

export default BrandturnLogo;
