import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from './kit'
import { THEMES, type Lane, type Theme } from './lanes'
import { prototypesInLane } from './prototypes/registry'

function LaneCard({ lane }: { lane: Lane }) {
  const prototypes = prototypesInLane(lane.id)

  return (
    <section className="lane" aria-labelledby={`${lane.id}-title`}>
      <h3 className="title-sm lane-heading" id={`${lane.id}-title`}>
        {lane.title}
        {prototypes.length > 0 && (
          <span className="lane-count">
            {prototypes.length} {prototypes.length === 1 ? 'prototype' : 'prototypes'}
          </span>
        )}
      </h3>

      {prototypes.length === 0 ? (
        <p className="lane-empty">No prototypes yet</p>
      ) : (
        <div className="proto-list">
          {prototypes.map((prototype) => (
            /* The whole row is the link, not a small button inside it — a
               bigger target, and it matches how Code Classroom and Manage Club
               list things. An href rather than a click handler so middle-click
               and "open in new tab" work; people compare variants side by
               side. */
            <a
              className="proto-card"
              key={prototype.slug}
              href={`#/p/${prototype.lane}/${prototype.slug}`}
            >
              <span className="proto-card-text">
                <span className="title-sm">{prototype.meta.title}</span>
                <span className="proto-meta">{prototype.meta.owner}</span>
              </span>
              <span className="proto-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

/** Total across the theme's lanes — the tab has to speak for a list that is
  * not on screen. */
function countInTheme(theme: Theme) {
  return theme.lanes.reduce((total, lane) => total + prototypesInLane(lane.id).length, 0)
}

/**
 * One tab per theme. Follows the ARIA tabs pattern: the strip is a single tab
 * stop and the arrow keys move between tabs, so a keyboard user does not have
 * to tab past every theme to reach the list.
 */
function ThemeTabs({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (themeId: string) => void
}) {
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = THEMES.findIndex((theme) => theme.id === activeId)
    let next = current

    if (event.key === 'ArrowRight') next = (current + 1) % THEMES.length
    else if (event.key === 'ArrowLeft') next = (current - 1 + THEMES.length) % THEMES.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = THEMES.length - 1
    else return

    event.preventDefault()
    const { id } = THEMES[next]
    onSelect(id)
    tabs.current[id]?.focus()
  }

  return (
    <div className="theme-tabs" role="tablist" aria-label="Theme" onKeyDown={onKeyDown}>
      {THEMES.map((theme) => {
        const selected = theme.id === activeId
        const count = countInTheme(theme)
        return (
          <button
            className="theme-tab"
            key={theme.id}
            id={`${theme.id}-tab`}
            ref={(node) => {
              tabs.current[theme.id] = node
            }}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${theme.id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(theme.id)}
            /* A bare number next to the title reads as a step number, not a
               count, so spell it out for screen readers. */
            aria-label={`${theme.title}, ${count} ${count === 1 ? 'prototype' : 'prototypes'}`}
          >
            {theme.title}
            <span className="theme-tab-count" aria-hidden="true">
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* Only the selected panel is rendered. The tab is the panel's accessible name,
   so there is no visible theme heading any more — it would just repeat it. */
function ThemePanel({ theme }: { theme: Theme }) {
  return (
    <section
      className="theme"
      id={`${theme.id}-panel`}
      role="tabpanel"
      aria-labelledby={`${theme.id}-tab`}
      tabIndex={-1}
    >
      <div className="lane-list">
        {theme.lanes.map((lane) => (
          <LaneCard key={lane.id} lane={lane} />
        ))}
      </div>
    </section>
  )
}

export function Home() {
  /* The selected theme lives in the query string, so a link to the page can
     open on a particular tab — the same reason prototypes are deep-linkable.
     `replace` because tabbing through themes should not fill the back button. */
  const [params, setParams] = useSearchParams()
  const activeTheme = THEMES.find((theme) => theme.id === params.get('theme')) ?? THEMES[0]
  const selectTheme = (themeId: string) => setParams({ theme: themeId }, { replace: true })

  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-lg">Code Club × Code Classroom — user flow prototypes</h1>
        <p className="body muted">
          Approaches to how Code Clubs could use Code Classroom. Scope comes from{' '}
          <a href="https://github.com/RaspberryPiFoundation/digital-code-club/issues/1205">
            digital-code-club #1205
          </a>
          .
        </p>
      </div>

      <Alert type="information" title="These are early prototypes">
        <ul className="disclaimer-list">
          <li>Nothing you enter is saved, and nothing here is a commitment to build.</li>
          <li>Never enter real account details, passwords, or real information about a young person.</li>
          <li>All accounts, classes, projects, and names are made up.</li>
          <li>Copy and labels are unreviewed and may change.</li>
        </ul>
      </Alert>

      <div className="theme-list">
        <ThemeTabs activeId={activeTheme.id} onSelect={selectTheme} />
        <ThemePanel key={activeTheme.id} theme={activeTheme} />
      </div>
    </div>
  )
}
