import { useCallback, useEffect, useState } from 'react'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

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

export default function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
        </div>
      </div>
    </div>
  )
}
