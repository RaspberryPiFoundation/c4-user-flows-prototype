import { Button, Card } from '../../kit'
import type { ClassGroup, School } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'A mentor’s home in Code Classroom: the school, its login code, and the classes under it. The top of the tree — every mentor flow starts here.',
}

interface Props {
  school: School
  classes: ClassGroup[]
  /** The share link a mentor can hand out instead of the code. */
  joinLink: string
  onOpenClass: (classId: string) => void
  onCreateClass: () => void
  onManageMembers: () => void
  onCopyLink: () => void
  /** The gear beside "Manage members". Renders whether or not you wire it. */
  onSettings?: () => void
  /** The per-row overflow menu. Renders whether or not you wire it. */
  onClassMenu?: (classId: string) => void
  /** The back control above the title. Renders whether or not you wire it. */
  onHome?: () => void
}

/**
 * The school page a mentor lands on, built from the Code Editor Figma file
 * (node 6759:78797, "Dashboard Owner").
 *
 * This screen has existed in the product all along and was never in here — the
 * import prototypes each grew their own guess at it, both built by mirroring
 * the young person's version and both marked as probably wrong. This is the
 * checked one.
 *
 * Two things worth noticing for Code Club:
 *
 * - **The login code is the most prominent thing on the page after the title.**
 *   A mentor reads it out across a room, and the page is built around that.
 *   The share link beside it is the other route in, and it is the one that
 *   skips the school-code screen entirely.
 * - **"All the classes you manage and in your school"** — a mentor at a school
 *   that already uses Code Classroom sees classes they had nothing to do with,
 *   sitting beside their club. There is nothing on a row to tell one from the
 *   other.
 */
export function EducatorSchoolHome({
  school,
  classes,
  joinLink,
  onOpenClass,
  onCreateClass,
  onManageMembers,
  onCopyLink,
  onSettings,
  onClassMenu,
  onHome,
}: Props) {
  return (
    <>
      <div className="cc-page-header">
        {/* A back control, not a breadcrumb: the school is the top of the tree,
            so there is no trail to sit above it. */}
        <Button
          className="cc-back-button"
          type="tertiary"
          icon="arrow_back"
          text="Code Classroom home"
          onClick={onHome ?? (() => {})}
        />

        <div className="cc-page-titlebar">
          <div className="cc-page-title">
            {/* Code Classroom calls this a school even when it is a library.
                The mismatch is kept, not fixed — see screens/README.md. */}
            <h1 className="title-lg">{school.name}</h1>
          </div>
          <div className="cc-actions">
            <Button
              type="primary"
              icon="group"
              text="Manage members"
              onClick={onManageMembers}
            />
            <Button type="secondary" icon="settings" text="Settings" onClick={onSettings ?? (() => {})} />
          </div>
        </div>
      </div>

      <div className="cc-page-main">
        <div className="cc-split">
          <div className="cc-split-aside">
            <Card>
              <h2 className="title-sm">School login code</h2>
              <p className="cc-code-value">{school.schoolCode}</p>
              <p className="body">
                Student will need the school code to log in. Alternatively you can share the log in
                link with them.
              </p>
              <div className="cc-code-copy">
                {/* Readonly rather than plain text: it is a thing you copy, and
                    the live page lets you select it. */}
                <input
                  className="cc-code-link"
                  readOnly
                  value={joinLink}
                  aria-label="Log in link"
                />
                <Button
                  type="primary"
                  icon="content_copy"
                  iconOnly
                  aria-label="Copy log in link"
                  onClick={onCopyLink}
                />
              </div>
            </Card>
          </div>

          <div className="cc-split-main">
            <Card>
              <div className="cc-section-head">
                <div>
                  <h2 className="title-sm">Classes</h2>
                  <p className="body muted">
                    All the classes you manage and in your school. Classes are used to group
                    students and assign lessons to them.
                  </p>
                </div>
                <Button
                  type="primary"
                  icon="add"
                  iconPosition="right"
                  text="Create class"
                  onClick={onCreateClass}
                />
              </div>

              {classes.length === 0 ? (
                <p className="lane-empty">No classes yet</p>
              ) : (
                <ul className="cc-list cc-list-boxed">
                  {classes.map((group) => (
                    <li className="cc-row" key={group.id}>
                      <span className="cc-row-main">
                        <button className="cc-row-title" onClick={() => onOpenClass(group.id)}>
                          {group.name}
                        </button>
                      </span>
                      <Button
                        type="tertiary"
                        icon="more_vert"
                        iconOnly
                        aria-label={`More options for ${group.name}`}
                        onClick={() => onClassMenu?.(group.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
