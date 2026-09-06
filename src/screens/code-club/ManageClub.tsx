import { Button } from '../../kit'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'code-club',
  existsToday: true,
  verified: true,
  note: 'The menu of everything a mentor can do with their club. A plain list of rows, which makes it an obvious candidate for a Code Classroom entry.',
}

export interface ManageClubItem {
  label: string
  /** Colour of the icon tile, purely decorative in grey-box. */
  tone: 'purple' | 'blue' | 'orange' | 'green' | 'pink' | 'yellow'
  onSelect: () => void
  /**
   * Mark an item that does not exist in the live product. A prototype adding
   * a row here is proposing something, and the notes should say so.
   */
  proposed?: boolean
}

interface Props {
  clubName: string
  items: ManageClubItem[]
  onBack: () => void
}

/**
 * "Manage Club" — the menu behind the dashboard's Manage club button.
 *
 * Six rows today, all club administration. Its shape is why it keeps coming up
 * in onboarding discussions: adding a seventh row is the cheapest possible way
 * to put Code Classroom in front of a mentor. Whether cheapest is best is
 * exactly what a variant should test — a row here is buried two clicks deep
 * and sits among volunteer lists and profile editing, not teaching.
 *
 * `items` is a prop with no default, so a prototype has to state what the menu
 * contains rather than inherit an assumption.
 */
export function ManageClub({ clubName, items, onBack }: Props) {
  return (
    <div className="cc-manage">
      <div className="cc-manage-head">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
        <strong>{clubName}</strong>
      </div>

      <div className="cc-manage-card">
        <h1 className="title-md">Manage Club</h1>
        <ul className="cc-manage-list">
          {items.map((item) => (
            <li key={item.label}>
              <button className="cc-manage-row" onClick={item.onSelect}>
                <span className={`cc-tile cc-tile-${item.tone}`} aria-hidden="true" />
                <span className="cc-manage-label">{item.label}</span>
                <span className="cc-manage-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * The six rows the live product has. Exported so a prototype can start from
 * reality and add to it, rather than retyping it and drifting.
 */
export function liveManageClubItems(onSelect: (label: string) => void): ManageClubItem[] {
  return [
    { label: 'Events', tone: 'purple', onSelect: () => onSelect('Events') },
    { label: 'Volunteers Lists', tone: 'blue', onSelect: () => onSelect('Volunteers Lists') },
    { label: 'Pending volunteers', tone: 'orange', onSelect: () => onSelect('Pending volunteers') },
    { label: 'Subscriber Lists', tone: 'green', onSelect: () => onSelect('Subscriber Lists') },
    { label: 'View Dojo Profile', tone: 'pink', onSelect: () => onSelect('View Dojo Profile') },
    { label: 'Edit Dojo Profile', tone: 'yellow', onSelect: () => onSelect('Edit Dojo Profile') },
  ]
}
