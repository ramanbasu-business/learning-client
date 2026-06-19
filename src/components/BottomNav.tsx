import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Patients', to: '/patients' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'Alerts', to: '/records' },
]

export default function BottomNav() {
  return (
    <nav
      className="grid h-16 grid-cols-4 border-t border-care-line bg-white px-2 lg:hidden"
      aria-label="Mobile primary"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            `focus-ring my-2 rounded-md py-2 text-center text-xs font-semibold ${
              isActive ? 'bg-care-mint text-care-ink' : 'text-care-muted'
            }`
          }
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
