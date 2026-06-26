import { NavLink } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Cart', href: '/cartpage' },
    { name: 'Orders', href: '/orders' },
    { name: 'Messages', href: '/messages' },
    { name: 'Settings', href: '/settings' },

    { name: 'TestListGroup Event', href: '/TestListGroup' },
    { name: 'TestAlert Event', href: '/TestAlert' },
    { name: 'TestButton Event', href: '/TestButton' },

    { name: 'Logoff', href: '/logoff' },
];

export default function Sidebar() {
    return (
        <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#0d1426] px-4 py-4 lg:block">
            <div className="mb-8">
                <p className="text-lg font-semibold text-white">My App - 

                    <a href='/' className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                        Home</a>
                </p>
                
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Learning Application
                </p>
            </div>

            <nav className="space-y-1" aria-label="Primary">
                {navItems.map((navItem) => (
                    <NavLink
                        key={navItem.name}
                        to={navItem.href}
                        className={({ isActive }) =>
                            [
                                'flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-[#1c2750] text-white ring-1 ring-[#4f46e5]/50'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                            ].join(' ')
                        }
                    >
                        <span>{navItem.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
