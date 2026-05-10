import type { ReactElement } from 'react'
import './index.css'

const bubbles = [
  { className: 'b1' },
  { className: 'b2' },
  { className: 'b3' },
  { className: 'b4' },
  { className: 'b5' },
  { className: 'b6' },
  { className: 'b7' },
  { className: 'b8' },
  { className: 'b9' },
  { className: 'b10' },
]

export default function App(): ReactElement {
  return (
    <div className="pf-wrap">

      {bubbles.map((b) => (
        <div key={b.className} className={`bubble ${b.className}`} />
      ))}

      <nav className="pf-nav">
        <span className="nav-link active">Work</span>
        <span className="nav-link">About</span>
        <span className="nav-link">Contact</span>
      </nav>

      <div className="avatar-wrap">
        <div className="avatar-ring">
          <div className="avatar-inner">JJ</div>
        </div>
      </div>

      <div className="pf-content">
        <div className="pf-tag">Available for work</div>
        <h1 className="pf-name">
          Jaison<br />
          <span>Jiji</span>
        </h1>
        <p className="pf-title">Product Designer &amp; Creative Developer</p>
        <p className="pf-bio">
          I craft digital experiences that blend precision with warmth —
          turning complex problems into interfaces people actually enjoy using.
        </p>
        <div className="pf-btns">
          <button className="btn-primary">View my work</button>
          <button className="btn-outline">Get in touch</button>
        </div>
        <div className="pf-stats">
          <div className="stat">
          </div>
          <div className="stat">

          </div>
          <div className="stat">
          </div>
        </div>
      </div>

    </div>
  )
}
