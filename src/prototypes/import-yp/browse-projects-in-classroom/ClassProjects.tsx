import { useRef, useState } from 'react'
import { Button, Card, Tag } from '../../../kit'
import type { ClassGroup, Project } from '../../../fixtures'
import type { WorkStatus } from '../../../screens'

// A copy of `screens/classroom/YoungPersonClassPage`, split into two sections.
//
// Copied rather than propped, because the shared screen has no notion of where
// a project came from — today it cannot, since every project in a class was
// put there by an adult. Adding a tab strip to it would push this prototype's
// proposal into a file four other prototypes read.
//
// PROPOSED, all of it. Today there is one undifferentiated list.
//
// The real screen's copy is kept for the assigned section, because that
// sentence is true there and testing should see the real words. The
// created-by-you section needs a sentence nobody has written yet.

export interface ProjectEntry {
  project: Project
  status: WorkStatus
}

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

type TabId = 'assigned' | 'created'

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'assigned', label: 'Assigned to you' },
  { id: 'created', label: 'Created by you' },
]

interface Props {
  classGroup: ClassGroup
  /** Put there by the mentor — everything a class can hold today. */
  assigned: ProjectEntry[]
  /** Made by the young person. Impossible today; the whole proposal. */
  created: ProjectEntry[]
  /**
   * Which section to open on.
   *
   * It matters: someone who has just made a project and lands on "Assigned to
   * you" cannot see the thing they made, and the count going up is not much
   * of a clue. In this prototype anything in `created` was made moments ago,
   * so "has created work" and "just created something" are the same test. A
   * real product would have to key this off recency instead, or a young person
   * returning next week would land away from newly assigned work.
   */
  initialTab?: TabId
  onOpenProject: (projectId: string) => void
  /**
   * Starting a project of your own. Lives inside "Created by you" rather than
   * beside the class, because that is the section it belongs to — but it does
   * mean a young person sitting on "Assigned to you" is not offered it at all.
   * Whether that costs more in discoverability than it gains in tidiness is a
   * question for a session.
   */
  onAddProject: () => void
}

export function ClassProjects({
  classGroup,
  assigned,
  created,
  initialTab = 'assigned',
  onOpenProject,
  onAddProject,
}: Props) {
  const [tab, setTab] = useState<TabId>(initialTab)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const entries = tab === 'assigned' ? assigned : created

  // Left/right arrows move between tabs, which is what a keyboard user will
  // try. Without it the tab strip is reachable but behaves like two unrelated
  // buttons.
  function onKeyDown(event: React.KeyboardEvent) {
    const index = TABS.findIndex((t) => t.id === tab)
    let next: number | undefined
    if (event.key === 'ArrowRight') next = (index + 1) % TABS.length
    if (event.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length
    if (next === undefined) return
    event.preventDefault()
    const id = TABS[next].id
    setTab(id)
    tabRefs.current[id]?.focus()
  }

  return (
    <div className="section-stack">
      <h1 className="title-lg">{classGroup.name}</h1>

      <Card>
      {/* Tabs on the left, the action on the right — the same shape as the
          mentor's own projects panel, where "Add project" sits top right of
          the white box. Only on "Created by you", and only once there is a
          list: with nothing there, the empty state does the asking instead,
          and two buttons saying the same thing would be one too many. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          flexWrap: 'wrap',
          borderBottom: `1px solid var(--rpf-grey-150)`,
        }}
      >
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onKeyDown}
          style={{ display: 'flex', gap: 'var(--space-3)' }}
        >
          {TABS.map((item) => {
            const selected = item.id === tab
            const count = item.id === 'assigned' ? assigned.length : created.length
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el
                }}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                // Only the selected tab is in the tab order; arrows move
                // within the strip. That is the standard pattern, and it stops
                // a keyboard user having to tab past every section.
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(item.id)}
                style={{
                  appearance: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: `var(--space-1) 0`,
                  font: 'inherit',
                  fontWeight: selected ? 700 : 400,
                  color: selected ? 'var(--rpf-text)' : 'var(--rpf-text-secondary)',
                  // Sits over the strip's own border, so the underline reads as
                  // the selected tab rather than a second rule.
                  boxShadow: selected ? `inset 0 -3px 0 0 var(--rpf-text)` : 'none',
                }}
              >
                {item.label} ({count})
              </button>
            )
          })}
        </div>

        {tab === 'created' && created.length > 0 && (
          <Button
            type="primary"
            size="small"
            text="Add project"
            icon="add"
            iconPosition="right"
            onClick={onAddProject}
          />
        )}
      </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          <p className="body muted">
            {tab === 'assigned'
              ? 'Projects are shared with students and contain starter code created by a teacher.'
              : 'Projects you started yourself. Your mentor can see these too.'}
          </p>

          {entries.length === 0 ? (
            tab === 'assigned' ? (
              <p className="lane-empty">No projects yet</p>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-5) var(--space-3)',
                  textAlign: 'center',
                }}
              >
                <p className="body" style={{ fontWeight: 700, margin: 0 }}>
                  You have not made a project yet
                </p>
                <p className="body muted" style={{ margin: 0 }}>
                  Start something of your own — from scratch, or from a Code Club project with
                  steps to follow.
                </p>
                <Button type="primary" text="Make your first project" onClick={onAddProject} />
              </div>
            )
          ) : (
            <ul className="cc-list">
              {entries.map(({ project, status }) => (
                <li className="cc-row" key={project.id}>
                  <button className="link-button" onClick={() => onOpenProject(project.id)}>
                    {project.title}
                  </button>
                  {/* "Ready for you" means an adult set this up and you have not
                      started — which is nonsense on your own project. The status
                      vocabulary has no word for "mine, just started", so nothing
                      is shown rather than something wrong. See notes.md. */}
                  {tab === 'created' && status === 'ready-for-you' ? null : (
                    <Tag text={STATUS_LABEL[status]} variant={STATUS_VARIANT[status]} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  )
}
