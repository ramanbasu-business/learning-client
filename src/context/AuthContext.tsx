import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextValue {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const STORAGE_KEY = 'auth_username';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

    const login = async (username: string, password: string) => {
        try {
            // authenticate the user
            const response = await fetch('http://localhost:5000/api/users/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            });

            console.log('Login response:', response.status, response.statusText);
            const data = await response.json();
            console.log('Login response data:', data);

            if (response.ok) {
                localStorage.setItem(STORAGE_KEY, username);
                setUsername(username);
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