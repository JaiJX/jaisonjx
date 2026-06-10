import { Link } from 'react-router-dom'
import Background from '../components/Background.tsx'
import Logo from '../components/Logo.tsx'
import Nav from '../components/Nav.tsx'

export default function Home() {
  return (
    <div className="pf-wrap">
      <Background />
      <Nav />

      <div className="avatar-wrap">
        <Logo className="avatar-logo" />
      </div>

      <div className="pf-content">
        <div className="pf-tag">Available for select work</div>
        <h1 className="pf-name">
          Jaison<br />
          <span>Jiji</span>
        </h1>
        <p className="pf-title">Product Designer &amp; Creative Developer</p>
        <p className="pf-bio">
          I design and build digital experiences with a craftsman's patience —
          every pixel placed with intent, every interaction refined until it
          feels inevitable.
        </p>
        <div className="pf-btns">
          <Link to="/photography" className="btn-primary">Explore my work</Link>
          <Link to="/about#contact" className="btn-outline">Start a conversation</Link>
        </div>
        <div className="pf-stats">
          <div className="stat">
            <div className="stat-num">12+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num">3 yrs</div>
            <div className="stat-label">Of craft</div>
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
