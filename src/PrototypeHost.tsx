import { Suspense, lazy, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NotFound } from './components/NotFound'
import { Tag } from './kit'
import { findPrototype } from './prototypes/registry'

/**
 * Renders one prototype, found by its lane and slug in the URL. The prototype
 * itself owns everything below the banner — its own screens, steps and state.
 */
export function PrototypeHost() {
  const { lane = '', slug = '' } = useParams()
  const prototype = findPrototype(lane, slug)

  // `lazy` must not be recreated on every render, or React remounts the
  // prototype and throws away whatever state the person was part-way through.
  const Prototype = useMemo(
    () => (prototype ? lazy(prototype.load) : null),
    [prototype],
  )

  if (!prototype || !Prototype) {
    return <NotFound detail={`There is no prototype at ${lane}/${slug}.`} />
  }

  const label = `${lane}/${slug}`

  return (
    <div className="prototype-frame">
      <div className="prototype-banner">
        <Link to="/">← All prototypes</Link>
        <span className="prototype-banner-title">{prototype.meta.title}</span>
        <Tag text={prototype.meta.status.replace(/-/g, ' ')} />
      </div>
      <ErrorBoundary label={label}>
        <Suspense fallback={<div className="card">Loading…</div>}>
          <Prototype />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
