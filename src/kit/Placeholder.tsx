interface PlaceholderProps {
  /** What the real thing would be, e.g. "Project thumbnail". */
  label?: string
  /**
   * Height. A number is pixels; a string is any CSS length, so '100%'
   * stands in for something that fills whatever it is given — a code editor,
   * say. Defaults to a shallow block.
   */
  height?: number | string
  /** Stretch to fill the available width. Defaults to true. */
  fullWidth?: boolean
}

/**
 * A grey box standing in for content we have deliberately not designed —
 * imagery, thumbnails, avatars, charts.
 *
 * Base screens are grey-box on purpose: it keeps testing sessions focused on
 * the flow rather than on visual detail that has not been reviewed. Label it
 * with what the real thing would be, so nobody has to guess.
 */
export function Placeholder({ label, height = 80, fullWidth = true }: PlaceholderProps) {
  return (
    <div
      className="placeholder"
      style={{ height, width: fullWidth ? '100%' : undefined }}
      role="img"
      aria-label={label ? `Placeholder: ${label}` : 'Placeholder'}
    >
      {label && <span>{label}</span>}
    </div>
  )
}
