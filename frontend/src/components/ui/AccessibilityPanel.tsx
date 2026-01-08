import React, { useEffect, useState } from 'react';
import { Type, Monitor, Sun, Moon, RotateCcw, X, Eye } from 'lucide-react';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const [fontSize, setFontSize] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Apply changes
  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${fontSize}%`;
    
    if (isGrayscale) {
      html.style.filter = 'grayscale(100%)';
    } else {
      html.style.filter = 'none';
    }

    if (isHighContrast) {
      html.classList.add('high-contrast');
      // Adding a style tag for high contrast overrides if not using a class-based approach in CSS
      html.style.backgroundColor = '#000';
      html.style.color = '#fff';
    } else {
      html.classList.remove('high-contrast');
      html.style.backgroundColor = '';
      html.style.color = '';
    }
  }, [fontSize, isGrayscale, isHighContrast]);

  const resetAll = () => {
    setFontSize(100);
    setIsGrayscale(false);
    setIsHighContrast(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 w-72 bg-[#0A192F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Eye size={18} className="text-primary" />
          Accessibility
        </h3>
        <button 
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Font Size Control */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-white/50 font-medium ml-1">Text Size</span>
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => setFontSize(prev => Math.max(80, prev - 5))}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-all"
              aria-label="Decrease font size"
            >
              <span className="text-xs font-bold">A-</span>
            </button>
            <span className="text-white font-medium text-sm">{fontSize}%</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(150, prev + 5))}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-all"
              aria-label="Increase font size"
            >
              <span className="text-lg font-bold">A+</span>
            </button>
          </div>
        </div>

        {/* Display Modes */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsGrayscale(!isGrayscale)}
            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              isGrayscale 
                ? 'bg-primary/20 border-primary text-white' 
                : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Monitor size={20} />
            <span className="text-xs font-medium">Grayscale</span>
          </button>

          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              isHighContrast 
                ? 'bg-primary/20 border-primary text-white' 
                : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sun size={20} />
            <span className="text-xs font-medium">Contrast</span>
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetAll}
          className="w-full mt-4 flex items-center justify-center gap-2 p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all text-sm group"
        >
          <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
          Reset Settings
        </button>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
