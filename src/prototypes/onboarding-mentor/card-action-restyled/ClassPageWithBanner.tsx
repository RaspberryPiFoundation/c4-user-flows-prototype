import type { ReactNode } from 'react'
import { Button, Card } from '../../../kit'
import type { ClassGroup, Project } from '../../../fixtures'

// A COPY of screens/classroom/EducatorClassPage, changed here rather than
// there.
//
// The shared screen renders its two bands — the white title block and the
// off-white content below it — as a fragment, with nothing between them and no
// prop to put anything there. Putting the "no members yet" alert where it
// belongs means opening that seam, and opening it in the shared screen would
// change the page for every other prototype using it. So it is copied in, per
// the repo rule.
//
// What is different from the shared screen:
//
// - A `banner` slot between the two bands.
//
// That is the whole change. Everything else is the shared screen as it stands,
// including the real page's furniture: "Class members" is the primary action,
// projects sit in a bordered list of pale rows, and a project name is bold body
// text rather than a link. Keep it that way — if the shared screen gains
// something, this copy should gain it too.

interface Props {
  classGroup: ClassGroup
  projects: Project[]
  memberCount: number
  /** The blurb under the class title. */
  description?: string
  /**
   * Rendered between the title band and the content, which is where a page-
   * level message belongs — after a mentor has read what page they are on, and
   * before the thing they would otherwise start doing.
   */
  banner?: ReactNode
  onAddProject: () => void
  onOpenProject: (projectId: string) => void
  onCopyLink: () => void
  onClassMembers: () => void
  /** Projects students cannot see yet. */
  hiddenProjectIds?: string[]
  /** The per-row overflow menu. Renders whether or not you wire it. */
  onProjectMenu?: (projectId: string) => void
  /** The gear beside "Copy link". Renders whether or not you wire it. */
  onSettings?: () => void
}

export function ClassPageWithBanner({
  classGroup,
  projects,
  memberCount,
  description,
  banner,
  onAddProject,
  onOpenProject,
  onCopyLink,
  onClassMembers,
  hiddenProjectIds = [],
  onProjectMenu,
  onSettings,
}: Props) {
  return (
    <>
      <div className="cc-page-header">
        <div className="cc-page-title">
          <h1 className="title-lg">{classGroup.name}</h1>
          {description && <p className="cc-page-desc">{description}</p>}
        </div>

        <div className="cc-actions">
          {/* Primary on the live page. Getting young people into the class is
              the job a mentor comes here to do. */}
          <Button
            type="primary"
            icon="group"
            text={`Class members (${memberCount})`}
            onClick={onClassMembers}
          />
          <Button type="secondary" icon="content_copy" text="Copy link" onClick={onCopyLink} />
          <Button
            type="secondary"
            icon="settings"
            iconOnly
            aria-label="Class settings"
            onClick={onSettings ?? (() => {})}
          />
        </div>
      </div>

      {/* Padded to the same gutter as both bands, so the alert lines up with
          the title above it and the Projects card below it. */}
      {banner && <div style={{ padding: '0 var(--space-3)' }}>{banner}</div>}

      <div className="cc-page-main">
        <Card>
          <div className="cc-section-head">
            <div>
              <h2 className="title-sm">Projects</h2>
              <p className="body muted">
                Projects are shared with students and contain starter code created by a teacher.
              </p>
            </div>
            <Button
              type="primary"
              icon="add"
              iconPosition="right"
              text="Add project"
              onClick={onAddProject}
            />
          </div>

          {projects.length === 0 ? (
            <p className="lane-empty">No projects yet</p>
          ) : (
            <ul className="cc-list cc-list-boxed">
              {projects.map((project) => {
                const hidden = hiddenProjectIds.includes(project.id)
                return (
                  <li className="cc-row" key={project.id}>
                    <span className="cc-row-main">
                      {hidden && (
                        // Labelled rather than aria-hidden: the icon is the only
                        // thing on the row carrying this, so it has to be read.
                        <span
                          className="material-symbols-sharp"
                          role="img"
                          aria-label="Hidden from students"
                        >
                          visibility_off
                        </span>
                      )}
                      <button className="cc-row-title" onClick={() => onOpenProject(project.id)}>
                        {project.title}
                      </button>
                    </span>
                    <Button
                      type="tertiary"
                      icon="more_vert"
                      iconOnly
                      aria-label={`More options for ${project.title}`}
                      onClick={() => onProjectMenu?.(project.id)}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
