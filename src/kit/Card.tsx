import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

/**
 * A white panel with a border and rounded corners — the standard container for
 * a block of content inside a screen.
 *
 * Not to be confused with the page-level `.card` class used by the prototype
 * hub's own pages; this one fills whatever width it is given.
 */
export function Card({ children, className }: CardProps) {
  return <div className={className ? `kit-card ${className}` : 'kit-card'}>{children}</div>
}
