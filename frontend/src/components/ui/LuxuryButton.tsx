import React from 'react';
import "../../styles/login.css"; // Import the CSS file for styling
interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'white-pill';
  fullWidth?: boolean;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true,
  className, 
  ...props 
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const baseClass = `relative group overflow-hidden py-3.5 px-6 rounded-xl transition-all duration-300 font-medium tracking-wide text-sm ${widthClass} ${className}`;

  if (variant === 'white-pill') {
    return (
      <button
        className={`${baseClass} !rounded-full bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl`}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
          {children}
        </span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        className={`${baseClass} border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white`}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }

  if (variant === 'ghost') {
    return (
      <button
        className={`${baseClass} text-white/60 hover:text-[#D4AF37] hover:bg-white/5`}
        {...props}
      >
        <span className="relative z-10">
          {children}
        </span>
      </button>
    );
  }

  // Primary variant (Gold)
  return (
    <button
      className={`${baseClass} 
bg-white text-[#141414]
shadow-[0_6px_14px_rgba(0,0,0,0.16)]
hover:bg-gradient-to-b hover:from-[#D4AF37] hover:to-[#B38F1D]
hover:text-black
hover:shadow-[0_18px_28px_-10px_rgba(212,175,55,0.55)]
hover:-translate-y-0.5`}
      {...props}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 w-full h-full bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
      <span className="absolute -inset-full top-0 block -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-[500%]" />
      
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
        {children}
      </span>
    </button>
  );
};