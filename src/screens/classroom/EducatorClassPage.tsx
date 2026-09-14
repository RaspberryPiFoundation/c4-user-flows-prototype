import { Button, Card } from '../../kit'
import type { ClassGroup, Project } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'What a mentor sees inside a class. Projects are shared with the whole class; each carries starter code the mentor set up, and each is hidden or shown to students individually.',
}

interface Props {
  classGroup: ClassGroup
  projects: Project[]
  memberCount: number
  onAddProject: () => void
  onOpenProject: (projectId: string) => void
  onCopyLink: () => void
  onClassMembers: () => void
  /**
   * Projects students cannot see yet. The live page marks each row with a
   * crossed-out eye, so a mentor can tell at a glance what is not live — pass
   * this if your flow has a notion of visibility, and leave it out if not.
   */
  hiddenProjectIds?: string[]
  /** The per-row overflow menu. Renders whether or not you wire it. */
  onProjectMenu?: (projectId: string) => void
  /** The gear beside "Copy link". Renders whether or not you wire it. */
  onSettings?: () => void
}

/**
 * The class page an educator lands on.
 *
 * Built from the live page, so the furniture is the real furniture: "Class
 * members" is the primary action, projects sit in a bordered list of pale rows
 * with an overflow menu each, and a project name is bold body text rather than
 * a link.
 *
 * Three things to notice for Code Club:
 *
 * - "Projects are shared with students and contain starter code created by a
 *   teacher" — projects here are set up BY the adult, not chosen by the young
 *   person. That is a different model from Code Club Projects, where a young
 *   person browses and picks.
 * - "Copy link" is how young people get in, which is the shareable route that
 *   skips the school code screen.
 * - **Visibility is per project and shown right here.** The crossed-out eye is
 *   how a mentor tells a project nobody can see yet from one that is live. Any
 *   flow that adds a project to a class inherits that state whether it means
 *   to or not.
 */
export function EducatorClassPage({
  classGroup,
  projects,
  memberCount,
  onAddProject,
  onOpenProject,
  onCopyLink,
  onClassMembers,
  hiddenProjectIds = [],
  onProjectMenu,
  onSettings,
}: Props) {
  return (
    <div className="section-stack">
      <h1 className="title-lg">{classGroup.name}</h1>

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
  )
}
