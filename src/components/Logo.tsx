/**
 * JJ monogram logo rendered as inline SVG.
 *
 * Inlining (rather than loading via `<img src="logo.svg">`) lets the SVG use
 * the page's Playfair Display web font — browsers block external resources,
 * including fonts, when an SVG is loaded through an `<img>` tag or as a favicon.
 *
 * @param className - optional class applied to the root `<svg>` for sizing.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      role="img"
      aria-label="Jaison Jiji logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>JJ Logo</title>

      {/* Outer dark circle */}
      <circle cx="250" cy="250" r="230" fill="#111111" />

      {/* Orange filled circle */}
      <circle cx="250" cy="250" r="185" fill="#ff6b1a" />

      {/* Rotated square */}
      <rect x="172" y="172" width="156" height="156" rx="8" fill="#111111" transform="rotate(45 250 250)" />

      {/* Inner orange diamond */}
      <rect x="205" y="205" width="90" height="90" rx="4" fill="#ff6b1a" transform="rotate(45 250 250)" />

      {/* JJ letters */}
      <text
        x="250"
        y="282"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="155"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="-2"
      >
        JJ
      </text>

      {/* Outer ring */}
      <circle cx="250" cy="250" r="230" fill="none" stroke="#ff6b1a" strokeWidth="3" />
      {/* Inner ring */}
      <circle cx="250" cy="250" r="215" fill="none" stroke="#ff6b1a" strokeWidth="1" opacity="0.5" />

      {/* Dot accents */}
      <circle cx="250" cy="22" r="6" fill="#ff6b1a" />
      <circle cx="250" cy="478" r="6" fill="#ff6b1a" />
      <circle cx="22" cy="250" r="6" fill="#ff6b1a" />
      <circle cx="478" cy="250" r="6" fill="#ff6b1a" />
    </svg>
  )
}
