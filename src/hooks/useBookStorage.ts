import { useCallback, useState } from 'react'
import {
  addBookToList,
  loadNotes,
  loadRatings,
  loadSavedList,
  removeBookFromList,
  saveNote,
  saveRating,
  type SavedBook,
} from '../utils/bookStorage'

export function useBookStorage() {
  const [ratings, setRatings] = useState<Record<string, number>>(loadRatings)
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes)
  const [savedList, setSavedList] = useState<SavedBook[]>(loadSavedList)

  const rateBook = useCallback((bookId: string, rating: number) => {
    setRatings(saveRating(bookId, rating))
  }, [])

  const updateNote = useCallback((bookId: string, note: string) => {
    setNotes(saveNote(bookId, note))
  }, [])

  const addToList = useCallback((book: SavedBook) => {
    setSavedList(addBookToList(book))
  }, [])

  const removeFromList = useCallback((bookId: string) => {
    setSavedList(removeBookFromList(bookId))
    setNotes((prev) => {
      const next = { ...prev }
      delete next[bookId]
      return next
    })
  }, [])

  const isInList = useCallback(
    (bookId: string) => savedList.some((b) => b.id === bookId),
    [savedList],
  )

  return { ratings, notes, savedList, rateBook, updateNote, addToList, removeFromList, isInList }
}
