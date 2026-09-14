import { useState } from 'react'
import { Card, CheckboxInput, Placeholder, SearchInput, Tag } from '../../../kit'
import type { Project } from '../../../fixtures'
import { FILTER_LABEL, interestOf, usableInClassroom } from './facets'

// The first page, and on the live site it is the project selector:
// projects.raspberrypi.org/en/projects — a green "Find a project" band with a
// search box, one filter rail, "Showing N projects", then a grid of cards.
//
// It collapses two of the chart's boxes into one screen, and that is the
// chart read correctly rather than a shortcut. "Code Club Projects" then
// "Scratch" then "Filter by 'can be used in my code classroom'" are not three
// pages: on the real site Scratch is a checkbox in the Technology group of
// this rail, right next to where the new filter would go. A mentor arrives,
// ticks Scratch, ticks the Code Classroom filter, and is looking at their
// shortlist — all here.
//
// That is also better for the question Sarah wants answered. Her assumption on
// the chart is *"mentors will find a project based on technology over
// interest"*, and the live rail puts Interest and Technology side by side. On
// a category page you cannot see that choice being made; here you can watch
// which group they reach for first.
//
// THE PROPOSAL IS ONE CHECKBOX. The page around it is the live page.
//
// Sarah's sticky floated a second idea — *"we could also have a tag design or
// a way to differentiate which cards are compatible with Code Classroom"* —
// and it was built and then removed. Three reasons, in order of weight:
//
// - It would sit on nearly every card. A badge on the majority carries no
//   information; if anything is worth marking it is the exceptions.
// - THIS PAGE IS SHARED WITH YOUNG PEOPLE. The selector has no idea who is
//   looking, and "Works with Code Classroom" means nothing to a nine-year-old
//   browsing for something to make.
// - At the grid's narrowest column the tag was wider than the card's content
//   box, so it dragged the card's text out past its own edges.
//
// The mentor who never opens the filter rail is still covered: the project
// page carries a banner naming their club. See notes.md for the inverted
// version of this idea, which is probably the right one.
//
// Only filter groups the fixtures can actually honour are here. The live rail
// also has PDF only and Hardware; faking them would put controls in a testing
// session that do nothing. Interest works, but only because facets.ts invents
// it — see the warning there.

/** The live band colour, sampled from the page. No green in the token set. */
const HERO_GREEN = 'rgb(65, 180, 82)'

export interface Filters {
  query: string
  classroomOnly: boolean
  levels: number[]
  interests: string[]
  technologies: string[]
}

interface Props {
  projects: Project[]
  filters: Filters
  onFiltersChange: (next: Filters) => void
  onView: (projectId: string) => void
}

function toggle<T>(list: T[], value: T, on: boolean) {
  return on ? [...list, value] : list.filter((item) => item !== value)
}

