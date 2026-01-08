import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';
import AccessibilityPanel from '../ui/AccessibilityPanel';

const Footer = () => {
  const [isAccessPanelOpen, setIsAccessPanelOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const elementId = href.replace('#', '');
      
      if (location.pathname !== '/') {
        navigate(`/${href}`); // Navigate to home with hash (e.g., /#contact)
      } else {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const footerLinks = {
    services: [
      { name: 'Brand Identity', href: '#contact' },
      { name: 'Social Media', href: '#contact' },
      { name: 'Web Design', href: '#contact' },
      { name: 'Marketing Strategy', href: '#contact' },
      { name: 'Content Creation', href: '#contact' },
    ],
    company: [
      { name: 'Our Work', href: '#services' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: 'https://www.instagram.com/_brandturn' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/_brandturn', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/brandturn/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/_brandturn?s=20', label: 'Twitter' },
  ];

  const isCareersPage = location.pathname === '/careers';

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      {/* Curved Top Section - U shape curving up from corners */}
      <div className="w-full" style={{ backgroundColor: isCareersPage ? '#050505' : '#e8e4dc' }}>
        <svg
          className="relative block w-full"
          style={{ height: '60px' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          {/* Main U-curve from corners going up */}
          <path
            d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z"
            fill="#0a0a0a"
          />
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-primary/3 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/2 rounded-full blur-[200px]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-8 md:pt-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              {/* Brandturn Logo - Bt. */}
              <div className="mb-6">
                <img 
                  src="/assets/images/brandturn.co.in.png" 
                  alt="Brandturn Logo" 
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
              <Link to="/" className="inline-block mb-6 group">
                <span className="font-bold text-3xl text-white tracking-tight font-display transition-colors">
                  Brand<span className="text-primary group-hover:text-white transition-colors">TURN</span>
                </span>
              </Link>
              <p className="text-gray-400 text-base mb-8 max-w-sm leading-relaxed">
                We don't just promote brands — we turn them into <span className="text-white font-medium">Digital Powerhouses</span>. Your growth is our mission.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,243,28,0.3)]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                      >
                         <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                         <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={(e) => handleScrollToSection(e, link.href)}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                      >
                        <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                Newsletter
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with our latest news and offers.
              </p>
              <form className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 gap-3 focus-within:border-white/30 focus-within:bg-white/10 transition-all" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent text-white text-sm placeholder-white/40 focus:outline-none w-32"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/[0.05]">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} BrandTurn. All rights reserved.
                </p>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  Crafted with <span className="text-red-500 animate-pulse">♥</span> for brands that dare to grow
                </p>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</a>
                <button 
                   onClick={() => {
                     localStorage.removeItem('cookieConsent');
                     window.location.reload();
                   }}
                   className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Cookies
                </button>
                <button 
                  onClick={() => setIsAccessPanelOpen(true)}
                  className="text-gray-500 hover:text-white text-sm transition-colors focus:outline-none"
                >
                  Accessibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AccessibilityPanel 
        isOpen={isAccessPanelOpen} 
        onClose={() => setIsAccessPanelOpen(false)} 
      />

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
};

export default Footer;
