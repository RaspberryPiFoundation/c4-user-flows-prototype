import { useState } from 'react'

// SCAFFOLDING — safe to delete. Deliberately plain: it exists to prove the
// plumbing, not to show a flow.
export default function RoutingCheck() {
  const [count, setCount] = useState(0)
  const [explode, setExplode] = useState(false)

  // Proves the error boundary contains a crash instead of blanking the site.
  if (explode) throw new Error('Deliberate crash from the routing check demo.')

  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-md">Routing check</h1>
        <p className="body muted">
          This prototype was discovered automatically. No shared file lists it, and no shared file
          had to change for it to appear.
        </p>
      </div>

      <p className="body">
        Local state survives re-renders: <strong>{count}</strong>
      </p>
      <p>
        <button className="link-button" onClick={() => setCount((c) => c + 1)}>
          Add one
        </button>
      </p>

      <p>
        <button className="link-button" onClick={() => setExplode(true)}>
          Crash this prototype on purpose
        </button>
      </p>

      <p className="body muted">
        Delete <code>src/prototypes/onboarding-mentor/demo-routing-check/</code> once real
        prototypes exist.
      </p>
    </div>
  )
}
