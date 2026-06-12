import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Search } from 'lucide-react'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import Reveal from '@/components/Reveal.tsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useBookSearch } from '@/hooks/useBookSearch'

/** Embedded Book Finder demo rendered inline on the Projects page. */
function BookTracker() {
  const [query, setQuery] = useState('')
  const { books, error, loading } = useBookSearch(query)

  return (
    <div className="w-full">
      <div className="relative mb-5 max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/60"
          aria-hidden
        />
        <Input
          id="project-search"
          type="text"
          placeholder="Search for a book..."
          aria-label="Search for a book"
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <p className="py-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          <span className="blink mr-2 inline-block size-1.5 bg-primary" aria-hidden />
          Searching...
        </p>
      )}
      {!loading && error && (
        <p className="py-3 font-mono text-xs tracking-wide text-destructive">{error}</p>
      )}
      {!loading && !error && books.length === 0 && query.trim() === '' && (
        <p className="py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
          Type a title, author, or topic to get started.
        </p>
      )}

      <div className="grid max-h-[420px] grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3.5 overflow-y-auto pr-1">
        {books.map((book) => (
          <article
            key={book.id}
            className="flex flex-col gap-2 border border-border bg-card/80 p-2.5 transition-transform duration-200 clip-corner-sm hover:-translate-y-1"
          >
            {book.volumeInfo.imageLinks?.thumbnail ? (
              <img
                className="block aspect-[2/3] w-full object-cover"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-primary/5 text-primary/50">
                <BookOpen className="size-7" aria-hidden />
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <p className="line-clamp-2 text-[11px] leading-snug font-medium text-ink">
                {book.volumeInfo.title}
              </p>
              <p className="line-clamp-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                {book.volumeInfo.authors?.join(', ') ?? 'Unknown Author'}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const tags = ['React', 'TypeScript', 'Google Books API', 'Vite']

/** Portfolio Projects page showcasing built work with a live Book Finder demo. */
export default function Projects() {
  return (
    <PageShell>
      <PageHeader
        kicker="05 // My work"
        title="Projects"
        sub="Things I have built while learning and exploring."
      />

      <Reveal>
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-5">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                P-001
              </p>
              <h2 className="display text-2xl text-ink md:text-3xl">Book Finder</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft/85">
                A React app that lets you search millions of books via the
                Google Books API. Built as part of my React learning journey to
                practice hooks, async data fetching, and component composition.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link to="/projects/book-tracker">
                  Open full app <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <span
              className="hidden size-14 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm sm:flex"
              aria-hidden
            >
              <BookOpen className="size-7" />
            </span>
          </CardHeader>

          <CardContent>
            <Separator className="mb-5" />
            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
              <span className="blink mr-2 inline-block size-1.5 bg-primary" aria-hidden />
              Live demo
            </p>
            <BookTracker />
          </CardContent>
        </Card>
      </Reveal>
    </PageShell>
  )
}
