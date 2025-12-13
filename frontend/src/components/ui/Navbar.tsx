import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
    onAuthClick: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Clients', href: '#clients' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${isScrolled || isMenuOpen
                        ? 'bg-black/50 backdrop-blur-md border border-white/10 shadow-lg'
                        : 'bg-transparent'
                        }`}
                >
                    {/* Logo */}
                    <a href="#" className="text-2xl font-bold tracking-tight font-fraunces">
                        <span className="text-[#DAA520]">Brand</span><span className="text-white">TURN.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-white font-medium">{user.name}</span>
                                <button
                                    onClick={logout}
                                    className="px-5 py-2 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onAuthClick}
                                className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 mt-2 px-6">
                        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            {user ? (
                                <>
                                    <div className="text-white font-medium text-center">{user.name}</div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-5 py-3 bg-white/10 text-white rounded-xl text-center font-semibold"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        onAuthClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className="px-5 py-3 bg-primary text-black rounded-xl text-center font-semibold"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
