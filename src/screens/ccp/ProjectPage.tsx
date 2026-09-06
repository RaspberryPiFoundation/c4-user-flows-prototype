import { Button, Card, Placeholder, Tag } from '../../kit'
import type { Project } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'ccp',
  existsToday: true,
  verified: true,
  note: 'Where a young person or mentor lands on a project before opening it. The starting point for every import flow.',
}

interface Props {
  project: Project
  onStart: () => void
  /**
   * Only shown when there is somewhere to import to. Nothing like this exists
   * on the live site — a prototype that shows it is proposing something.
   */
  onImport?: () => void
}

/**
 * A Code Club Project, before you open the editor.
 *
 * This is where the import lane starts: a young person or mentor arrives here,
 * usually from a search or a link, and wants to get making. Any "add this to
 * my class" affordance is a PROPOSAL — pass `onImport` to show one, and say so
 * in your notes.
 */
export function ProjectPage({ project, onStart, onImport }: Props) {
  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Tag text={project.language} variant="information" />
        <Tag text={`Ages ${project.ages}`} />
        <Tag text={`${project.steps.length} steps`} />
      </div>

      <h1 className="title-lg">{project.title}</h1>

      <div className="cc-columns">
        <div className="section-stack">
          <Placeholder label="Project thumbnail" height={140} />
          <Button type="primary" text="Start project" onClick={onStart} />
          {onImport && <Button type="secondary" text="Add to a class" onClick={onImport} />}
        </div>

        <Card>
          <h2 className="title-sm">What you will make</h2>
          <p className="body muted">{project.steps[0]?.body.split('\n')[0]}</p>
          <h2 className="title-sm">Steps</h2>
          <ol className="cc-steps">
            {project.steps.map((step) => (
              <li key={step.title}>{step.title}</li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}
