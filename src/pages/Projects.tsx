import { useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'
import { useBookSearch } from '../hooks/useBookSearch.ts'

function BookTracker() {
  const [query, setQuery] = useState('')
  const { books, error, loading } = useBookSearch(query)

  return (
    <div className="bt-wrap">
      <div className="bt-search-row">
        <input
          className="bt-input"
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="bt-status">Searching...</p>}
      {!loading && error && <p className="bt-status">{error}</p>}
      {!loading && !error && books.length === 0 && query.trim() === '' && (
        <p className="bt-status bt-hint">Type a title, author, or topic to get started.</p>
      )}

      <div className="bt-grid">
        {books.map(book => (
          <article key={book.id} className="bt-card">
            {book.volumeInfo.imageLinks?.thumbnail ? (
              <img
                className="bt-cover"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <div className="bt-cover-placeholder">
                <span>📖</span>
              </div>
            )}
            <div className="bt-info">
              <p className="bt-title">{book.volumeInfo.title}</p>
              <p className="bt-author">{book.volumeInfo.authors?.join(', ') ?? 'Unknown Author'}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const tags = ['React', 'TypeScript', 'Google Books API', 'Vite']

export default function Projects() {
  return (
    <div className="pf-wrap page-scroll">
      <Background />
      <Nav />

      <div className="page-content">
        <div className="page-header fade-in">
          <div className="pf-tag">My Work</div>
          <h1 className="pf-name">Projects</h1>
          <p className="pf-title">Things I have built while learning and exploring.</p>
        </div>

        <div className="fade-in-delay">
          <div className="proj-card">
            <div className="proj-card-header">
              <div>
                <h2 className="proj-name">Book Finder</h2>
                <p className="proj-desc">
                  A React app that lets you search millions of books via the Google Books API.
                  Built as part of my React learning journey to practice hooks, async data
                  fetching, and component composition.
                </p>
                <div className="proj-tags">
                  {tags.map(t => <span key={t} className="interest-chip">{t}</span>)}
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Link to="/projects/book-tracker" className="btn-outline" style={{ fontSize: '12px', padding: '8px 20px' }}>
                    Open full app →
                  </Link>
                </div>
              </div>
              <span className="proj-icon">📚</span>
            </div>

            <div className="proj-demo">
              <p className="proj-demo-label">Live Demo</p>
              <BookTracker />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
