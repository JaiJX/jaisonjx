import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Compass, House } from 'lucide-react'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import { Button } from '@/components/ui/button'
import notFoundArt from '@/assets/not-found.webp'

/**
 * Catch-all page for unknown URLs.
 *
 * On GitHub Pages the deploy step copies index.html to 404.html, so a direct
 * hit on a bad URL is served this SPA with a real 404 status and lands here
 * via the router's `*` route.
 */
export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <PageShell>
      {/* This page is short; without a floor the shared footer rides up into
          the middle of a tall desktop viewport. 16rem ≈ the shell's own
          padding plus the footer. */}
      {/* Centred in the viewport. The floor is the shell's own padding plus
          the footer, so this page fills the screen instead of letting the
          shared footer ride up into the middle of it. */}
      <div className="flex min-h-[calc(100dvh-16rem)] flex-col justify-center">
        {/* No image-rendering:pixelated — the art is served at 627px and shown
            at roughly half that, and browser smoothing beats nearest-neighbour
            on a non-integer downscale. */}
        <img
          src={notFoundArt}
          alt="A small robot sitting alone in a rainy room, beside notes reading “it's ok to feel sad” and “you got this”."
          width={627}
          height={627}
          decoding="async"
          className="boot mx-auto mb-7 w-full max-w-[190px] border border-border clip-corner sm:max-w-[240px]"
          style={{ '--boot-delay': '0.1s' } as CSSProperties}
        />
        <PageHeader
          centered
          kicker="Err // Page not found"
          title="4"
          accent="04"
          sub="This coordinate is not on the map. The page may have moved, been renamed, or never existed at all."
        />

        {/* HUD readout of whatever was actually requested */}
        <div
          className="boot mx-auto mb-8 max-w-xl border border-border bg-card/40 px-4 py-3 text-center font-mono text-[11px] clip-corner-sm"
          style={{ '--boot-delay': '0.55s' } as CSSProperties}
        >
          <span className="uppercase tracking-[0.18em] text-muted-foreground">
            Requested&nbsp;//&nbsp;
          </span>
          {/* break-all so a long nonsense URL cannot push the page sideways */}
          <span className="break-all text-accent">{pathname}</span>
        </div>

        <div
          className="boot flex flex-wrap justify-center gap-4"
          style={{ '--boot-delay': '0.7s' } as CSSProperties}
        >
          <Button asChild size="lg">
            <Link to="/portfolio">
              View the portfolio <Compass />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">
              Back to start <House />
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
