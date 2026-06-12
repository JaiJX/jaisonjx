/**
 * Fixed atmosphere layer: technical blueprint grid, drifting solar glow
 * orbs, and a slow scanline sweep. Pure decoration — pointer-events: none.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* blueprint grid */}
      <div className="solar-grid absolute inset-0" />

      {/* drifting solar orbs */}
      <div
        className="glow-orb"
        style={{
          width: 'clamp(280px, 36vw, 620px)',
          height: 'clamp(280px, 36vw, 620px)',
          background: '#FF7A2F',
          top: '-12%',
          right: '-8%',
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 'clamp(220px, 26vw, 460px)',
          height: 'clamp(220px, 26vw, 460px)',
          background: '#FFB347',
          bottom: '-14%',
          left: '-6%',
          animationDelay: '-9s',
          animationDuration: '24s',
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 'clamp(140px, 16vw, 300px)',
          height: 'clamp(140px, 16vw, 300px)',
          background: '#FF5500',
          top: '38%',
          left: '32%',
          opacity: 0.16,
          animationDelay: '-4s',
          animationDuration: '30s',
        }}
      />

      {/* scanline sweep */}
      <div className="scanline" />
    </div>
  )
}
