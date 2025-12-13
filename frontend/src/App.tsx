import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import SmoothScroll from './components/ui/SmoothScroll';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !localStorage.getItem('userInfo')) {
        setIsAuthModalOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [user]);


  return (
    <SmoothScroll>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
        <Navbar onAuthClick={openAuthModal} />
        <main>
          <Hero onAuthClick={openAuthModal} />
          <About />
          <Services />
          <Clients />
          <Contact />
        </main>
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      </div>
    </SmoothScroll>
  );
}

export default App;
