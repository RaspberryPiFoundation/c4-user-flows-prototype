import { Button, Card, Placeholder, Tag } from '../../../kit'
import type { Project } from '../../../fixtures'
import { projectType, type ProjectTypeId } from './projectTypes'

// PROPOSED. The Code Club Projects catalogue, brought inside Code Classroom.
//
// Today browsing happens on projects.raspberrypi.org: a different site, a
// different account, and no way back into the class. A club member holding
// only a Code Classroom student account arrives there as a stranger.
//
// Filtered by the type chosen on the previous screen rather than by a dropdown
// here, because the flow now asks for the type up front. The list shows what
// Code Club Projects calls the language, which is not what the previous screen
// called it — see projectTypes.ts.
//
// Not badged "proposed" on screen, on purpose. See AddProjectChoices.tsx.

interface Props {
  projects: Project[]
  type: ProjectTypeId
  /**
   * Everything already in this young person's class — what the mentor set up
   * as well as what they added themselves. Both read as "already there",
   * because from where they are standing there is no difference.
   */
  inClassIds: string[]
  onView: (projectId: string) => void
  onBack: () => void
}

export function ProjectLibrary({ projects, type, inClassIds, onView, onBack }: Props) {
  const { language } = projectType(type)
  const visible = projects.filter((project) => project.language === language)

  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <h1 className="title-lg">{type} projects</h1>

      {visible.length === 0 ? (
        <Card>
          {/* Reachable: the fixtures have no HTML project. A young person who
              picks Web gets a promise the catalogue cannot keep, which is
              worth seeing rather than designing away. */}
          <p className="lane-empty">There are no {type} projects yet</p>
          <p className="body muted">
            Nothing here to choose from. Going back and picking a different type is the only way
            on, and nobody told them that before they chose.
          </p>
        </Card>
      ) : (
        <ul className="cc-list">
          {visible.map((project) => {
            const inClass = inClassIds.includes(project.id)
            return (
              <li className="cc-row" key={project.id}>
                {/* Code Club Projects is a very visual catalogue. Grey-boxed
                    here so a session is about the flow, not the artwork. */}
                <div style={{ width: '96px', flex: '0 0 auto' }}>
                  <Placeholder label="Thumbnail" height={64} />
                </div>
                <div style={{ flex: '1 1 12rem' }}>
                  <strong>{project.title}</strong>
                  <p className="body small muted">
                    {project.language}: Level {project.level} · Ages {project.ages}
                  </p>
                </div>
                {inClass ? (
                  <Tag text="In your class" variant="success" />
                ) : (
                  <Button
                    type="primary"
                    size="small"
                    text="View project"
                    onClick={() => onView(project.id)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
