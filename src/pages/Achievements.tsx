import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

const timeline = [
  { year: '2026', title: 'Cyber Security 101', desc: 'Completed the Cyber Security 101 Learning Path on TryHackMe (45 hrs 23 min)', tag: 'Security' },
  { year: '2026', title: 'Lighting Designer', desc: 'Achieved MA university Completion certification', tag: 'Lighting' },
  { year: '2025', title: 'Python 3 Course', desc: 'Completed the Python 3 course through Codecademy', tag: 'Development' },
]

const awards = [
  { medal: '🥇', name: 'Award Name', org: 'Organisation · Year' },
  { medal: '🏆', name: 'Award Name', org: 'Organisation · Year' },
  { medal: '⭐', name: 'Award Name', org: 'Organisation · Year' },
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
          <section className="ach-section">
            <h2 className="section-title">Timeline</h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-dot" />
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-card">
                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-desc">{item.desc}</p>
                    <span className="tl-tag">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
          </aside>
        </div>
      </div>
    </div>
  )
}
