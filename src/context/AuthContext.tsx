import { createContext, useContext, useState, type ReactNode } from 'react';
import type { LoginSuccessResponse, UserDto } from '@/types/bff-api';

interface AuthContextValue {
    isAuthenticated: boolean;
    user: UserDto | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const STORAGE_KEY = 'auth_user';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): UserDto | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as UserDto;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserDto | null>(readStoredUser);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/api/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && (data as LoginSuccessResponse).status) {
                const loggedInUser = (data as LoginSuccessResponse).user;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
                setUser(loggedInUser);
                return true;
            }

            return false;
        } catch (err) {
            console.error('Login failed:', err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}