import { lenses, portraits } from './content'
import { usePageProgress, useScrollProgress } from './hooks'
import LensSection from './components/LensSection'
import Reveal from './components/Reveal'

function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>()
  // portrait parallax + fade as you scroll past the hero
  const y = progress * 160
  const portraitOpacity = 1 - progress * 1.2
  const titleY = progress * -80

  return (
    <header ref={ref} className="hero">
      <img
        src={portraits.a}
        alt="Portrait of Simone de Beauvoir"
        className="hero__portrait"
        style={{
          transform: `translateY(${y}px) scale(${1 + progress * 0.1})`,
          opacity: Math.max(0, portraitOpacity),
        }}
      />
      <div className="hero__text" style={{ transform: `translateY(${titleY}px)` }}>
        <p className="hero__eyebrow">A Philosophy Examination · Three Lenses</p>
        <h1 className="hero__title">
          De <em>Beauvoir</em>
        </h1>
        <p className="hero__dates">(1908 – 1986)</p>
        <p className="hero__sub">
          Simone de Beauvoir's existentialism, weighed against Scripture.
        </p>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section className="intro" id="intro">
      <Reveal>
        <p className="intro__lead">
          Simone de Beauvoir was a French existentialist philosopher and writer.
          Across three lenses — <strong>God</strong>, <strong>Truth</strong>, and
          <strong> Meaning &amp; Purpose</strong> — her ideas are set side by side
          with the Christian Scriptures.
        </p>
      </Reveal>
    </section>
  )
}

function Conclusion() {
  const { ref, progress } = useScrollProgress<HTMLElement>()
  return (
    <section ref={ref} className="conclusion" id="conclusion">
      <img
        src={portraits.c}
        alt=""
        aria-hidden="true"
        className="conclusion__portrait"
        style={{
          transform: `translateY(${(progress - 0.5) * 100}px) scale(${0.95 + progress * 0.1})`,
          opacity: Math.min(1, progress * 1.6),
        }}
      />
      <div className="conclusion__content">
        <Reveal>
          <p className="lens__kicker">In Conclusion</p>
          <h2 className="conclusion__q">
            Why should Christians be familiar with philosophy?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="conclusion__body">
            Being familiar with the study of philosophy allows Christians to
            defend their arguments and keep the truth of what they are saying —
            while helping the other person understand what they mean.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Nav() {
  return (
    <nav className="nav" aria-label="Section navigation">
      <a href="#intro" className="nav__brand">
        De Beauvoir
      </a>
      <div className="nav__right">
        <ul className="nav__links">
          {lenses.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`}>{l.title}</a>
            </li>
          ))}
          <li>
            <a href="#conclusion">Conclusion</a>
          </li>
        </ul>
        <a href="/" className="nav__back">
          ← Back to site
        </a>
      </div>
    </nav>
  )
}

export default function App() {
  const pageProgress = usePageProgress()
  return (
    <>
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${pageProgress})` }}
        aria-hidden="true"
      />
      <Nav />
      <main>
        <Hero />
        <Intro />
        {lenses.map((lens) => (
          <LensSection key={lens.id} lens={lens} />
        ))}
        <Conclusion />
      </main>
      <footer className="footer">
        <p>De Beauvoir · Three Lenses — a Christian philosophical examination.</p>
      </footer>
    </>
  )
}
