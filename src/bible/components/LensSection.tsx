import type { Lens } from '../content'
import { useScrollProgress } from '../hooks'
import Reveal from './Reveal'

export default function LensSection({ lens }: { lens: Lens }) {
  const { ref, progress } = useScrollProgress<HTMLElement>()

  // Drive the portrait with scroll progress: it drifts, scales and fades
  // as the section passes through the viewport.
  const drift = (progress - 0.5) * 120 // px vertical parallax
  const slide = (progress - 0.5) * 60 * (lens.align === 'right' ? 1 : -1)
  const scale = 0.92 + progress * 0.18
  const rotate = (progress - 0.5) * 6 * (lens.align === 'right' ? 1 : -1)
  const portraitOpacity = Math.min(1, 0.25 + progress * 1.4)

  return (
    <section
      ref={ref}
      id={lens.id}
      className={`lens lens--${lens.align}`}
      aria-labelledby={`${lens.id}-title`}
    >
      {/* giant ghost index that scrolls in the background */}
      <span
        className="lens__ghost"
        aria-hidden="true"
        style={{ transform: `translateY(${-drift * 1.6}px)` }}
      >
        {lens.index}
      </span>

      <div className="lens__portrait-wrap" aria-hidden="true">
        <img
          src={lens.portrait}
          alt=""
          className="lens__portrait"
          style={{
            transform: `translate(${slide}px, ${drift}px) scale(${scale}) rotate(${rotate}deg)`,
            opacity: portraitOpacity,
          }}
        />
      </div>

      <div className="lens__content">
        <Reveal from={lens.align === 'right' ? 'left' : 'right'}>
          <p className="lens__kicker">{lens.kicker}</p>
          <h2 id={`${lens.id}-title`} className="lens__title">
            {lens.title}
          </h2>
        </Reveal>

        <div className="lens__pulls">
          {lens.pullPoints.map((p, i) => (
            <Reveal key={i} delay={120 + i * 120} from="up">
              <p className="lens__pull">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} from="up">
          <p className="lens__body">{lens.beauvoir}</p>
        </Reveal>

        <div className="lens__scripture">
          <Reveal from="up">
            <p className="lens__scripture-label">The Biblical Lens</p>
          </Reveal>
          {lens.scripture.map((s, i) => (
            <Reveal key={s.ref} delay={120 + i * 140} from="up">
              <div className="verse">
                <span className="verse__ref">{s.ref}</span>
                <p className="verse__text">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
