import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  onAuthClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const headerRef = useRef<HTMLElement>(null);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '#contact' }
  ];

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "10px top", // Trigger after scrolling 10px
        end: "bottom bottom",
        toggleClass: { targets: header, className: "is-sticky" }
      });
    }, headerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <motion.header ref={headerRef} className={`py-4 px-4 md:px-12 sticky top-0 z-50 transition-all duration-300 border-b border-white/10 bg-black/80 backdrop-blur-md ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="font-bold text-2xl text-white uppercase font-display tracking-tighter">
          Brand<span className="text-[var(--color-primary)]">TURN</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-sm font-medium text-white/70 hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <button
            ref={buttonRef}
            onClick={onAuthClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden transition-all duration-500 flex items-center justify-center gap-2 group bg-black text-white border border-white/20 hover:border-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase"
          >
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`
              }}
            />
            <span className="relative z-10 flex items-center gap-2">Sign Up</span>
          </button>
        </div>
        
        <button className="lg:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>

      </div>
    </motion.header>
  );
};

export default Header;