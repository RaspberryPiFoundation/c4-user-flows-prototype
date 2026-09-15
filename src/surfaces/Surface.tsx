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
  /**
   * Breadcrumb trail. Code Classroom has no primary navigation at all — you
   * move around it entirely by breadcrumb, so this is how you say where you
   * are. The last item is the current page and is not a link.
   */
  breadcrumbs?: string[]
  /**
   * What happens when a crumb is clicked, by its index in `breadcrumbs`.
   *
   * Pass this and the earlier crumbs become working controls; leave it out and
   * they are plain text. Deliberately NOT optional-with-a-default-destination:
   * this is the only navigation Code Classroom has, so where a crumb goes is
   * the prototype's decision, the same as every other callback here. It used
   * to be a hardcoded link to the screens gallery, which took anyone who
   * clicked it out of the flow they were being tested on.
   */
  onCrumb?: (index: number) => void
  /** Right-hand top bar item: "Your Account" for an educator, "Log Out" for a young person. */
  account?: string
}

/**
 * Wraps a screen in its product's chrome, and scopes that product's design
 * tokens to it.
 *
 * Tokens are scoped per surface rather than set globally, so a Code Classroom
 * screen physically cannot pick up Code Club's colours by accident — and so a
 * flow that crosses products looks like it crosses products.
 */
export function Surface({
  id,
  children,
  nav,
  activeNav,
  badge,
  layout,
  breadcrumbs,
  onCrumb,
  account,
}: SurfaceProps) {
  const surface = SURFACES[id]
  const navItems = nav ?? surface.nav
  const effectiveLayout = layout ?? surface.layout

  const crumbs = breadcrumbs && breadcrumbs.length > 0 && (
    <nav className="surface-breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <span className="surface-crumb" key={crumb}>
          {index > 0 && (
            /* A chevron, not a slash — Code Classroom's breadcrumb in the Code
               Editor designs. Decorative: the list order already says it. */
            <span aria-hidden="true" className="material-symbols-sharp surface-crumb-sep">
              chevron_right
            </span>
          )}
          {index === breadcrumbs.length - 1 ? (
            <span aria-current="page">{crumb}</span>
          ) : onCrumb ? (
            <button className="link-button" onClick={() => onCrumb(index)}>
              {crumb}
            </button>
          ) : (
            <span>{crumb}</span>
          )}
        </span>
      ))}
    </nav>
  )

  return (
    <div className={`surface surface-${id}`}>
      <div className="surface-topbar">
        <span className="surface-brand">Raspberry Pi Foundation</span>
        <span className="surface-product">
          {surface.name}
          {badge && <span className="surface-badge">{badge}</span>}
        </span>
        {account && (
          <span className="surface-account">
            English (US) · {account}
          </span>
        )}
      </div>

      {crumbs}

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
        {surface.safeguardingFooter ? (
          <>
            <div className="surface-footer-row">
              <span className="surface-footer-concern">
                <span aria-hidden="true" className="material-symbols-sharp">
                  flag
                </span>
                Do you have a safeguarding concern? <strong>Contact us</strong>
              </span>
              <span className="surface-footer-links">
                <span>Help</span>
                <span>Terms &amp; Conditions</span>
                <span>Safeguarding</span>
                <span>Accessibility</span>
                <span>Privacy</span>
                <span>Cookies</span>
              </span>
            </div>
            <span>Raspberry Pi Foundation UK registered charity 1129409</span>
          </>
        ) : (
          <div className="surface-footer-row">
            <span>Raspberry Pi Foundation UK registered charity 1129409</span>
            <span className="surface-footer-links">
              <span>Help</span>
              <span>Terms &amp; Conditions</span>
              <span>Safeguarding</span>
              <span>Privacy</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
