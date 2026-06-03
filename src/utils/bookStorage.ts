export interface SavedBook {
  id: string
  title: string
  authors?: string[]
  thumbnail?: string
}

const RATINGS_KEY = 'bookTracker_ratings'
const LIST_KEY = 'bookTracker_list'
const NOTES_KEY = 'bookTracker_notes'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to write localStorage key "${key}":`, error)
    return false
  }
}

export function loadRatings(): Record<string, number> {
  return readJson<Record<string, number>>(RATINGS_KEY, {})
}

export function saveRating(bookId: string, rating: number): Record<string, number> {
  const ratings = loadRatings()
  ratings[bookId] = rating
  writeJson(RATINGS_KEY, ratings)
  return ratings
}

export function loadSavedList(): SavedBook[] {
  return readJson<SavedBook[]>(LIST_KEY, [])
}

export function addBookToList(book: SavedBook): SavedBook[] {
  const list = loadSavedList()
  if (list.some((b) => b.id === book.id)) return list
  const next = [...list, book]
  writeJson(LIST_KEY, next)
  return next
}

export function loadNotes(): Record<string, string> {
  return readJson<Record<string, string>>(NOTES_KEY, {})
}

export function saveNote(bookId: string, note: string): Record<string, string> {
  const notes = loadNotes()
  if (note.trim()) {
    notes[bookId] = note
  } else {
    delete notes[bookId]
  }
  writeJson(NOTES_KEY, notes)
  return notes
}

export function removeNote(bookId: string): Record<string, string> {
  const notes = loadNotes()
  delete notes[bookId]
  writeJson(NOTES_KEY, notes)
  return notes
}

export function removeBookFromList(bookId: string): SavedBook[] {
  const next = loadSavedList().filter((b) => b.id !== bookId)
  writeJson(LIST_KEY, next)
  removeNote(bookId)
  return next
}
