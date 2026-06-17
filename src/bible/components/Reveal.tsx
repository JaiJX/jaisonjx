import type { ReactNode } from 'react'
import { useReveal } from '../hooks'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /** animation direction */
  from?: 'up' | 'left' | 'right'
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: RevealProps) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal reveal--${from} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
