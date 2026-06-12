import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

import { cn } from '@/lib/utils'

type Direction = 'up' | 'left' | 'right' | 'scale'

const directionClass: Record<Direction, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

/**
 * Scroll-triggered reveal. Children start hidden (see `.reveal` in index.css)
 * and animate in once they enter the viewport. `delay` staggers siblings.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  as?: 'div' | 'section' | 'article' | 'span' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      // @ts-expect-error — ref type narrows per tag; all are HTMLElements
      ref={ref}
      className={cn('reveal', directionClass[direction], className)}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
