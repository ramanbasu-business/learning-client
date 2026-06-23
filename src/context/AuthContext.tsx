import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextValue {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const STORAGE_KEY = 'auth_username';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

    const login = (user: string, password: string) => {
        if (user === 'admin' && password === '111') {
            localStorage.setItem(STORAGE_KEY, user);
            setUsername(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!username, username, login, logout }}>
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