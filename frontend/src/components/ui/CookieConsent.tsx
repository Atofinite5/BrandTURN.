import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield, Cpu, ChevronRight } from 'lucide-react';

interface UserContextData {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timeZone: string;
  referrer: string;
  connectionType?: string;
  cookiesEnabled: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const collectUserContext = (): UserContextData => {
    const nav = window.navigator as any;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    return {
      userAgent: nav.userAgent,
      language: nav.language,
      platform: nav.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      connectionType: connection ? connection.effectiveType : 'unknown',
      cookiesEnabled: nav.cookieEnabled
    };
  };

  const handleAccept = async () => {
    setIsAnalyzing(true);
    
    // 1. Save Local Consent
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());

    // 2. Gather Data for "Groq" Analysis
    const userData = collectUserContext();
    console.log('Gathering user context for optimization:', userData);

    // 3. Simulate API Call to Groq Integration
    // In a real scenario, this would POST to /api/analyze-context
    try {
      // Simulating network delay for "AI Analysis"
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('Groq API Analysis Check: Success');
      console.log('Content personalization metrics initialized.');
      
      // Dispatch event for other components to know consent is granted
      window.dispatchEvent(new Event('cookie-consent-granted'));
      
    } catch (error) {
      console.error('Failed to initialize context analysis:', error);
    } finally {
      setIsAnalyzing(false);
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Progress Bar for Analysis (Visual Flair) */}
        {isAnalyzing && (
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full animate-pulse" />
        )}

        <div className="flex flex-col md:flex-row p-6 gap-6 md:gap-8 items-start md:items-center">
          
          {/* Icon Section */}
          <div className="hidden md:flex flex-col items-center justify-center bg-white/5 rounded-xl p-4 border border-white/5 shrink-0">
             <Cookie className="text-primary w-8 h-8 mb-2" />
             <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-150" />
             </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <span className="md:hidden"><Cookie size={20} className="text-primary"/></span>
              Intelligent Experience
            </h3>
            
            <div className="text-sm text-gray-400 leading-relaxed max-w-3xl">
              <p>
                We use advanced cookies and local storage to analyze your device context (Chrome data, device type, usage patterns). 
                This data is processed by our <span className="text-primary font-medium">Groq API integration</span> to tailor content, 
                optimize performance, and deliver a personalized experience just for you.
              </p>
              
              {showDetails && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Shield size={14} className="text-green-400" />
                    <span>Securely analyzes non-sensitive browser signals</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Cpu size={14} className="text-blue-400" />
                    <span>Real-time content adaptation via AI</span>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/60 text-xs hover:text-white flex items-center gap-1 transition-colors group"
            >
              {showDetails ? 'Hide Technical Details' : 'View Technical Details'}
              <ChevronRight size={12} className={`transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleDecline}
              className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all text-sm font-medium"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={isAnalyzing}
              className="relative px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 overflow-hidden group"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <span>Accept & Personalize</span>
                  <Check size={16} className="group-hover:scale-110 transition-transform" />
                </>
              )}
              
              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
