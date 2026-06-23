import { useState, type SubmitEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        if (login(username, password)) {
            const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/';
            navigate(redirectTo, { replace: true });
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#070b16] px-4 text-slate-100">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#10192e] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Learning Application
                </p>
                <h1 className="mt-2 text-xl font-semibold text-white">Sign in</h1>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-slate-300">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="mt-1 w-full rounded-md border border-white/10 bg-[#0b1220] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-slate-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="mt-1 w-full rounded-md border border-white/10 bg-[#0b1220] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                        />
                    </div>

                    {error && <p className="text-sm font-medium text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#4f46e5] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338ca]"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}