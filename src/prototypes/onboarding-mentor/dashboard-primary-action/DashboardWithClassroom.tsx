import { Alert, Button } from '../../../kit'
import type { School } from '../../../fixtures'

// A COPY of screens/code-club/MentorDashboard, changed here rather than there.
//
// The shared screen has no prop for another club action, and the change this
// prototype is making is not a prop — it is a reordering of the card's
// actions, which is the whole hypothesis. So it is copied in, per the repo
// rule: never edit a shared screen, copy it and change your copy.
//
// What is different from the live dashboard:
//
// - "Code Classroom" is the primary button on each club card, first in the row.
// - "Create an event" is gone from the card entirely. That is a real cost, not
//   a detail — events are how a club fills its sessions and how Code Club
//   counts activity — and it is the trade this variant is making on purpose.
// - Nothing on the card is labelled as a proposal. The page reads as if it
//   shipped, so a mentor in a session reacts to the product rather than to a
//   prototype. What is and is not real is in notes.md.
//
// Everything else is left exactly as the shared screen has it.

interface Props {
  clubsManaged: School[]
  pendingRequests: string[]
  onDismissRequest: (request: string) => void
  onManageClub: (schoolId: string) => void
  onViewPublicProfile: (schoolId: string) => void
  onStartAClub: () => void
  onFindAClub: () => void
  clubsVolunteeredAt?: School[]
  /** Which of these clubs already has a Code Classroom behind it. */
  isSetUp: (schoolId: string) => boolean
  onCodeClassroom: (schoolId: string) => void
}

export function DashboardWithClassroom({
  clubsManaged,
  pendingRequests,
  onDismissRequest,
  onManageClub,
  onViewPublicProfile,
  onStartAClub,
  onFindAClub,
  clubsVolunteeredAt = [],
  isSetUp,
  onCodeClassroom,
}: Props) {
  return (
    <div className="cc-dash">
      <aside className="cc-dash-side">
        <h2 className="title-sm">Club homepage</h2>
        <nav className="cc-dash-nav" aria-label="Club homepage">
          <span className="cc-dash-nav-item active">Your Clubs</span>
          <span className="cc-dash-nav-item">Your information</span>
          <span className="cc-dash-nav-item">Club support</span>
        </nav>
        <hr className="divider" />
        <nav className="cc-dash-nav" aria-label="More">
          <button className="link-button" onClick={onFindAClub}>
            Find a Club
          </button>
          <button className="link-button" onClick={onStartAClub}>
            Start a Club
          </button>
        </nav>
      </aside>

      <div className="cc-dash-main">
        <h1 className="title-lg cc-dash-title">Your Clubs</h1>

        {pendingRequests.map((request) => (
          <Alert
            key={request}
            type="information"
            text={request}
            closable
            onClose={() => onDismissRequest(request)}
          />
        ))}

        <div className="cc-section-head">
          <h2 className="title-sm">Clubs you manage</h2>
          <button className="link-button" onClick={onStartAClub}>
            Start a Club
          </button>
        </div>

        {clubsManaged.map((club) => (
          <div className="cc-club-card" key={club.id}>
            <div className="cc-club-head">{club.name}</div>
            <div className="cc-club-body">
              <div>
                <p className="body">
                  <strong>Nearest 4.5 miles</strong>
                </p>
                <p className="body muted">{club.venue ?? 'No venue set'}</p>
              </div>
              <div>
                <p className="body muted">{club.schedule ?? 'No sessions scheduled'}</p>
                <p className="body muted">
                  {club.online ? 'Online Sessions' : 'In-person Sessions'}
                </p>
              </div>
            </div>
            <div className="cc-club-actions">
              {/* The proposal. Primary, and first — a mentor arriving with
                  "what are we doing on Thursday?" should not have to know
                  the words "Manage club". "Create an event" is not here at
                  all: this variant gives the card's top slot to Code
                  Classroom rather than sharing it. */}
              <Button
                type="primary"
                text={isSetUp(club.id) ? 'Open Code Classroom' : 'Set up Code Classroom'}
                onClick={() => onCodeClassroom(club.id)}
              />
              <Button type="secondary" text="Manage club" onClick={() => onManageClub(club.id)} />
              <Button
                type="secondary"
                text="View public profile"
                onClick={() => onViewPublicProfile(club.id)}
              />
            </div>
          </div>
        ))}

        <div className="cc-section-head">
          <h2 className="title-sm">Clubs you volunteer at</h2>
          <button className="link-button" onClick={onFindAClub}>
            Find a club
          </button>
        </div>

        {clubsVolunteeredAt.length === 0 ? (
          <div className="cc-empty">
            <h3 className="title-sm">You have not volunteered at any Clubs</h3>
            <p className="body muted">
              Why not explore our resources on{' '}
              <a href="#/screens">recruiting volunteers for your Club</a>
            </p>
          </div>
        ) : (
          <ul className="cc-list">
            {clubsVolunteeredAt.map((club) => (
              <li className="cc-row" key={club.id}>
                {club.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
