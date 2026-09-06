import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Achievements from './pages/Achievements.tsx'
import Photography from './pages/Photography.tsx'
import Projects from './pages/Projects.tsx'
import BookTrackerLayout from './components/BookTrackerLayout.tsx'
import BookTrackerApp from './pages/BookTrackerApp.tsx'
import BookTrackerMyList from './pages/BookTrackerMyList.tsx'
import NotFound from './pages/NotFound.tsx'

// Pre-landing-page URLs → their new home under /portfolio.
const legacyRedirects = [
  'about',
  'achievements',
  'photography',
  'projects',
  'projects/book-tracker',
  'projects/book-tracker/my-list',
]

/** Redirect that keeps ?search and #hash (e.g. /about#contact). */
function Redirect({ to }: { to: string }) {
  const { search, hash } = useLocation()
  return <Navigate to={`${to}${search}${hash}`} replace />
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/portfolio/about" element={<About />} />
        <Route path="/portfolio/achievements" element={<Achievements />} />
        <Route path="/portfolio/photography" element={<Photography />} />
        <Route path="/portfolio/projects" element={<Projects />} />
        <Route path="/portfolio/projects/book-tracker" element={<BookTrackerLayout />}>
          <Route index element={<BookTrackerApp />} />
          <Route path="my-list" element={<BookTrackerMyList />} />
        </Route>
        {legacyRedirects.map((path) => (
          <Route key={path} path={`/${path}`} element={<Redirect to={`/portfolio/${path}`} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
