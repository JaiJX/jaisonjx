import { useEffect, useState } from 'react'

const API_BASE = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_BOOK_API_KEY

export interface Book {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: { thumbnail?: string }
  }
}

export function useBookSearch(query: string) {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!API_KEY) { setError('Book API key is not configured.'); return }
    if (!query.trim()) { setBooks([]); setError(''); return }

    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}?q=${encodeURIComponent(query)}&key=${API_KEY}`)
        if (!res.ok) { setError('Failed to fetch books'); return }
        const data = await res.json()
        if (!data.items?.length) { setBooks([]); setError('No books found') }
        else setBooks(data.items)
      } catch {
        setError('Failed to get books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return { books, error, loading }
}
