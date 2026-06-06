import { useState } from 'react'
import BookCard from '../components/BookCard'
import { useBookSearch, type Book } from '../hooks/useBookSearch'
import { useBookStorageContext } from '../context/BookStorageContext'
import { getBookCoverUrl } from '../utils/bookImages'

/** Search page of the full Book Finder app at /projects/book-tracker. */
export default function BookTrackerApp() {
  const [query, setQuery] = useState('')
  const { books, error, loading } = useBookSearch(query)
  const { ratings, rateBook, addToList, isInList } = useBookStorageContext()

  const handleAddToList = (book: Book) => {
    addToList({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      thumbnail: getBookCoverUrl(book.volumeInfo.imageLinks, book.id),
    })
  }

  return (
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
            <BookCard
              key={book.id}
              book={book}
              rating={ratings[book.id] ?? 0}
              onRate={rating => rateBook(book.id, rating)}
              isInList={isInList(book.id)}
              onAddToList={() => handleAddToList(book)}
            />
          ))}
          {!loading && error && <p className="error">{error}</p>}
        </section>
      </div>
    </main>
  )
}
