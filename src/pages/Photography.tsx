import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import Reveal from '@/components/Reveal.tsx'
import { cn } from '@/lib/utils'

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

export default function Photography() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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

  const lightboxNavButton =
    'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/15 bg-white/5 text-white/70 transition-colors duration-200 clip-corner-sm hover:bg-primary/60 hover:text-white'

  return (
    <PageShell>
      <PageHeader
        kicker="04 // Through the lens"
        title="Photo"
        accent="graphy"
        sub="A collection of moments I've captured. Click any photo to view it full size."
      />

      <div className="columns-[220px] gap-3.5 md:columns-[260px]">
        {photos.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground [column-span:all]">
            No photos to show yet — check back soon.
          </div>
        ) : (
          photos.map((photo, index) => (
            <Reveal key={photo.id} delay={(index % 4) * 0.07} className="mb-3.5 break-inside-avoid">
              <div
                className="group relative cursor-pointer overflow-hidden border border-border bg-primary/5 clip-corner-sm"
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
                  <video
                    className="block w-full transition-transform duration-500 group-hover:scale-105"
                    src={photo.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    className="block w-full transition-transform duration-500 group-hover:scale-105"
                    src={photo.src}
                    alt={stripExt(photo.name)}
                    loading="lazy"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                    {stripExt(photo.name)}
                  </span>
                </div>
              </div>
            </Reveal>
          ))
        )}
      </div>

      {/* Lightbox */}
      <div
        className={cn(
          'fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(10,4,0,0.93)] transition-opacity duration-300',
          current ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox()
        }}
      >
        <button
          className="absolute top-5 right-6 z-10 flex size-10 cursor-pointer items-center justify-center border-none bg-transparent text-white/70 transition-colors hover:text-primary"
          type="button"
          aria-label="Close"
          onClick={closeLightbox}
        >
          <X className="size-6" />
        </button>
        <button
          className={cn(lightboxNavButton, 'left-3 md:left-5')}
          type="button"
          aria-label="Previous photo"
          onClick={showPrev}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          className={cn(lightboxNavButton, 'right-3 md:right-5')}
          type="button"
          aria-label="Next photo"
          onClick={showNext}
        >
          <ChevronRight className="size-6" />
        </button>

        <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center">
          {current &&
            (current.kind === 'video' ? (
              <video
                className="max-h-[82vh] max-w-[90vw] object-contain"
                src={current.src}
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                className="max-h-[82vh] max-w-[90vw] object-contain"
                src={current.src}
                alt={current.name}
              />
            ))}
          <div className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            {current ? stripExt(current.name) : ''}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
