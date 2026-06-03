import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Achievements from './pages/Achievements.tsx'
import Photography from './pages/Photography.tsx'
import Projects from './pages/Projects.tsx'
import BookTrackerLayout from './components/BookTrackerLayout.tsx'
import BookTrackerApp from './pages/BookTrackerApp.tsx'
import BookTrackerMyList from './pages/BookTrackerMyList.tsx'

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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/book-tracker" element={<BookTrackerLayout />}>
          <Route index element={<BookTrackerApp />} />
          <Route path="my-list" element={<BookTrackerMyList />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}