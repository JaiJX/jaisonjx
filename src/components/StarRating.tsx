type StarRatingProps = {
  value: number
  onChange: (rating: number) => void
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  return (
    <div className="starRating" role="group" aria-label="Book rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? 'starFilled' : ''}`}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} out of 5 stars`}
          aria-pressed={star <= value}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
