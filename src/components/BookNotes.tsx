import { useEffect, useState } from 'react'

type BookNotesProps = {
  bookId: string
  value: string
  onSave: (note: string) => void
}

const BookNotes = ({ bookId, value, onSave }: BookNotesProps) => {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [bookId, value])

  const handleBlur = () => {
    if (draft !== value) {
      onSave(draft)
    }
  }

  return (
    <label className="bookNotes">
      <span className="bookNotesLabel">Notes</span>
      <textarea
        className="bookNotesInput"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleBlur}
        placeholder="Thoughts, quotes, where you left off…"
        rows={3}
      />
    </label>
  )
}

export default BookNotes
