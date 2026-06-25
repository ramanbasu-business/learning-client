import { Profile } from './types/Profile';

import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import SocketNotificationComponent from './components/SocketNotificationComponent';

export default function AppShell({ children }: { children?: React.ReactNode }) {
    const profile: Profile = {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@email.com',
        roleName: 'Admin'
    };

    return (
        <div className="flex min-h-screen bg-transparent text-slate-100">
            <Sidebar />

            <main className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-10 border-b border-white/10 bg-[#10192e]/90 px-4 py-4 backdrop-blur sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Dashboard
                            </p>
                            <h1 className="text-lg font-semibold text-white sm:text-xl">
                                {profile.first_name || profile.email || 'Dashboard'}
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <SocketNotificationComponent />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="hidden rounded-full bg-[#4f46e5] px-3 py-1 text-xs font-semibold text-white sm:inline-flex">
                                {profile.roleName || 'Patient'}
                            </span>
                            <a href='/logoff' className="rounded-md border border-white/10 bg-[#111a31] px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-[#16213d]">
                                Log off</a>
                            
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-3 sm:p-4 lg:p-5">
                    <div className="min-h-full rounded-2xl border border-white/10 bg-[#070b16] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-5">
                        {children}
                    </div>
                </div>

                <BottomNav />
            </main>
        </div>
    );
};
