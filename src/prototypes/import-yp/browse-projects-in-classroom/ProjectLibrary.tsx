import { Button, Card, Placeholder, Tag } from '../../../kit'
import type { Project } from '../../../fixtures'
import { projectType, type ProjectTypeId } from './projectTypes'

// PROPOSED. The Code Club Projects catalogue, brought inside Code Classroom.
//
// Today browsing happens on projects.raspberrypi.org: a different site, a
// different account, and no way back into the class. A club member holding
// only a Code Classroom student account arrives there as a stranger.
//
// Laid out as tiles to match that site's own project cards, checked against
// projects.raspberrypi.org/en/interests/nature: a white card with a 16px
// radius and a hairline border, a full-bleed image across the top, then a
// level tag, the title, a one-line description, and an action.
//
// Matching it is the point rather than decoration. If this is going to stand
// in for the catalogue, it has to be recognisable as the catalogue — a young
// person who has browsed projects at home should see the same thing here.
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

/**
 * The card's one-line description, from the project's own intro.
 *
 * The fixtures hold markdown, because that is how projects are really
 * authored. A card is not the place to render it, so the first real line has
 * its emphasis and code marks stripped.
 */
function summary(project: Project): string {
  const firstLine = project.intro.split('\n').find((line) => line.trim().length > 0) ?? ''
  return firstLine.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1')
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
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            // The real list is a grid that reflows; `auto-fill` keeps the tiles
            // a readable width instead of stretching two of them across a
            // desktop, and drops to one column on a phone.
            gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {visible.map((project) => {
            const inClass = inClassIds.includes(project.id)
            return (
              <li
                key={project.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--rpf-white)',
                  border: `1px solid var(--rpf-grey-150)`,
                  borderRadius: 'var(--radius-card)',
                  // Lets the image sit flush to the rounded corners.
                  overflow: 'hidden',
                }}
              >
                {/* Code Club Projects is a very visual catalogue — the image is
                    the biggest thing on every card. Grey-boxed so a session is
                    about the flow rather than the artwork. */}
                <Placeholder label="Project thumbnail" height={150} />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-1)',
                    padding: 'var(--space-3)',
                    flex: 1,
                  }}
                >
                  <span>
                    <Tag text={`${project.language} - Level ${project.level}`} />
                  </span>
                  <h2 className="title-sm" style={{ margin: 0 }}>
                    {project.title}
                  </h2>
                  <p className="body small muted" style={{ margin: 0 }}>
                    {summary(project)}
                  </p>

                  {/* Pinned to the bottom so the actions line up across a row
                      whatever the descriptions do. */}
                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
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
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
