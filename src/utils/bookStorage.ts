export interface SavedBook {
  id: string
  title: string
  authors?: string[]
  thumbnail?: string
}

const RATINGS_KEY = 'bookTracker_ratings'
const LIST_KEY = 'bookTracker_list'
const NOTES_KEY = 'bookTracker_notes'

function readJson<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => value is T,
): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (validate && !validate(parsed)) {
      console.warn(`Discarding malformed localStorage value for "${key}"`)
      return fallback
    }
    return parsed as T
  } catch {
    return fallback
  }
}

const isString = (v: unknown): v is string => typeof v === 'string'
const isNumber = (v: unknown): v is number => typeof v === 'number'

function isRecordOf<V>(
  value: unknown,
  isValue: (v: unknown) => v is V,
): value is Record<string, V> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(isValue)
  )
}

function isSavedBook(v: unknown): v is SavedBook {
  if (typeof v !== 'object' || v === null) return false
  const b = v as Record<string, unknown>
  return (
    typeof b.id === 'string' &&
    typeof b.title === 'string' &&
    (b.authors === undefined || (Array.isArray(b.authors) && b.authors.every(isString))) &&
    (b.thumbnail === undefined || typeof b.thumbnail === 'string')
  )
}

const isSavedBookArray = (v: unknown): v is SavedBook[] =>
  Array.isArray(v) && v.every(isSavedBook)

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
  return readJson<Record<string, number>>(RATINGS_KEY, {}, (v): v is Record<string, number> =>
    isRecordOf(v, isNumber),
  )
}

export function saveRating(bookId: string, rating: number): Record<string, number> {
  const ratings = loadRatings()
  ratings[bookId] = rating
  writeJson(RATINGS_KEY, ratings)
  return ratings
}

export function loadSavedList(): SavedBook[] {
  return readJson<SavedBook[]>(LIST_KEY, [], isSavedBookArray)
}

export function addBookToList(book: SavedBook): SavedBook[] {
  const list = loadSavedList()
  if (list.some((b) => b.id === book.id)) return list
  const next = [...list, book]
  writeJson(LIST_KEY, next)
  return next
}

export function loadNotes(): Record<string, string> {
  return readJson<Record<string, string>>(NOTES_KEY, {}, (v): v is Record<string, string> =>
    isRecordOf(v, isString),
  )
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
