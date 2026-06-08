import StarRating from './StarRating'
import type { Book } from '../hooks/useBookSearch'
import { getBookCoverUrl } from '../utils/bookImages'

type Props = {
  book: Book
  rating: number
  onRate: (rating: number) => void
  isInList: boolean
  onAddToList: () => void
}

const BookCard = ({ book, rating, onRate, isInList, onAddToList }: Props) => {
  const coverUrl = getBookCoverUrl(book.volumeInfo.imageLinks, book.id)

  return (
    <article className="bookCard">
      {coverUrl && (
        <div className="bookCardCoverWrap">
          <img className="bookCardCover" src={coverUrl} alt={book.volumeInfo.title} />
        </div>
      )}
      <h3>{book.volumeInfo.title}</h3>
      <p>{book.volumeInfo.authors?.join(', ') ?? 'Unknown Author'}</p>
      <StarRating value={rating} onChange={onRate} />
      <button
        type="button"
        className={`addToListBtn ${isInList ? 'addToListBtnAdded' : ''}`}
        onClick={onAddToList}
        disabled={isInList}
      >
        {isInList ? 'In List' : 'Add to List'}
      </button>
    </article>
  )
}

export default BookCard
