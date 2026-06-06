import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

// Add awards here to show the Awards section; empty hides it.
const awards: { medal: string; name: string; org: string }[] = []

const certificates = [
  { icon: '📜', name: 'MA University Completion', issuer: 'MA University', year: '2026' },
  { icon: '🐍', name: 'Python 3 Course', issuer: 'Codecademy', year: '2025' },
  { icon: '📜', name: 'Claude 101', issuer: 'Skilljar', year: '2026', url: 'https://verify.skilljar.com/c/ms772yxayv9n' },
  { icon: '📜', name: 'Claude Code 101', issuer: 'Skilljar', year: '2026', url: 'https://verify.skilljar.com/c/n44iv8sscqky' },
]

const skills = [
  'Lighting Design',
  'Python',
  'Photography',
  'UI / UX Design',
  'HTML & CSS',
  'Figma',
]

export default function Achievements() {
  return (
    <div className="pf-wrap page-scroll">
      <Background />
      <Nav />

      <div className="page-content">
        <div className="page-header fade-in">
          <div className="pf-tag">Milestones</div>
          <h1 className="pf-name">Achieve<span>ments</span></h1>
        </div>

        <div className="ach-layout fade-in-delay">
          <div className="ach-main">
            <section className="ach-section">
              <h2 className="section-title">Skills</h2>
              <div className="skill-chips">
                {skills.map((skill) => (
                  <span className="skill-chip" key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="ach-section">
              <h2 className="section-title">Certificates</h2>
              <div className="cert-grid">
                {certificates.map((cert, i) => {
                  const inner = (
                    <>
                      <div className="cert-icon">{cert.icon}</div>
                      <div className="cert-body">
                        <h3 className="cert-name">{cert.name}</h3>
                        <div className="cert-issuer">{cert.issuer}</div>
                      </div>
                      <span className="cert-year">{cert.year}</span>
                    </>
                  )
                  return cert.url ? (
                    <a
                      className="cert-card"
                      key={i}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="cert-card" key={i}>
                      {inner}
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <aside className="ach-aside">
            <section className="ach-section">
              <h2 className="section-title">Education</h2>
              <div className="edu-list">
                <div className="edu-item">
                  <div className="edu-icon">🎓</div>
                  <div>
                    <div className="edu-degree">In <span>Highschool</span></div>
                    <div className="edu-school">Highroad Academy · Grad of <span>2027</span></div>
                  </div>
                </div>
                <div className="edu-item">
                  <div className="edu-icon">📜</div>
                  <div>
                    <div className="edu-degree">Certification Name</div>
                    <div className="edu-school">NA</div>
                  </div>
                </div>
              </div>
            </section>

            {awards.length > 0 && (
              <section className="ach-section">
                <h2 className="section-title">Awards</h2>
                <div className="awards-list">
                  {awards.map((award, i) => (
                    <div className="award-item" key={i}>
                      <span className="award-medal">{award.medal}</span>
                      <div>
                        <div className="award-name">{award.name}</div>
                        <div className="award-org">{award.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
