import { Button, Placeholder } from '../../kit'
import type { Project } from '../../fixtures'
import type { ScreenMeta } from '../types'
import { Markdown } from './Markdown'

export const meta: ScreenMeta = {
  surface: 'ccp',
  existsToday: true,
  verified: true,
  note: 'Where a young person or mentor lands on a project. A hero with the level and Start project, then "What you will make". The starting point for every import flow.',
}

interface Props {
  project: Project
  onStart: () => void
  /**
   * Only pass this if your prototype is PROPOSING an import affordance. There
   * is nothing like it on the live site or in the designs, so a screen showing
   * it is making a suggestion — say so in your notes.
   */
  onImport?: () => void
}

/**
 * A Code Club Project, before you open the editor.
 *
 * Built from the Projects site designs. Two things about it matter for the
 * import lane:
 *
 * - The whole page drives at one action: "Start project", repeated top and
 *   bottom. Anything else competing with it is a real design cost.
 * - There is no mention of a class, a school or a mentor anywhere. A young
 *   person arriving here has no idea Code Classroom exists.
 */
export function ProjectPage({ project, onStart, onImport }: Props) {
  return (
    <div className="ccp-page">
      <div className="ccp-hero">
        <div className="ccp-hero-text">
          <span className="ccp-level">
            {project.language}: Level {project.level}
          </span>
          <h1 className="title-lg">{project.title}</h1>
          <div className="cc-actions">
            <Button type="primary" text="Start project" onClick={onStart} />
            {onImport && <Button type="secondary" text="Add to a class" onClick={onImport} />}
          </div>
        </div>
        <div className="ccp-hero-art">
          <Placeholder label="Project illustration" height={150} />
        </div>
      </div>

      <div className="ccp-body">
        <h2 className="title-md">What you will make</h2>
        <Markdown source={project.intro} />

        {project.landingTask && (
          <section className="ccp-task" aria-labelledby="landing-task">
            <div className="ccp-task-head">
              <h3 className="title-sm" id="landing-task">
                {project.landingTask.title}
              </h3>
              {/* Tickable, so a young person can keep their place. Decorative
                  here — a prototype that needs it working can make it real. */}
              <span className="ccp-task-tick" aria-hidden="true">
                ✓
              </span>
            </div>
            <div className="ccp-task-body">
              <Markdown source={project.landingTask.body} />
              <Placeholder label="Project preview" height={120} />
            </div>
          </section>
        )}

        <div className="ccp-start-again">
          <Button type="primary" text="Start project" onClick={onStart} />
        </div>
      </div>
    </div>
  )
}
