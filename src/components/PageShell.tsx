import type { ReactNode, CSSProperties } from 'react'

import Background from '@/components/Background.tsx'
import Nav from '@/components/Nav.tsx'

/**
 * Shared chrome for all portfolio pages: atmosphere, fixed nav, content
 * column, and the HUD footer strip.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Background />
      <Nav />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 md:px-10">
        {children}
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-10">
          <span>© 2026 Jaison Jiji</span>
          <span className="flex items-center gap-2">
            <span className="blink inline-block size-1.5 bg-primary" aria-hidden />
            Designed &amp; built in the sun
          </span>
        </div>
      </footer>
    </div>
  )
}

/**
 * Standard page header: mono kicker tag + giant Deltha title.
 * `accent` renders highlighted in solar orange.
 */
export function PageHeader({
  kicker,
  title,
  accent,
  sub,
}: {
  kicker: string
  title: string
  accent?: string
  sub?: string
}) {
  return (
    <div className="mb-14">
      <p
        className="boot mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-accent"
        style={{ '--boot-delay': '0.15s' } as CSSProperties}
      >
        <span className="inline-block h-px w-8 bg-accent" aria-hidden />
        {kicker}
      </p>
      <h1
        className="display-hero boot-wipe hero-echo text-[clamp(2.6rem,8vw,5.5rem)] text-ink"
        style={{ '--boot-delay': '0.25s' } as CSSProperties}
      >
        {title}
        {accent && <span className="text-primary">{accent}</span>}
      </h1>
      {sub && (
        <p
          className="boot mt-5 max-w-xl text-sm leading-relaxed text-ink-soft/80 md:text-base"
          style={{ '--boot-delay': '0.45s' } as CSSProperties}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
