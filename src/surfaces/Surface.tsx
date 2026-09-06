import type { ReactNode } from 'react'
import { SURFACES, type SurfaceId } from './surfaces'

interface SurfaceProps {
  /** Which product this screen belongs to. */
  id: SurfaceId
  children: ReactNode
  /** Override the default navigation for this particular screen. */
  nav?: string[]
  /** Which nav item is the current page. */
  activeNav?: string
  /**
   * Branding shown alongside the product name — the Code Classroom student
   * login is a Pi Accounts page badged "Code Classroom", and pretending
   * otherwise would hide a real handoff.
   */
  badge?: string
  /**
   * Override the surface's default layout. Code Classroom's sign-in is a
   * centred card on a coloured page even though the signed-in app is not.
   */
  layout?: 'app' | 'centred'
}

/**
 * Wraps a screen in its product's chrome, and scopes that product's design
 * tokens to it.
 *
 * Tokens are scoped per surface rather than set globally, so a Code Classroom
 * screen physically cannot pick up Code Club's colours by accident — and so a
 * flow that crosses products looks like it crosses products.
 */
export function Surface({ id, children, nav, activeNav, badge, layout }: SurfaceProps) {
  const surface = SURFACES[id]
  const navItems = nav ?? surface.nav
  const effectiveLayout = layout ?? surface.layout

  return (
    <div className={`surface surface-${id}`}>
      <div className="surface-topbar">
        <span className="surface-brand">Raspberry Pi Foundation</span>
        <span className="surface-product">
          {surface.name}
          {badge && <span className="surface-badge">{badge}</span>}
        </span>
      </div>

      {effectiveLayout !== 'centred' && navItems.length > 0 && (
        <nav className="surface-nav" aria-label={`${surface.name} navigation`}>
          {navItems.map((item) => (
            <span
              key={item}
              className={item === activeNav ? 'surface-nav-item active' : 'surface-nav-item'}
            >
              {item}
            </span>
          ))}
        </nav>
      )}

      <div className={effectiveLayout === 'centred' ? 'surface-body centred' : 'surface-body'}>
        {children}
      </div>

      <div className="surface-footer">
        <span>Raspberry Pi Foundation UK registered charity 1129409</span>
        <span>Help · Terms &amp; Conditions · Safeguarding · Privacy</span>
      </div>
    </div>
  )
}
