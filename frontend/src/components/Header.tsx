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

  const headerRef = useRef<HTMLElement>(null);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/clients' },
    { name: 'About', path: '/about' }
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
    <motion.header ref={headerRef} className={`py-6 px-4 md:px-12 sticky top-0 z-40 transition-all duration-300 border-b border-white/10 bg-black/80 backdrop-blur-md rounded-b-2xl ${showNavbar ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300`}>
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-white uppercase font-['Georgia'] text-2xl tracking-tighter">
          BrandTURN<span className="text-primary">.</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-md font-medium text-sm uppercase tracking-wide">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <button onClick={onAuthClick} className="px-6 py-2.5 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all text-sm uppercase tracking-wide">
            Log in
          </button>
        </div>
        
        <button className="lg:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>

      </div>
    </motion.header>
  );
};

export default Header;