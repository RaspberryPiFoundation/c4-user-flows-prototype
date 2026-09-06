import { Card, Tag } from '../../kit'
import type { ClassGroup, Project } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: "A young person's view of a class. Every project here was set up by the mentor — there is no way to start one of your own.",
}

/** Where a young person's work on a project has got to. */
export type WorkStatus = 'ready-for-you' | 'sent-for-feedback' | 'complete'

const STATUS_LABEL: Record<WorkStatus, string> = {
  'ready-for-you': 'Ready for you',
  'sent-for-feedback': 'Sent for feedback',
  complete: 'Complete',
}

const STATUS_VARIANT: Record<WorkStatus, 'default' | 'information' | 'success'> = {
  'ready-for-you': 'default',
  'sent-for-feedback': 'information',
  complete: 'success',
}

interface Props {
  classGroup: ClassGroup
  projects: Array<{ project: Project; status: WorkStatus }>
  onOpenProject: (projectId: string) => void
}

/**
 * The class page a young person sees, with where their work has got to.
 *
 * The gap this makes obvious: every project in the list was created by an
 * adult. There is no "start something of your own" here — which is exactly
 * the question the Code Classroom FigJam is asking, and exactly what a Code
 * Club session is often about.
 */
export function YoungPersonClassPage({ classGroup, projects, onOpenProject }: Props) {
  return (
    <div className="section-stack">
      <h1 className="title-lg">{classGroup.name}</h1>

      <Card>
        <h2 className="title-sm">Projects</h2>
        <p className="body muted">
          Projects are shared with students and contain starter code created by a teacher.
        </p>

        {projects.length === 0 ? (
          <p className="lane-empty">No projects yet</p>
        ) : (
          <ul className="cc-list">
            {projects.map(({ project, status }) => (
              <li className="cc-row" key={project.id}>
                <button className="link-button" onClick={() => onOpenProject(project.id)}>
                  {project.title}
                </button>
                <Tag text={STATUS_LABEL[status]} variant={STATUS_VARIANT[status]} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
