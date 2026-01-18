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
          className="fixed bottom-6 right-6 bg-[#c9f31c] text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 group"
          aria-label="Open BT buddy"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with BT buddy
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
