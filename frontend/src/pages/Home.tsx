import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SmoothScroll from '../components/ui/SmoothScroll';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Clients from '../components/sections/Clients';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/sections/Footer';
import AuthModal from '../components/AuthModal';
import Chatbot from '../components/Chatbot';

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    localStorage.setItem('hasSeenAuthModal', 'true');
  };

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenAuthModal');

    if (!user && !hasSeenModal) {
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <SmoothScroll>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
        <Navbar onAuthClick={openAuthModal} />
        <main>
          <Hero onAuthClick={openAuthModal} />
          <Services />
          <Clients />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

        {/* Floating Chatbot Button */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white p-0 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-40 group border-2 border-white overflow-hidden"
          aria-label="Open BT Buddy"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* BT Logo */}
            <div className="w-10 h-10 bg-black border-2 border-white rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BT</span>
            </div>
            {/* Text */}
            <div className="text-left pr-2">
              <div className="font-bold text-sm leading-tight">BT Buddy</div>
              <div className="text-xs text-gray-300">Chat with us</div>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with BT Buddy
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Chatbot Modal */}
        <Chatbot
          context="landing"
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
};

export default Home;
