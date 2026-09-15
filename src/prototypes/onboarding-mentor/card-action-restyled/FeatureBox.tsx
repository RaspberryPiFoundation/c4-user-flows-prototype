import type { ReactNode } from 'react'

interface Props {
  /**
   * A Material Symbols ligature name, e.g. "checklist". The font renders the
   * text content as the glyph, so this IS the icon.
   */
  icon: string
  title: string
  children: ReactNode
}

/**
 * A pale green panel with an icon, a bold title and a line underneath — what
 * the three "what Code Classroom is" points are shown as, instead of bullets.
 *
 * Local to this prototype rather than added to kit/: the kit has no equivalent,
 * and the repo rule is that a prototype adds to its own folder. If a second
 * prototype wants one of these, copy it.
 *
 * Material Symbols Outlined is already loaded by the design system's
 * stylesheet — the same family Surface uses for its breadcrumb chevron and
 * safeguarding flag — so there is no font to add and no dependency to install.
 *
 * The icon is decorative and hidden from screen readers: the title next to it
 * says the same thing, and a reader announcing the ligature name would just
 * read "checklist" twice.
 */
export function FeatureBox({ icon, title, children }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-2)',
        rowGap: 'var(--space-05)',
        alignItems: 'center',
        background: 'var(--rpf-green-100)',
        border: '1px solid var(--rpf-green-400)',
        borderRadius: 'var(--radius-card)',
        padding: 'var(--space-3)',
      }}
    >
      <span
        aria-hidden="true"
        className="material-symbols-outlined"
        style={{ fontSize: 28, color: 'var(--rpf-green-900)' }}
      >
        {icon}
      </span>
      {/* Body size, bold — still an h3, so the heading structure survives
          it reading at the same scale as the line underneath. */}
      <h3 className="body" style={{ fontWeight: 'var(--fw-bold)' }}>
        {title}
      </h3>
      <p className="body" style={{ gridColumn: 2 }}>
        {children}
      </p>
    </div>
  )
}
