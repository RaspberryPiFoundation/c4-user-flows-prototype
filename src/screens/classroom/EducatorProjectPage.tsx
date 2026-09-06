import { Button, Card, Tag } from '../../kit'
import type { Project } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'One project, and every young person\'s work on it. Only appears once they have saved something.',
}

export interface StudentWork {
  studentId: string
  name: string
  lastEdited: string
  readyToMark: boolean
}

interface Props {
  project: Project
  work: StudentWork[]
  onViewCode: () => void
  onHideFromStudents: () => void
  onCopyLink: () => void
  onOpenWork: (studentId: string) => void
}

/**
 * The educator's view of a project.
 *
 * The empty state is the interesting one: "Only students who have saved their
 * project will appear here." A mentor walking round a room cannot tell from
 * this screen who has started and got stuck versus who has not started — only
 * who has saved.
 */
export function EducatorProjectPage({
  project,
  work,
  onViewCode,
  onHideFromStudents,
  onCopyLink,
  onOpenWork,
}: Props) {
  return (
    <div className="section-stack">
      <div>
        <h1 className="title-lg">{project.title}</h1>
        <p className="body muted">{project.language}</p>
      </div>

      <div className="cc-actions">
        <Button type="secondary" size="small" text="View project code" onClick={onViewCode} />
        <Button type="secondary" size="small" text="Hide from students" onClick={onHideFromStudents} />
        <Button type="secondary" size="small" text="Copy link" onClick={onCopyLink} />
      </div>

      <div className="cc-columns">
        <Card className="cc-aside">
          <h2 className="title-sm">Updating project code and instructions</h2>
          <p className="body muted">
            Any changes you make will not show to students who have already clicked save in this
            project.
          </p>
          <p className="body muted">
            If you need to edit the code or instructions after students have saved, we recommend
            creating a new project.
          </p>
        </Card>

        <Card>
          <h2 className="title-sm">Student work</h2>
          <p className="body muted">
            This list contains all the work from students in the class. Only students who have
            saved their project will appear here. A "Ready to mark" tag will appear when the
            student has marked their project as finished.
          </p>

          {work.length === 0 ? (
            <p className="lane-empty">No student work</p>
          ) : (
            <ul className="cc-list">
              {work.map((item) => (
                <li className="cc-row" key={item.studentId}>
                  <span>
                    <button className="link-button" onClick={() => onOpenWork(item.studentId)}>
                      {item.name}
                    </button>
                    <span className="body muted small"> Last edited: {item.lastEdited}</span>
                  </span>
                  <Tag
                    text={item.readyToMark ? 'Ready to mark' : 'Not ready'}
                    variant={item.readyToMark ? 'success' : 'default'}
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
