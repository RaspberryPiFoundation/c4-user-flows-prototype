import type { ReactNode } from 'react'
import { IdentityBar } from './IdentityBar'

/**
 * Chrome for the prototype hub itself.
 *
 * Deliberately NOT Raspberry Pi branded. Prototypes render their own product
 * chrome inside this, and when both were black bars saying "Raspberry Pi
 * Foundation" it was impossible to tell which one belonged to the thing being
 * tested. This is scaffolding and should look like scaffolding.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="tool-bar">
        <span className="tool-bar-label">Prototype workbench</span>
        <span className="tool-bar-note">Nothing here is a real product</span>
      </div>
      <IdentityBar />
      <main className="content">{children}</main>
      <footer className="footer">
        <span>
          <a href="#/">All prototypes</a> · <a href="#/screens">Screens</a> ·{' '}
          <a href="#/kit">Components</a> · <a href="#/surfaces">Surfaces</a> ·{' '}
          <a href="#/debug">Fixture data</a>
        </span>
        <span>
          <a href="https://github.com/RaspberryPiFoundation/c4-user-flows-prototype">
            View the repo on GitHub
          </a>
        </span>
      </footer>
    </div>
  )
}
