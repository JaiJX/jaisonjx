import { useCallback, useEffect, useState } from 'react'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'
import {
  likesEnabled,
  fetchLikeCounts,
  incrementLike,
  decrementLike,
} from '../lib/likes.ts'

type Kind = 'image' | 'video'
type Photo = { id: string; src: string; name: string; kind: Kind }

const CLOUD = 'dfsto9h0v'
// Tag every asset you want in the gallery with this in Cloudinary, and it shows
// up here automatically — no code change, images and videos alike.
const GALLERY_TAG = 'portfolio'

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '')

// Cloudinary appends a random 6-char suffix (e.g. Macarons_tzupkx). Strip it for
// a clean caption; names without a suffix (use_filename uploads) are left as-is.
const displayName = (publicId: string) =>
  (publicId.split('/').pop() ?? publicId).replace(/_[a-z0-9]{6}$/i, '')

type CldResource = { public_id: string; version: number; format: string }

// Fetch the public list of assets carrying GALLERY_TAG for a given media kind.
// Requires "Resource list" delivery to be enabled in Cloudinary settings.
async function fetchList(kind: Kind): Promise<Photo[]> {
  const res = await fetch(
    `https://res.cloudinary.com/${CLOUD}/${kind}/list/${GALLERY_TAG}.json`,
  )
  if (!res.ok) return []
  const data = (await res.json()) as { resources?: CldResource[] }
  return (data.resources ?? []).map((r) => ({
    id: r.public_id,
    kind,
    name: displayName(r.public_id),
    // f_auto picks the best format (WebP/AVIF for images, mp4/webm for video),
    // q_auto picks the best quality/compression. Looks the same, far smaller.
    src: `https://res.cloudinary.com/${CLOUD}/${kind}/upload/f_auto,q_auto/v${r.version}/${r.public_id}.${r.format}`,
  }))
}

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
  const [photos, setPhotos] = useState<Photo[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<Set<string>>(loadLiked)

  // Discover gallery assets (images + videos) from Cloudinary on mount.
  useEffect(() => {
    let active = true
    Promise.all([fetchList('image'), fetchList('video')])
      .then(([images, videos]) => {
        if (!active) return
        const all = [...images, ...videos].sort((a, b) => a.name.localeCompare(b.name))
        setPhotos(all)
      })
      .catch((err) => {
        console.error('[gallery] failed to load assets from Cloudinary', err)
      })
    return () => {
      active = false
    }
  }, [])

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
        .catch((err: unknown) => {
          console.error('[likes]', err)
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
    [photos.length],
  )
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
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
              <div
                className="photo-item"
                key={photo.id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${stripExt(photo.name)}`}
                onClick={() => setLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxIndex(index)
                  }
                }}
              >
                {photo.kind === 'video' ? (
                  <video src={photo.src} muted loop playsInline preload="metadata" />
                ) : (
                  <img src={photo.src} alt={stripExt(photo.name)} loading="lazy" />
                )}
                <div className="photo-overlay">
                  <span className="photo-name">{stripExt(photo.name)}</span>
                </div>
                {likesEnabled && (
                  <LikeButton
                    className="photo-like"
                    count={counts[photo.id] ?? 0}
                    liked={liked.has(photo.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(photo.id)
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
          {current &&
            (current.kind === 'video' ? (
              <video className="lb-img" src={current.src} controls autoPlay loop playsInline />
            ) : (
              <img className="lb-img" src={current.src} alt={current.name} />
            ))}
          <div className="lb-caption">{current ? stripExt(current.name) : ''}</div>
          {likesEnabled && current && (
            <LikeButton
              className="lb-like"
              count={counts[current.id] ?? 0}
              liked={liked.has(current.id)}
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(current.id)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
