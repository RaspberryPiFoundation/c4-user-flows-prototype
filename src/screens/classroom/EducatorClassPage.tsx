import { Button, Card, Tag } from '../../kit'
import type { ClassGroup, Project } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'What a mentor sees inside a class. Projects are shared with the whole class; each carries starter code the mentor set up.',
}

interface Props {
  classGroup: ClassGroup
  projects: Project[]
  memberCount: number
  onAddProject: () => void
  onOpenProject: (projectId: string) => void
  onCopyLink: () => void
  onClassMembers: () => void
}

/**
 * The class page an educator lands on.
 *
 * Two things to notice for Code Club:
 *
 * - "Projects are shared with students and contain starter code created by a
 *   teacher" — projects here are set up BY the adult, not chosen by the young
 *   person. That is a different model from Code Club Projects, where a young
 *   person browses and picks.
 * - "Copy link" is how young people get in, which is the shareable route that
 *   skips the school code screen.
 */
export function EducatorClassPage({
  classGroup,
  projects,
  memberCount,
  onAddProject,
  onOpenProject,
  onCopyLink,
  onClassMembers,
}: Props) {
  return (
    <div className="section-stack">
      <h1 className="title-lg">{classGroup.name}</h1>

      <div className="cc-actions">
        <Button type="secondary" size="small" text={`Class members (${memberCount})`} onClick={onClassMembers} />
        <Button type="secondary" size="small" text="Copy link" onClick={onCopyLink} />
      </div>

      <Card>
        <div className="cc-section-head">
          <div>
            <h2 className="title-sm">Projects</h2>
            <p className="body muted">
              Projects are shared with students and contain starter code created by a teacher.
            </p>
          </div>
          <Button type="primary" size="small" text="Add project" onClick={onAddProject} />
        </div>

        {projects.length === 0 ? (
          <p className="lane-empty">No projects yet</p>
        ) : (
          <ul className="cc-list">
            {projects.map((project) => (
              <li className="cc-row" key={project.id}>
                <button className="link-button" onClick={() => onOpenProject(project.id)}>
                  {project.title}
                </button>
                <Tag text={project.language} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
