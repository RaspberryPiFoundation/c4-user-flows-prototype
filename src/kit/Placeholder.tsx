interface PlaceholderProps {
  /** What the real thing would be, e.g. "Project thumbnail". */
  label?: string
  /** Height in pixels. Defaults to a shallow block. */
  height?: number
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
