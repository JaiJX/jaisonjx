import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import Background from '@/components/Background.tsx'
import Logo from '@/components/Logo.tsx'
import { Button } from '@/components/ui/button'

const destinations = [
  { to: '/portfolio', label: 'Enter portfolio', path: '/portfolio' },
  { to: '/request', label: 'Request a site', path: '/request' },
]

function boot(delay: number) {
  return { '--boot-delay': `${delay}s` } as CSSProperties
}

/** Gateway splash served at the domain root. Routes visitors into the portfolio. */
export default function Landing() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Background />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-5 py-8 md:px-10">
        {/* HUD meta strip */}
        <div
          className="boot flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
          style={boot(0.15)}
        >
          <span>Gateway // jaisonjx.me</span>
          <span className="flex items-center gap-2 text-accent">
            <span className="blink inline-block size-1.5 bg-primary" aria-hidden />
            Online
          </span>
        </div>

        {/* Hero */}
        <section className="flex flex-1 flex-col justify-center py-14">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h1
                className="display-hero boot-wipe hero-echo text-[clamp(3.6rem,14vw,9rem)] text-ink"
                style={boot(0.3)}
              >
                JJX<span className="text-stroke-solar">://</span>
              </h1>
              <p
                className="boot mt-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent md:text-xs"
                style={boot(0.55)}
              >
                <span className="inline-block h-px w-10 bg-accent" aria-hidden />
                The personal domain of Jaison Jiji
              </p>

              <nav aria-label="Destinations" className="boot mt-10 max-w-md" style={boot(0.8)}>
                <ul className="flex list-none flex-col gap-4 p-0">
                  {destinations.map(({ to, label, path }, i) => (
                    <li key={to} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Button asChild size="lg" variant={i === 0 ? 'default' : 'outline'} className="w-full sm:w-72">
                        <Link to={to}>
                          {label} <ArrowUpRight />
                        </Link>
                      </Button>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {path}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="boot hidden pt-3 md:block" style={boot(0.7)}>
              <Logo className="block size-24 lg:size-28" />
            </div>
          </div>
        </section>

        <footer className="boot font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground" style={boot(1)}>
          © {new Date().getFullYear()} Jaison Jiji
        </footer>
      </main>
    </div>
  )
}
