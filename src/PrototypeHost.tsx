import { Suspense, lazy, useCallback, useEffect, useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Accordion, Tag } from './kit'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NotFound } from './components/NotFound'
import { findPrototype } from './prototypes/registry'
import { useSession } from './session'

/**
 * Full screen hides the workbench chrome so only the prototype is left. Use it
 * in a testing session: nobody being tested should be looking at a dropdown of
 * fake people or a bar saying "prototype workbench".
 *
 * It lives in the URL (`?full=1`) so you can send someone a link that opens
 * clean, rather than talking them through switching it on.
 *
 * Implemented as a class on <body> because the chrome being hidden is rendered
 * by Layout, above this component. The effect below removes it on unmount, so
 * leaving a prototype can never strand the rest of the site without chrome.
 */
function useFullScreen(): [boolean, (on: boolean) => void] {
  const [params, setParams] = useSearchParams()
  const isFull = params.get('full') === '1'

  const setFull = useCallback(
    (on: boolean) => {
      const next = new URLSearchParams(params)
      if (on) next.set('full', '1')
      else next.delete('full')
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  useEffect(() => {
    document.body.classList.toggle('full-screen-prototype', isFull)
    return () => document.body.classList.remove('full-screen-prototype')
  }, [isFull])

  useEffect(() => {
    if (!isFull) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFull(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isFull, setFull])

  return [isFull, setFull]
}

/**
 * Renders one prototype, found by its lane and slug in the URL. The prototype
 * itself owns everything below the banner — its own screens, steps and state.
 */
export function PrototypeHost() {
  const { lane = '', slug = '' } = useParams()
  const prototype = findPrototype(lane, slug)
  const [isFull, setFull] = useFullScreen()
  const { applyCast } = useSession()

  // Put this prototype's cast in place whenever it loads, so a flow always
  // starts from the state its author wrote it for.
  const cast = prototype?.meta.cast
  const ownsSignIn = prototype?.meta.ownsSignIn ?? false
  useEffect(() => {
    applyCast(cast, ownsSignIn)
  }, [applyCast, cast, ownsSignIn])

  // `lazy` must not be recreated on every render, or React remounts the
  // prototype and throws away whatever state the person was part-way through.
  const Prototype = useMemo(() => (prototype ? lazy(prototype.load) : null), [prototype])

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
        <button className="link-button prototype-full-toggle" onClick={() => setFull(true)}>
          Full screen
        </button>
      </div>

      <ErrorBoundary label={label}>
        <Suspense fallback={<div className="card">Loading…</div>}>
          <Prototype />
        </Suspense>
      </ErrorBoundary>

      {isFull && (
        <button className="prototype-exit-full" onClick={() => setFull(false)}>
          Exit full screen <span aria-hidden="true">(Esc)</span>
        </button>
      )}

      <div className="prototype-notes">
        <Accordion
          id={`notes-${lane}-${slug}`}
          className=""
          title="Why this, and what to watch for"
          content={
            <div className="prototype-notes-body">
              <p className="body muted">
                <strong>{prototype.meta.owner}</strong> · {prototype.meta.hypothesis}
              </p>
              {prototype.notes ? (
                <pre className="prototype-notes-text">{prototype.notes}</pre>
              ) : (
                <p className="body muted">
                  No notes.md yet. A prototype without notes is a screenshot.
                </p>
              )}
            </div>
          }
        />
      </div>
    </div>
  )
}
