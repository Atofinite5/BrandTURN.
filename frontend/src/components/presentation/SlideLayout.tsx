import React from 'react';
import { motion } from 'framer-motion';

interface SlideLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SlideTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className={`text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight ${className}`}
  >
    {children}
  </motion.h2>
);

export const SlideSubtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.p 
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.5 }}
    className={`text-lg md:text-xl text-white/70 font-light ${className}`}
  >
    {children}
  </motion.p>
);

export const SlideContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);
