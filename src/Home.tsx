import { Alert } from './components/Alert'
import { THEMES, type Lane, type Theme } from './lanes'

function LaneCard({ lane }: { lane: Lane }) {
  return (
    <section className="lane" aria-labelledby={`${lane.id}-title`}>
      <h3 className="title-sm" id={`${lane.id}-title`}>
        {lane.title}
      </h3>
      <p className="lane-empty">No prototypes yet</p>
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

      <Alert variant="info" title="These are early prototypes">
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
