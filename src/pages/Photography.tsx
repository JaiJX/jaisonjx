import { useCallback, useEffect, useRef, useState } from 'react'
import Background from '../components/Background.tsx'
import Nav from '../components/Nav.tsx'

type Photo = { src: string; name: string }

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '')

export default function Photography() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result
        if (typeof src === 'string') {
          setPhotos((prev) => [...prev, { src, name: file.name }])
        }
      }
      reader.readAsDataURL(file)
    })
  }, [])

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

        <div
          className={'upload-zone fade-in-delay' + (dragOver ? ' drag-over' : '')}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="upload-inner">
            <div className="upload-icon">📷</div>
            <p className="upload-title">
              Drop photos here or{' '}
              <span className="upload-link" onClick={() => fileInputRef.current?.click()}>
                browse
              </span>
            </p>
            <p className="upload-sub">JPG, PNG, WEBP — your photos appear instantly below</p>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="filter-bar fade-in-delay">
            <button className="filter-btn active" type="button">All</button>
          </div>
        )}

        <div className="photo-grid">
          {photos.length === 0 ? (
            <div className="gallery-empty">
              <p>Your photos will appear here once you upload them above.</p>
            </div>
          ) : (
            photos.map((photo, index) => (
              <div className="photo-item" key={index} onClick={() => setLightboxIndex(index)}>
                <img src={photo.src} alt={photo.name} loading="lazy" />
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
