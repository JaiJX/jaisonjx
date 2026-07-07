import { useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BookStorageProvider, useBookStorageContext } from '../context/BookStorageContext'
import '../styles/book-tracker-app.css'

function BookTrackerNav() {
  const { savedList } = useBookStorageContext()

  return (
    <header className="bt-header">
      <nav className="bt-nav" aria-label="Book tracker">
        <NavLink
          to="/portfolio/projects/book-tracker"
          end
          className={({ isActive }) => (isActive ? 'bt-navLink active' : 'bt-navLink')}
        >
          Search
        </NavLink>
        <NavLink
          to="/portfolio/projects/book-tracker/my-list"
          className={({ isActive }) => (isActive ? 'bt-navLink active' : 'bt-navLink')}
        >
          My List
          {savedList.length > 0 && (
            <span className="bt-navBadge" aria-label={`${savedList.length} books saved`}>
              {savedList.length}
            </span>
          )}
        </NavLink>
      </nav>
    </header>
  )
}

/**
 * Shared shell for the full Book Tracker app at /portfolio/projects/book-tracker.
 * Provides persistent storage, the dark page background, the back link, and
 * the in-app Search / My List navigation around the routed pages.
 */
export default function BookTrackerLayout() {
  useEffect(() => {
    const prevBackground = document.body.style.background
    document.body.style.background = '#0D0D14'
    return () => { document.body.style.background = prevBackground }
  }, [])

  return (
    <BookStorageProvider>
      <div className="bt-app">
        <Link to="/portfolio/projects" className="bt-back">← Back to Projects</Link>
        <BookTrackerNav />
        <Outlet />
      </div>
    </BookStorageProvider>
  )
}
