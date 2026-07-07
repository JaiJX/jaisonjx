import { Link } from 'react-router-dom'
import BookNotes from '../components/BookNotes'
import StarRating from '../components/StarRating'
import { useBookStorageContext } from '../context/BookStorageContext'
import { getBookCoverUrl } from '../utils/bookImages'

/** Saved-books page of the full Book Finder app at /projects/book-tracker/my-list. */
export default function BookTrackerMyList() {
  const { savedList, ratings, notes, rateBook, updateNote, removeFromList } =
    useBookStorageContext()

  return (
    <main className="myListPage">
      <div className="bt-top">
        <img className="image" src="/Books.svg" alt="Book Icon" />
        <h1>My List</h1>
      </div>

      {savedList.length === 0 ? (
        <div className="myListEmpty">
          <p>Your list is empty.</p>
          <Link to="/portfolio/projects/book-tracker" className="myListEmptyLink">
            Search for books to add
          </Link>
        </div>
      ) : (
        <section className="allBooks myListGrid" aria-label="Saved books">
          {savedList.map((book) => {
            const coverUrl = getBookCoverUrl(
              book.thumbnail ? { thumbnail: book.thumbnail } : undefined,
              book.id,
            )

            return (
              <article key={book.id} className="bookCard savedBookCard">
                {coverUrl ? (
                  <div className="bookCardCoverWrap">
                    <img className="bookCardCover" src={coverUrl} alt={book.title} />
                  </div>
                ) : (
                  <div className="bookCardPlaceholder" aria-hidden>
                    No cover
                  </div>
                )}
                <h3>{book.title}</h3>
                <p>{book.authors?.join(', ') ?? 'Unknown Author'}</p>
                <StarRating
                  value={ratings[book.id] ?? 0}
                  onChange={(rating) => rateBook(book.id, rating)}
                />
                <BookNotes
                  bookId={book.id}
                  value={notes[book.id] ?? ''}
                  onSave={(note) => updateNote(book.id, note)}
                />
                <button
                  type="button"
                  className="removeFromListBtn removeFromListBtnCard"
                  onClick={() => removeFromList(book.id)}
                >
                  Remove from List
                </button>
              </article>
            )
          })}
        </section>
      )}
    </main>
  )
}
