import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-[#070b16] text-slate-100">
            {/* Navigation */}
            <nav className="border-b border-white/10 px-6 py-4">
                <div className="mx-auto max-w-6xl flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Learning Application
                    </p>
                    <div className="flex gap-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="rounded-md bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4338ca]"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => navigate('/logoff')}
                                    className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="rounded-md bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4338ca]"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="border-b border-white/10 px-6 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-white">
                        Welcome to Learning Application
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Master new skills and expand your knowledge with our comprehensive learning platform.
                    </p>
                    {!isAuthenticated && (
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="rounded-md bg-[#4f46e5] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#4338ca] transition"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                className="rounded-md border border-white/10 px-6 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 transition"
                            >
                                Learn More
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="border-b border-white/10 px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-white mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-lg border border-white/10 bg-[#10192e] p-6">
                            <div className="h-12 w-12 rounded-md bg-[#4f46e5]/20 flex items-center justify-center mb-4">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Content</h3>
                            <p className="text-sm text-slate-400">
                                Access a wide range of courses and materials designed by industry experts.
                            </p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-[#10192e] p-6">
                            <div className="h-12 w-12 rounded-md bg-[#4f46e5]/20 flex items-center justify-center mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Learn at Your Pace</h3>
                            <p className="text-sm text-slate-400">
                                Study whenever and wherever you want with our flexible learning platform.
                            </p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-[#10192e] p-6">
                            <div className="h-12 w-12 rounded-md bg-[#4f46e5]/20 flex items-center justify-center mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Track Progress</h3>
                            <p className="text-sm text-slate-400">
                                Monitor your learning journey with detailed analytics and progress tracking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-white mb-6">About Our Platform</h2>
                    <div className="space-y-4 text-slate-400">
                        <p>
                            Learning Application is a modern, interactive platform designed to make education accessible to everyone.
                            Whether you're a student looking to advance your skills or a professional seeking to stay updated with
                            the latest technologies, we have something for you.
                        </p>
                        <p>
                            Our mission is to democratize education by providing high-quality learning materials at an affordable price.
                            We believe that everyone deserves the opportunity to learn and grow, regardless of their background or location.
                        </p>
                        <p>
                            With a team of passionate educators and developers, we're constantly working to improve the platform and
                            add new features that enhance the learning experience.
                        </p>
                    </div>

                    {!isAuthenticated && (
                        <div className="mt-12 rounded-lg border border-white/10 bg-[#10192e] p-8 text-center">
                            <h3 className="text-2xl font-semibold text-white mb-2">Ready to start learning?</h3>
                            <p className="text-slate-400 mb-6">
                                Join thousands of students already using our platform to achieve their goals.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="rounded-md bg-[#4f46e5] px-6 py-3 text-base font-semibold text-white hover:bg-[#4338ca] transition"
                            >
                                Sign In to Get Started
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 px-6 py-8">
                <div className="mx-auto max-w-6xl text-center text-sm text-slate-500">
                    <p>&copy; 2024 Learning Application. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}