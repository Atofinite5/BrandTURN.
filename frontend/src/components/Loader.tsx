
import React from 'react';
import { motion, Variants } from 'framer-motion';

const loaderVariants: Variants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const textVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Loader: React.FC = () => {
  const brandName = "BrandTURN".split("");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-color)]"
      variants={loaderVariants}
      initial="initial"
      exit="exit"
    >
      <div className="flex items-center space-x-1">
        {brandName.map((char, index) => (
          <motion.span
            key={index}
            className="text-4xl md:text-6xl font-bold text-[var(--text-color)] uppercase"
            style={{fontFamily: 'Orbitron, sans-serif'}}
            custom={index}
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            {char}
          </motion.span>
        ))}
         <motion.div
            className="w-4 h-4 md:w-6 md:h-6 rounded-full accent-bg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: brandName.length * 0.1, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;