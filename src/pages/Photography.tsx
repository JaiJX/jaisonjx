import { useCallback, useEffect, useState } from 'react'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'
import {
  likesEnabled,
  fetchLikeCounts,
  incrementLike,
  decrementLike,
} from '../lib/likes'

type Photo = { src: string; name: string }

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '')
const baseName = (path: string) => path.split('/').pop() ?? path

// Every image dropped into src/assets/photos/ is bundled automatically.
const imported = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const photos: Photo[] = Object.entries(imported)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, name: baseName(path) }))

const LIKED_KEY = 'jjx-liked-photos'

function loadLiked(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKED_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function persistLiked(set: Set<string>) {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify([...set]))
  } catch {
    /* ignore storage failures (private mode, etc.) */
  }
}

function LikeButton({
  count,
  liked,
  onClick,
  className,
}: {
  count: number
  liked: boolean
  onClick: (e: React.MouseEvent) => void
  className: string
}) {
  return (
    <button
      type="button"
      className={`like-btn ${className}${liked ? ' liked' : ''}`}
      onClick={onClick}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike photo' : 'Like photo'}
    >
      <span className="heart">{liked ? '♥' : '♡'}</span>
      <span className="like-count">{count}</span>
    </button>
  )
}

export default function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<Set<string>>(loadLiked)

  useEffect(() => {
    if (!likesEnabled) return
    let active = true
    fetchLikeCounts()
      .then((data) => {
        if (active) setCounts(data)
      })
      .catch(() => {
        /* leave counts at 0 if the API is unreachable */
      })
    return () => {
      active = false
    }
  }, [])

  const toggleLike = useCallback(
    (id: string) => {
      const wasLiked = liked.has(id)

      setLiked((prev) => {
        const next = new Set(prev)
        if (wasLiked) next.delete(id)
        else next.add(id)
        persistLiked(next)
        return next
      })
      setCounts((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] ?? 0) + (wasLiked ? -1 : 1), 0),
      }))

      const request = wasLiked ? decrementLike(id) : incrementLike(id)
      request
        .then((serverCount) => {
          setCounts((prev) => ({ ...prev, [id]: serverCount }))
        })
        .catch(() => {
          // Revert the optimistic update on failure.
          setLiked((prev) => {
            const next = new Set(prev)
            if (wasLiked) next.add(id)
            else next.delete(id)
            persistLiked(next)
            return next
          })
          setCounts((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] ?? 0) + (wasLiked ? 1 : -1), 0),
          }))
        })
    },
    [liked],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [],
  )
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [],
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, closeLightbox, showNext, showPrev])

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null

  return (
    <div className="pf-wrap page-scroll">
      <Background />
      <Nav />

      <div className="page-content">
        <div className="page-header fade-in">
          <div className="pf-tag">Through the lens</div>
          <h1 className="pf-name">Photo<span>graphy</span></h1>
          <p className="pf-bio" style={{ maxWidth: 480, marginTop: 8 }}>
            A collection of moments I've captured. Click any photo to view it full size.
          </p>
        </div>

        <div className="photo-grid fade-in-delay">
          {photos.length === 0 ? (
            <div className="gallery-empty">
              <p>No photos to show yet — check back soon.</p>
            </div>
          ) : (
            photos.map((photo, index) => (
              <div className="photo-item" key={photo.name} onClick={() => setLightboxIndex(index)}>
                <img src={photo.src} alt={stripExt(photo.name)} loading="lazy" />
                <div className="photo-overlay">
                  <span className="photo-name">{stripExt(photo.name)}</span>
                </div>
                {likesEnabled && (
                  <LikeButton
                    className="photo-like"
                    count={counts[photo.name] ?? 0}
                    liked={liked.has(photo.name)}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(photo.name)
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={'lightbox' + (current ? ' open' : '')}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox()
        }}
      >
        <button className="lb-close" type="button" onClick={closeLightbox}>✕</button>
        <button className="lb-prev" type="button" onClick={showPrev}>‹</button>
        <button className="lb-next" type="button" onClick={showNext}>›</button>
        <div className="lb-img-wrap">
          {current && <img className="lb-img" src={current.src} alt={current.name} />}
          <div className="lb-caption">{current ? stripExt(current.name) : ''}</div>
          {likesEnabled && current && (
            <LikeButton
              className="lb-like"
              count={counts[current.name] ?? 0}
              liked={liked.has(current.name)}
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(current.name)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
