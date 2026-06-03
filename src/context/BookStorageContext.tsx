import { createContext, useContext, type ReactNode } from 'react'
import { useBookStorage } from '../hooks/useBookStorage'

type BookStorageContextValue = ReturnType<typeof useBookStorage>

const BookStorageContext = createContext<BookStorageContextValue | null>(null)

export function BookStorageProvider({ children }: { children: ReactNode }) {
  const value = useBookStorage()
  return (
    <BookStorageContext.Provider value={value}>{children}</BookStorageContext.Provider>
  )
}

export function useBookStorageContext() {
  const ctx = useContext(BookStorageContext)
  if (!ctx) {
    throw new Error('useBookStorageContext must be used within BookStorageProvider')
  }
  return ctx
}