export function ProjectSelector({
  projects,
  filters,
  onFiltersChange,
  onView,
}: Props) {
  const set = (patch: Partial<Filters>) => onFiltersChange({ ...filters, ...patch })

  // The design system's SearchInput is uncontrolled, so its value has to come
  // in as `defaultValue` — and wiring that straight to live state is a trap:
  // React re-assigns the DOM value when `defaultValue` changes, which can
  // fight whatever the person is typing. Captured once here instead, so it
  // never changes while mounted. Returning from a successful import remounts
  // the screen, which is when the stored query gets picked up again.
  const [initialQuery] = useState(filters.query)

  const levels = [...new Set(projects.map((p) => p.level))].sort()
  const technologies = [...new Set(projects.map((p) => p.language))].sort()
  const interests = [...new Set(projects.map(interestOf).filter(Boolean) as string[])].sort()

  const query = filters.query.trim().toLowerCase()
  const visible = projects.filter((p) => {
    if (filters.classroomOnly && !usableInClassroom(p)) return false
    if (filters.levels.length > 0 && !filters.levels.includes(p.level)) return false
    if (filters.technologies.length > 0 && !filters.technologies.includes(p.language)) return false
    const interest = interestOf(p)
    if (filters.interests.length > 0 && (!interest || !filters.interests.includes(interest)))
      return false
    if (query && !`${p.title} ${p.intro}`.toLowerCase().includes(query)) return false
    return true
  })

  return (
    <div className="section-stack">
      {/* The green band. 24px radius and 40px of padding are the live values;
          the token set has neither, and neither is a colour or a font size. */}
      <div
        style={{
          background: HERO_GREEN,
          borderRadius: '24px',
          padding: 'var(--space-5) var(--space-3)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 className="title-lg">Find a project</h1>
        <div style={{ flex: '0 1 22rem' }}>
          {/* Requires a visible label, so this carries one where the live
              page has none — an accessibility gain rather than a fidelity
              loss. See `initialQuery` above for why the value is not wired
              straight to state. */}
          <SearchInput
            inputFieldId="project-search"
            label="Search projects"
            placeholder="Search projects"
            defaultValue={initialQuery}
            onChange={(event) => set({ query: event.target.value })}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Not the shared `cc-columns` rail-and-content layout, which fixes the
          rail at 260px. The design system's checkbox label carries a hardcoded
          min-width of 240px, and a 260px card only has 212px inside its
          padding — so every checkbox in the rail overflowed it. Flex with wrap
          rather than a grid, so the two columns still stack on a narrow window
          without needing a media query an inline style cannot express. */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '1 1 19rem', maxWidth: '22rem' }}>
          <Card className="cc-aside">
            <h2 className="title-sm">Filter</h2>
            <p className="body small muted">
              The project list automatically updates when you apply a filter.
            </p>

            {/* The proposal. Ungrouped, above the first group heading, which is
              exactly where the live rail puts its standalone "PDF only"
              checkbox — so it needs no legend of its own, and a legend reading
              "Code Classroom" above a label saying the same thing was only
              ever repetition.

              Where it sits is still worth arguing about: first makes it
              findable, and also makes it the first thing a mentor has to
              understand about a page they came to for something else. */}
            <CheckboxInput
              id="classroom-only"
              name="classroom-only"
              label={FILTER_LABEL}
              checked={filters.classroomOnly}
              onChange={(event) => set({ classroomOnly: event.target.checked })}
            />

            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend className="body" style={{ fontWeight: 'var(--fw-bold)' }}>
                Difficulty level
              </legend>
              {levels.map((level) => (
                <CheckboxInput
                  key={level}
                  id={`level-${level}`}
                  name={`level-${level}`}
                  label={`Level ${level}`}
                  checked={filters.levels.includes(level)}
                  onChange={(event) =>
                    set({
                      levels: toggle(filters.levels, level, event.target.checked),
                    })
                  }
                />
              ))}
            </fieldset>

            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend className="body" style={{ fontWeight: 'var(--fw-bold)' }}>
                Interest
              </legend>
              {interests.map((interest) => (
                <CheckboxInput
                  key={interest}
                  id={`interest-${interest}`}
                  name={`interest-${interest}`}
                  label={interest}
                  checked={filters.interests.includes(interest)}
                  onChange={(event) =>
                    set({
                      interests: toggle(filters.interests, interest, event.target.checked),
                    })
                  }
                />
              ))}
            </fieldset>

            {/* Where the chart's "Scratch" box actually lives. */}
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend className="body" style={{ fontWeight: 'var(--fw-bold)' }}>
                Technology
              </legend>
              {technologies.map((tech) => (
                <CheckboxInput
                  key={tech}
                  id={`tech-${tech}`}
                  name={`tech-${tech}`}
                  label={tech}
                  checked={filters.technologies.includes(tech)}
                  onChange={(event) =>
                    set({
                      technologies: toggle(filters.technologies, tech, event.target.checked),
                    })
                  }
                />
              ))}
            </fieldset>
          </Card>
        </div>

        <div style={{ flex: '3 1 22rem', display: 'grid', gap: 'var(--space-2)' }}>
          <p className="body" style={{ margin: 0 }}>
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>

          {visible.length === 0 ? (
            <Card>
              <p className="lane-empty">No projects match those filters</p>
            </Card>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
                gap: 'var(--space-2)',
                alignItems: 'start',
              }}
            >
              {visible.map((project) => {
                const interest = interestOf(project)
                return (
                  <Card key={project.id}>
                    <div
                      style={{
                        display: 'grid',
                        gap: 'var(--space-1)',
                        justifyItems: 'start',
                      }}
                    >
                      {/* The live cards lead with an illustration running to
                          the card's edges, so it is pulled back out through
                          the card's own padding. */}
                      <div
                        style={{
                          justifySelf: 'stretch',
                          margin: 'calc(var(--space-3) * -1) calc(var(--space-3) * -1) 0',
                          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                          overflow: 'hidden',
                        }}
                      >
                        <Placeholder label="Project thumbnail" height={110} />
                      </div>

                      <span className="body small" style={{ fontWeight: 'var(--fw-bold)' }}>
                        {project.language} - Level {project.level}
                      </span>

                      {/* On the live page the title is the link, not the card
                          and not a button. */}
                      <button
                        className="link-button"
                        style={{ textAlign: 'left' }}
                        onClick={() => onView(project.id)}
                      >
                        <strong>{project.title}</strong>
                      </button>

                      <p className="body small muted" style={{ margin: 0 }}>
                        {project.intro.split('\n')[0].replace(/\*\*/g, '')}
                      </p>

                      {/* Only the topic tag, as on the live cards. Whether a
                          project is already in one of the mentor's classes is
                          deliberately NOT here: a card in a catalogue shared
                          with young people is the wrong place for a fact about
                          one mentor's classes, and "already added" only
                          matters once you are looking at the project. It is on
                          the project page instead. */}
                      {interest && (
                        <div className="cc-actions" style={{ justifySelf: 'stretch' }}>
                          <Tag text={interest} />
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
