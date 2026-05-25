import { Link } from 'react-router-dom'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

export default function Home() {
  return (
    <div className="pf-wrap">
      <Background />
      <Nav />

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
          <Link to="/photography" className="btn-primary">View my work</Link>
          <Link to="/about#contact" className="btn-outline">Get in touch</Link>
        </div>
        <div className="pf-stats">
          <div className="stat">
            <div className="stat-num">12+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num">3 yrs</div>
            <div className="stat-label">Experience</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">Curiosity</div>
          </div>
        </div>
      </div>
    </div>
  )
}
