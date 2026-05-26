import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/photography', label: 'Photography' },
  { to: '/projects', label: 'Projects' },
]

export default function Nav() {
  return (
    <nav className="pf-nav">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
