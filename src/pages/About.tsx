import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

const skills = [
  { name: 'UI / UX Design', level: 90 },
  { name: 'HTML & CSS', level: 85 },
  { name: 'JavaScript', level: 75 },
  { name: 'Photography', level: 80 },
  { name: 'Figma', level: 88 },
]

const interests = [
  '📷 Photography',
  '🎨 Design',
  '💻 Coding',
  '🎵 Music',
  '✈️ Travel',
  '📚 Reading',
  '🎬 Film',
  '🌿 Nature',
]

export default function About() {
  return (
    <div className="pf-wrap page-scroll">
      <Background />
      <Nav />

      <div className="page-content">
        <div className="page-header fade-in">
          <div className="pf-tag">Who I am</div>
          <h1 className="pf-name">About <span>Me</span></h1>
        </div>

        <div className="about-grid fade-in-delay">
          <div className="about-card bio-card">
            <div className="about-avatar">
              <div className="avatar-ring">
                <div className="avatar-inner large">JJ</div>
              </div>
            </div>
            <h2 className="about-name">Jaison Jiji</h2>
            <p className="about-role">Product Designer &amp; Creative Developer</p>
            <p className="about-bio">
              Hey! I'm Jaison — a designer and developer who believes great products
              come from understanding people first. I love working at the intersection
              of design and technology, building things that are both beautiful and useful.
            </p>
            <p className="about-bio">
              When I'm not at a screen, I'm usually out with my camera, chasing light
              and finding stories in everyday moments.
            </p>
          </div>

          <div className="about-card">
            <h3 className="card-title">Skills</h3>
            <div className="skills-list">
              {skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-card">
            <h3 className="card-title">Interests</h3>
            <div className="interests-grid">
              {interests.map((interest) => (
                <div className="interest-chip" key={interest}>{interest}</div>
              ))}
            </div>
          </div>

          <div className="about-card" id="contact">
            <h3 className="card-title">Get in Touch</h3>
            <p className="contact-sub">Have a project in mind or just want to say hi?</p>
            <div className="contact-links">
              <a href="https://www.instagram.com/jjaison_jiji/" className="contact-row">
                <span className="contact-icon">📸</span>
                <span>Instagram/jjaison_jiji</span>
              </a>
              <a className="contact-row">
                <span className="contact-icon">🎮</span>
                <span>Discord/JaiJ</span>
              </a>
              <a href="https://linkedin.com/in/jaison-jiji-48b5a838b" className="contact-row">
                <span className="contact-icon">in</span>
                <span>Linkedin/Jaison Jiji</span>
              </a>
              <a
                href="https://github.com/JaiJX"
                target="_blank"
                rel="noreferrer"
                className="contact-row"
              >
                <span className="contact-icon">⌥</span>
                <span>github.com/JaiJX</span>
              </a>
            </div>
            <a
              href="mailto:jaisonsjxj@gmail.com"
              className="btn-primary"
              style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }}
            >
              Say Hello
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
