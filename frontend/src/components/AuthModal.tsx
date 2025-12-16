import React, { useState, useRef, useLayoutEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import gsap from 'gsap';
import { LuxuryInput } from './ui/LuxuryInput';
import { LuxuryButton } from './ui/LuxuryButton';
import { X, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminKey, setAdminKey] = useState('');
    
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { login, register, googleLogin, error } = useAuth();

    // Entrance Animation
    useLayoutEffect(() => {
        if (!isOpen) return;
        
        const ctx = gsap.context(() => {
            // Overlay fade in
            gsap.fromTo(overlayRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );

            // Modal scale and fade
            gsap.fromTo(modalRef.current,
                { scale: 0.95, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
            );

            // Stagger elements
            gsap.from(".auth-stagger", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.3
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isOpen]);

    // Tab Switching Animation
    useLayoutEffect(() => {
        if (!isOpen || !pillRef.current) return;

        const ctx = gsap.context(() => {
            // Move pill with premium swipe animation
            gsap.set(pillRef.current, { willChange: "transform" });

            const direction = isLogin ? -1 : 1;

            const tl = gsap.timeline({ overwrite: "auto" });

            tl.to(pillRef.current, {
                xPercent: isLogin ? 0 : 100,
                duration: 0.55,
                ease: "expo.out"
            });

            // Animate form height and content
            const formTl = gsap.timeline();
            
            formTl.to(".form-content", {
                opacity: 0,
                y: 10,
                duration: 0.2,
            })
            .to(".form-content", {
                opacity: 1,
                y: 0,
                duration: 0.3,
                clearProps: "all"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isLogin, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password, adminKey);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err) {
            // Error handled in context
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                ref={overlayRef}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-[420px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#D4AF37]/10 blur-[60px] pointer-events-none" />

                <div className="relative p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8 auth-stagger">
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Join the Elite'}
                        </h2>
                        <p className="text-white/40 text-sm font-medium tracking-wide">
                            {isLogin ? 'Access your luxury dashboard' : 'Begin your journey with us'}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="relative bg-[#141414] p-1 rounded-xl mb-8 flex auth-stagger">
                        <div 
                            ref={pillRef}
                            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#1A1A1A] border border-white/5 rounded-lg shadow-sm z-0"
                        />
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`relative z-10 flex-1 py-2.5 text-sm font-semibold transition-colors duration-300 ${isLogin ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`relative z-10 flex-1 py-2.5 text-sm font-semibold transition-colors duration-300 ${!isLogin ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm text-center auth-stagger">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 form-content auth-stagger">
                        {!isLogin && (
                            <LuxuryInput
                                icon={<User size={18} />}
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                            />
                        )}

                        <LuxuryInput
                            icon={<Mail size={18} />}
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <LuxuryInput
                            icon={<Lock size={18} />}
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {isLogin && (
                            <LuxuryInput
                                icon={<Lock size={18} />}
                                placeholder="Admin Key (Optional)"
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                            />
                        )}

                        <div className="pt-4">
                            <LuxuryButton type="submit">
                                {isLogin ? "Sign In" : "Create Account"}
                            </LuxuryButton>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8 auth-stagger">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                            <span className="px-4 bg-[#0A0A0A] text-white/30">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Auth */}
                    <div className="flex justify-center auth-stagger">
                        <div className="w-full flex justify-center">
                             <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    if (credentialResponse.credential) {
                                        googleLogin(credentialResponse.credential).then(() => onClose());
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                theme="outline"
                                shape="pill"
                                width="300"
                                text={isLogin ? "signin_with" : "signup_with"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
