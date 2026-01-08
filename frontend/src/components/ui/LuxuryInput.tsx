import React, { useState } from 'react';
import "../../styles/login.css"; // Import the CSS file for styling

interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const LuxuryInput: React.FC<LuxuryInputProps> = ({ label, icon, className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative group w-full mt-3 ${className || ''}`}>
      {/* Icon */}
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 pointer-events-none z-20 ${isFocused ? 'text-[#D4AF37]' : 'text-white/30 group-hover:text-white/50'}`}>
        {icon}
      </div>

      {/* Input Field */}
      <input
        {...props}
        className={`w-full bg-[#141414] border ${isFocused 
            ? 'border-[#D4AF37]/50 shadow-[0_0_15px_-5px_rgba(212,175,55,0.2)]' 
            : 'border-[#333] hover:border-[#444]'
        } h-12 rounded-xl pl-12 pr-4 text-white placeholder-white/30 focus:outline-none transition-all duration-200 font-light tracking-wide text-sm relative z-10`}
        placeholder={props.placeholder || label}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
    </div>
  );
};