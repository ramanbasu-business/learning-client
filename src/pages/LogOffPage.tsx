import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LogOffPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            logout();
            navigate('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">Logging out...</h1>
                <p className="text-gray-600">You will be redirected to the login page.</p>
            </div>
        </div>
    );
}