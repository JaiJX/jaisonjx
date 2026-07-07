import type { CSSProperties } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

const links = [
  { to: '/portfolio', label: 'Home', index: '01' },
  { to: '/portfolio/about', label: 'About', index: '02' },
  { to: '/portfolio/achievements', label: 'Achievements', index: '03' },
  { to: '/portfolio/photography', label: 'Photography', index: '04' },
  { to: '/portfolio/projects', label: 'Projects', index: '05' },
]

export default function Nav() {
  return (
    <header
      className="boot fixed inset-x-0 top-0 z-50"
      style={{ '--boot-delay': '0.1s' } as CSSProperties}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-4 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-md md:px-10"
      >
        <Link
          to="/"
          className="display glitch-hover text-xl text-ink no-underline md:text-2xl"
          aria-label="Jaison Jiji — gateway"
        >
          JJ<span className="text-primary">X</span>
        </Link>

        <ul className="flex list-none flex-wrap items-center justify-end gap-x-5 gap-y-1 md:gap-x-8">
          {links.map(({ to, label, index }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/portfolio'}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-baseline gap-1.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] no-underline transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="hidden text-[9px] opacity-50 sm:inline">{index}</span>
                    {label}
                    <span
                      className={cn(
                        'absolute -bottom-px left-0 h-0.5 bg-primary transition-all duration-300 clip-blade',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
