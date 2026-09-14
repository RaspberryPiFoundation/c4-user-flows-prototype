import { useState } from 'react'
import { Button, Card, CheckboxInput, Placeholder, Tag } from '../../../kit'
import type { Project } from '../../../fixtures'
import { isEmbeddedEditorProject } from './projectTypes'

// "CCP page filtered by embedded editor projects" — the real Code Club
// Projects catalogue, on the real Code Club Projects surface, reached by
// leaving Code Classroom.
//
// Built to match the live category pages (projects.raspberrypi.org/en/
// technology/scratch): green hero panel with a Back pill, a big category
// title and a line of description; a results count; a filter rail; then a grid
// of cards, each an image band over a "language - Level n" eyebrow, a linked
// title and a description.
//
// The category is the proposal. "Scratch" and "Python" are real categories a
// young person browses by; "Code Classroom compatible" is a category defined
// by what a mentor can DO with a project rather than by what it teaches, and
// nothing like it exists on the live site.
//
// It now covers Scratch, Python and HTML — every language the fixtures have —
// so it excludes nothing here and a mentor sees the whole catalogue. Which
// raises its own question: a category that excludes nothing is a category
// doing no work. See notes.md, finding 3.
//
// Not built in `screens/` because no catalogue screen exists there, and this
// one is a proposal rather than a reconstruction.
//
// Deliberately left out of the copy: the live page's "Start a path" strip of
// three coloured path cards. Paths are a young person's route through a
// subject over several weeks, which is not what a mentor is doing here, and
// the fixtures have no paths to show.

// Approximations of the live category page's palette, sampled from the page.
// The shared token set has no greens (src/styles/tokens.css), so they are
// declared once here and scoped to this prototype rather than repeated inline.
// Delete these if Code Club Projects' palette ever lands in tokens.css.
const HERO_GREEN = 'hsl(123, 45%, 87%)'
const HERO_ART = 'hsl(123, 38%, 80%)'

interface Props {
  projects: Project[]
  /** Projects already in one of this mentor's classes. */
  alreadyAddedIds: string[]
  onView: (projectId: string) => void
  onBack: () => void
}

export function ProjectsCatalogue({ projects, alreadyAddedIds, onView, onBack }: Props) {
  const inCategory = projects.filter(isEmbeddedEditorProject)
  const hidden = projects.length - inCategory.length

  // The live page filters by difficulty level, and `level` is the one filter
  // the fixtures can actually honour. Interest and hardware are on the real
  // page and are not modelled, so they are not faked here either.
  const levels = [...new Set(inCategory.map((p) => p.level))].sort()
  const [chosenLevels, setChosenLevels] = useState<number[]>([])

  const visible =
    chosenLevels.length === 0
      ? inCategory
      : inCategory.filter((p) => chosenLevels.includes(p.level))

  function toggleLevel(level: number, on: boolean) {
    setChosenLevels((current) =>
      on ? [...current, level] : current.filter((value) => value !== level),
    )
  }

  return (
    <div className="section-stack">
      {/* Hero. The live one carries a category illustration on the right. */}
      <div
        style={{
          background: HERO_GREEN,
          borderRadius: 'var(--radius-card)',
          padding: 'var(--space-3)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: '1 1 20rem', display: 'grid', gap: 'var(--space-2)' }}>
          <div>
            {/* Says where it goes, not just "Back". A mentor is one click from
                a different product and the button is the only thing that says
                so — the live page, which never leaves, can afford "Back". */}
            <Button
              type="secondary"
              size="small"
              text="← Back to Code Classroom"
              onClick={onBack}
            />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 'var(--fs-3)',
              lineHeight: 'var(--lh-25)',
            }}
          >
            Code Classroom compatible
          </h1>
          <p className="body" style={{ margin: 0, maxWidth: '34rem' }}>
            Projects you can add straight to one of your classes in Code Classroom, with their
            instructions and starter code already written.
          </p>
        </div>

        <div style={{ flex: '0 1 12rem' }}>
          <div style={{ background: HERO_ART, borderRadius: 'var(--radius-sm)' }}>
            <Placeholder label="Category illustration" height={120} />
          </div>
        </div>
      </div>

      {/* Filter rail beside the results, as on the live page. NOT the shared
          `cc-columns` layout, which fixes the rail at 260px: the design
          system's checkbox label carries a hardcoded min-width of 240px, and a
          260px card only has 212px inside its padding, so every checkbox in
          the rail overflowed it. Flex with wrap rather than a grid, so the two
          columns still stack on a narrow window without needing a media query
          an inline style cannot express. */}
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
                  checked={chosenLevels.includes(level)}
                  onChange={(event) => toggleLevel(level, event.target.checked)}
                />
              ))}
            </fieldset>
          </Card>
        </div>

        <div style={{ flex: '3 1 22rem', display: 'grid', gap: 'var(--space-2)' }}>
          <div>
            <p className="body" style={{ margin: 0, fontWeight: 'var(--fw-bold)' }}>
              {visible.length} {visible.length === 1 ? 'result' : 'results'}
            </p>
            {/* Reachable, and the point. The fixtures carry two physical
                computing projects that need a Raspberry Pi, so the category
                really is shorter than the catalogue — which is what makes the
                "can we connect projects that aren't editor projects?" sticky
                something a session can watch. */}
            {hidden > 0 && (
              <p className="body small muted" style={{ margin: 0 }}>
                {hidden} more {hidden === 1 ? 'project is' : 'projects are'} not here, because they
                do not run in an editor Code Classroom can embed.
              </p>
            )}
          </div>

          {visible.length === 0 ? (
            <Card>
              <p className="lane-empty">No projects match that filter</p>
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
                const added = alreadyAddedIds.includes(project.id)
                return (
                  <Card key={project.id}>
                    <div
                      style={{
                        display: 'grid',
                        gap: 'var(--space-1)',
                        justifyItems: 'start',
                      }}
                    >
                      {/* The live cards lead with an illustration that runs to
                          the card's edges, so it has to be pulled back out
                          through the card's own padding and its top corners
                          rounded to match. Grey-boxed, as everywhere else
                          here, so a session is about the flow and not the
                          artwork. */}
                      <div
                        style={{
                          // The row above sets justify-items: start, which
                          // shrinks every child to its content. This one has
                          // to opt back out of that to reach both edges.
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

                      {added && (
                        <div>
                          <Tag text="In a class" variant="success" />
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
