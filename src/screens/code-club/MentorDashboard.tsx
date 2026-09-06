import { Alert, Button } from '../../kit'
import type { School } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'code-club',
  existsToday: true,
  verified: true,
  note: 'A mentor\'s home on codeclub.org. Where mentor onboarding starts, and the most likely place to surface Code Classroom.',
}

interface Props {
  clubsManaged: School[]
  /** e.g. "Pending volunteer request from London @ Name of Club". */
  pendingRequests: string[]
  onDismissRequest: (request: string) => void
  onCreateEvent: (schoolId: string) => void
  onManageClub: (schoolId: string) => void
  onViewPublicProfile: (schoolId: string) => void
  onStartAClub: () => void
  onFindAClub: () => void
  /** Whether this mentor volunteers at anyone else's club. */
  clubsVolunteeredAt?: School[]
}

/**
 * "Your Clubs" — the dashboard a mentor lands on.
 *
 * For the onboarding lane this is the most important screen on codeclub.org:
 * it is where a mentor already goes, and it is where a "set up Code Classroom"
 * route would most plausibly live. Note what it already competes with — events,
 * volunteers, the public profile — before adding anything.
 */
export function MentorDashboard({
  clubsManaged,
  pendingRequests,
  onDismissRequest,
  onCreateEvent,
  onManageClub,
  onViewPublicProfile,
  onStartAClub,
  onFindAClub,
  clubsVolunteeredAt = [],
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
                <p className="body muted">{club.venue}</p>
              </div>
              <div>
                <p className="body muted">{club.schedule}</p>
                <p className="body muted">{club.online ? 'Online Sessions' : 'In-person Sessions'}</p>
              </div>
            </div>
            <div className="cc-club-actions">
              <Button type="primary" text="Create an event" onClick={() => onCreateEvent(club.id)} />
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
              Why not explore our resources on <a href="#/screens">recruiting volunteers for your Club</a>
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
