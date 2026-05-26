import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBookSearch } from '../hooks/useBookSearch'
import '../styles/book-tracker-app.css'

export default function BookTrackerApp() {
  const [query, setQuery] = useState('')
  const { books, error, loading } = useBookSearch(query)

  useEffect(() => {
    const prevBackground = document.body.style.background
    document.body.style.background = '#0D0D14'
    return () => { document.body.style.background = prevBackground }
  }, [])

  return (
    <div className="bt-app">
      <Link to="/projects" className="bt-back">← Back to Projects</Link>
      <main>
        <div className="bt-top">
          <img className="image" src="/Books.svg" alt="Book Icon" />
          <h1>Book Finder</h1>
        </div>
        <div className="bt-bottom">
          <h2>Find a Book</h2>
          <div className="search">
            <div>
              <input
                id="book-search"
                type="text"
                placeholder="Search for a book"
                aria-label="Search for a book"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
          <section className="allBooks">
            {loading && <p style={{ color: '#9CA3AF' }}>Searching...</p>}
            {!loading && books.map(book => (
              <article key={book.id} className="bookCard">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ') ?? 'Unknown Author'}</p>
              </article>
            ))}
            {!loading && error && <p className="error">{error}</p>}
          </section>
        </div>
      </main>
    </div>
  )
}
