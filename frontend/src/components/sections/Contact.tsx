import { useState } from 'react';
import { Mail, MapPin, Phone, Lock } from 'lucide-react';
import SpotlightButton from '../ui/SpotlightButton';
import Squares from '../ui/Squares';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal';

const Contact = () => {
    const { user } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        
        setStatus('sending');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`${API_URL}/api/contacts`, formData, config);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Squares 
                    speed={0.5} 
                    squareSize={40}
                    direction='diagonal'
                    borderColor='#fff'
                    hoverFillColor='#222'
                />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4 block">
                            Get in Touch
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                            Let's Build Something <br /> Extraordinary.
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            Ready to take your brand to the next level? Contact us today for a free consultation.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email us</p>
                                    <a href="mailto:Supriya.honest@gmail.com" className="font-medium hover:text-primary transition-colors">core@brandturn.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Call us</p>
                                    <p className="font-medium">+91 7295823923</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Visit us</p>
                                    <p className="font-medium">Mumbai, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
                        {!user && (
                            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                    <Lock className="w-8 h-8 text-white/50" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Members Only</h3>
                                <p className="text-gray-400 mb-6 max-w-xs">Please sign in to contact our team and start your project.</p>
                                <button 
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Sign In to Connect
                                </button>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className={`space-y-6 ${!user ? 'opacity-20 pointer-events-none' : ''}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Project Inquiry"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group bg-primary text-black hover:shadow-[0_0_20px_rgba(252,163,17,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again.' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">© 2024 BrandTurn. All rights reserved.</p>
                    <div className="flex gap-6 text-gray-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
            
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </section>
    );
};

export default Contact;
