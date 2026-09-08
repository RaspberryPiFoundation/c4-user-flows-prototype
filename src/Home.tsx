import { Alert } from './kit'
import { THEMES, type Lane, type Theme } from './lanes'
import { prototypesInLane } from './prototypes/registry'

/**
 * Jump straight to a lane, with how many prototypes are in each.
 *
 * Buttons rather than anchors: this app uses hash routing, so an in-page
 * `#lane-id` fragment would be read as a route. Focus moves to the heading as
 * well as scrolling, so it works for keyboard and screen reader users too.
 */
function JumpTo() {
  const go = (laneId: string) => {
    const heading = document.getElementById(`${laneId}-title`)
    heading?.scrollIntoView({ block: 'start' })
    heading?.focus()
  }

  return (
    <nav className="jump-to" aria-label="Jump to a lane">
      {THEMES.map((theme) => (
        <div className="jump-to-row" key={theme.id}>
          <span className="jump-to-theme">{theme.title}</span>
          <span className="jump-to-lanes">
            {theme.lanes.map((lane) => {
              const count = prototypesInLane(lane.id).length
              return (
                <button className="link-button" key={lane.id} onClick={() => go(lane.id)}>
                  {lane.title} ({count})
                </button>
              )
            })}
          </span>
        </div>
      ))}
    </nav>
  )
}

function LaneCard({ lane }: { lane: Lane }) {
  const prototypes = prototypesInLane(lane.id)

  return (
    <section className="lane" aria-labelledby={`${lane.id}-title`}>
      <h3 className="title-sm lane-heading" id={`${lane.id}-title`} tabIndex={-1}>
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

function ThemeSection({ theme }: { theme: Theme }) {
  return (
    <section aria-labelledby={`${theme.id}-title`} className="theme">
      <h2 className="title-md theme-head" id={`${theme.id}-title`}>
        {theme.title}
      </h2>
      <div className="lane-list">
        {theme.lanes.map((lane) => (
          <LaneCard key={lane.id} lane={lane} />
        ))}
      </div>
    </section>
  )
}

export function Home() {
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

      <JumpTo />

      <div className="theme-list">
        {THEMES.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  )
}
