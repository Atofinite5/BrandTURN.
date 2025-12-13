import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { X, Mail, Lock, User } from 'lucide-react';
import SpotlightButton from './ui/SpotlightButton';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, register, googleLogin, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err) {
            // Error handled in context
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold font-display text-white mb-2">
                                    {isLogin ? 'Welcome Back' : 'Create Account'}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {isLogin ? 'Enter your details to access your account' : 'Join us and start your journey today'}
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <div className="flex p-1 bg-white/5 rounded-xl mb-8 relative">
                                <motion.div
                                    className="absolute top-1 bottom-1 bg-white/10 rounded-lg shadow-sm"
                                    initial={false}
                                    animate={{
                                        x: isLogin ? 0 : '100%',
                                        width: '50%'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg relative z-10 transition-colors ${isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg relative z-10 transition-colors ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm text-center flex items-center justify-center gap-2"
                                >
                                    <span>⚠️</span> {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                                    placeholder="Full Name"
                                                    required={!isLogin}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <SpotlightButton variant="primary" className="w-full py-4 mt-2 text-lg font-semibold shadow-lg shadow-primary/20">
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </SpotlightButton>
                            </form>

                            <div className="my-8 flex items-center gap-4">
                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
                                <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">Or continue with</span>
                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
                            </div>

                            <div className="flex justify-center">
                                <div className="p-1 bg-white rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg shadow-white/5">
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            if (credentialResponse.credential) {
                                                googleLogin(credentialResponse.credential).then(() => onClose());
                                            }
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                        theme="filled_black"
                                        shape="circle"
                                        type="icon"
                                        size="large"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
