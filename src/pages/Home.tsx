import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'

import Background from '@/components/Background.tsx'
import Logo from '@/components/Logo.tsx'
import Nav from '@/components/Nav.tsx'
import Reveal from '@/components/Reveal.tsx'
import { Button } from '@/components/ui/button'

const stats = [
  { num: '12+', label: 'Projects' },
  { num: '3', label: 'Years' },
  { num: '∞', label: 'Curiosity' },
]

const marqueeWords = ['Design', 'Develop', 'Photograph', 'Iterate', 'Explore']

function boot(delay: number) {
  return { '--boot-delay': `${delay}s` } as CSSProperties
}

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Background />
      <Nav />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pt-28 pb-10 md:px-10">
        {/* HUD meta strip */}
        <div
          className="boot flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
          style={boot(0.2)}
        >
          <span>Portfolio // v2.0</span>
          <span className="hidden md:inline">49.16°N — 121.95°W</span>
          <span className="flex items-center gap-2 text-accent">
            <span className="blink inline-block size-1.5 bg-primary" aria-hidden />
            Available for work
          </span>
        </div>

        {/* Hero */}
        <section className="flex flex-1 flex-col justify-center py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              {/* 3rem floor: at 3.4rem, JAISON + its echo shadow clips on 320px phones */}
              <h1 className="display-hero text-[clamp(3rem,12vw,9.5rem)] text-ink">
                <span className="boot-wipe hero-echo block" style={boot(0.3)}>
                  Jaison
                </span>
                <span className="boot-wipe text-stroke-solar block" style={boot(0.5)}>
                  Jiji
                </span>
              </h1>

              <p
                className="boot mt-6 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent md:text-xs"
                style={boot(0.7)}
              >
                <span className="inline-block h-px w-10 bg-accent" aria-hidden />
                Product Designer × Creative Developer
              </p>

              <p
                className="boot mt-6 max-w-md text-sm leading-relaxed text-ink-soft/80 md:text-base"
                style={boot(0.85)}
              >
                I craft digital experiences that blend precision with warmth —
                turning complex problems into interfaces people actually enjoy
                using.
              </p>

              <div className="boot mt-9 flex flex-wrap gap-4" style={boot(1)}>
                <Button asChild size="lg">
                  <Link to="/photography">
                    View my work <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about#contact">
                    Get in touch <Mail />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Emblem */}
            <div className="boot hidden justify-self-end md:block" style={boot(0.9)}>
              <div className="relative">
                <div
                  className="spin-slow absolute -inset-5 border border-dashed border-primary/30"
                  aria-hidden
                />
                <Logo className="relative block size-36 lg:size-44" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] whitespace-nowrap text-muted-foreground">
                  Unit JJX-01
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid max-w-xl grid-cols-3 border-t border-border pt-7">
            {stats.map(({ num, label }, i) => (
              <Reveal key={label} delay={i * 0.12}>
                <div className="display text-3xl text-primary md:text-5xl">{num}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {label}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* Marquee strip */}
      {/* black-on-orange statement strip */}
      <div className="relative z-10 overflow-hidden border-y border-border bg-primary py-4">
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeWords.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="display flex items-center gap-8 px-8 text-xl text-[#120700] md:text-2xl"
                >
                  {word}
                  <span className="size-2 rotate-45 bg-[#120700]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-10">
          <span>© 2026 Jaison Jiji</span>
        </div>
      </footer>
    </div>
  )
}
