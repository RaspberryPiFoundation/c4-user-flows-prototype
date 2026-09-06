import type { ReactNode } from 'react'
import { IdentityBar } from './IdentityBar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="global-nav">
        <span className="brand">Raspberry Pi Foundation</span>
        <span className="env">Prototype — not a live product</span>
      </div>
      <IdentityBar />
      <main className="content">{children}</main>
      <footer className="footer">
        <span>© Raspberry Pi Foundation</span>
        <span>
          Internal prototype · <a href="#/kit">Component gallery</a> ·{' '}
          <a href="#/surfaces">Surfaces</a> · <a href="#/debug">Fixture data</a> ·{' '}
          <a href="https://github.com/RaspberryPiFoundation/c4-user-flows-prototype">
            View the repo on GitHub
          </a>
        </span>
      </footer>
    </div>
  )
}
