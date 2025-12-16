import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    token: string;
    isAdmin?: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, adminKey?: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    googleLogin: (token: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(storedUser).token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, adminKey?: string) => {
        try {
            setError(null);
            setLoading(true);
            const { data } = await api.post('/api/auth/login', { email, password, adminKey });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            const { data } = await api.post('/api/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const googleLogin = async (token: string) => {
        try {
            setError(null);
            setLoading(true);
            const { data } = await api.post('/api/auth/google', { token });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    const logout = () => {
        googleLogout();
        localStorage.removeItem('userInfo');
        delete api.defaults.headers.common.Authorization;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
