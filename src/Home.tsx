import { Alert, Button } from './kit'
import { THEMES, type Lane, type Theme } from './lanes'
import { prototypesInLane } from './prototypes/registry'

function LaneCard({ lane }: { lane: Lane }) {
  const prototypes = prototypesInLane(lane.id)

  return (
    <section className="lane" aria-labelledby={`${lane.id}-title`}>
      <h3 className="title-sm lane-heading" id={`${lane.id}-title`}>
        {lane.title}
      </h3>

      {prototypes.length === 0 ? (
        <p className="lane-empty">No prototypes yet</p>
      ) : (
        <div className="proto-list">
          {prototypes.map((prototype) => (
            <div className="proto-card" key={prototype.slug}>
              <div className="proto-card-text">
                <h4 className="title-sm">{prototype.meta.title}</h4>
                {/* The hypothesis, not a description. What someone believes is
                    more use than what the screens look like, and it is what
                    makes a list of variants worth reading. */}
                <p className="body muted">{prototype.meta.hypothesis}</p>
                <p className="proto-meta">{prototype.meta.owner}</p>
              </div>
              {/* An href rather than a click handler, so middle-click and
                  "open in new tab" work — people compare variants side by
                  side. */}
              <Button type="primary" text="Try this" href={`#/p/${prototype.lane}/${prototype.slug}`} />
            </div>
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

      <div className="theme-list">
        {THEMES.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  )
}
