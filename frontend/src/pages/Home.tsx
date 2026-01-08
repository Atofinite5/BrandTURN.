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

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
      </div>
    </SmoothScroll>
  );
};

export default Home;
