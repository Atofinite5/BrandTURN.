import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

interface NavbarProps {
    onAuthClick: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHoverDropdownOpen, setIsHoverDropdownOpen] = useState(false);
    const { user, logout, googleLogin } = useAuth();
    
    // Button spotlight state
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const handleDropdownEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHoverDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHoverDropdownOpen(false);
        }, 150);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Clients', href: '#clients' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'py-4' : 'py-6'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div 
                    className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
                        isScrolled 
                        ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
                        : 'bg-transparent border border-transparent'
                    }`}
                >
                    {/* Logo */}
                    <a href="#" className="text-2xl font-bold tracking-tight font-display">
                        <span className="text-white">Brand</span><span className="text-[var(--color-primary)]">TURN</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Auth Button */}
                    <div className="hidden md:block relative">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-white/80">Hi, {user.name}</span>
                                <button 
                                    onClick={logout}
                                    className="text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div 
                                className="relative"
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <a
                                    href="#contact"
                                    ref={buttonRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative overflow-hidden transition-all duration-500 flex items-center justify-center gap-2 group bg-black text-white border border-white/20 hover:border-white hover:bg-white hover:text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                                >
                                    <div
                                        className="pointer-events-none absolute -inset-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`
                                        }}
                                    />
                                    <span className="relative z-10 flex items-center gap-2">Contact Us</span>
                                </a>

                                {/* Hover Dropdown with Google Auth */}
                                <div 
                                    ref={dropdownRef}
                                    className={`absolute top-full right-0 mt-3 transition-all duration-300 ease-out ${
                                        isHoverDropdownOpen 
                                            ? 'opacity-100 translate-y-0 pointer-events-auto' 
                                            : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}
                                >
                                    {/* Arrow */}
                                    <div className="absolute -top-2 right-8 w-4 h-4 bg-[#0A0A0A] border-l border-t border-white/10 transform rotate-45" />
                                    
                                    <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[280px]">
                                        {/* Glow Effect */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-[#D4AF37]/10 blur-[40px] pointer-events-none" />
                                        
                                        <div className="relative p-5">
                                            {/* Header */}
                                            <div className="text-center mb-4">
                                                <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">
                                                    Quick Sign In
                                                </h3>
                                                <p className="text-white/50 text-xs">
                                                    Continue with Google
                                                </p>
                                            </div>

                                            {/* Google Login Button */}
                                            <div className="flex justify-center">
                                                <GoogleLogin
                                                    onSuccess={(credentialResponse) => {
                                                        if (credentialResponse.credential) {
                                                            googleLogin(credentialResponse.credential);
                                                            setIsHoverDropdownOpen(false);
                                                        }
                                                    }}
                                                    onError={() => {
                                                        console.log('Login Failed');
                                                    }}
                                                    theme="outline"
                                                    shape="pill"
                                                    width="240"
                                                    text="signin_with"
                                                />
                                            </div>

                                            {/* Divider */}
                                            <div className="relative my-4">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-white/10"></div>
                                                </div>
                                                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                                                    <span className="px-3 bg-[#0A0A0A] text-white/40">or</span>
                                                </div>
                                            </div>

                                            {/* More Options Button */}
                                            <button
                                                onClick={onAuthClick}
                                                className="w-full py-2.5 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 tracking-wide"
                                            >
                                                More Sign In Options
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2 "
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-white/80 hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full py-3 rounded-full bg-white text-black font-bold mt-4 text-center block"
                    >
                        Contact Us
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
