import { Link } from 'react-router-dom'
import { Alert, Tag } from './kit'
import {
  CLASSROOM_STUDENTS,
  CLASS_GROUPS,
  CLUBS,
  PI_ACCOUNTS,
  PROJECTS,
  classesInClub,
  classroomStudent,
} from './fixtures'

/**
 * Every bit of fake data in one place, so a contributor can see what is
 * available without reading the fixture files.
 */
export function Debug() {
  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-lg">Fixture data</h1>
        <p className="body muted">
          The fake data prototypes build on, from <code>src/fixtures</code>. Import it with{' '}
          <code>import {'{'} CLUBS {'}'} from '../../fixtures'</code>.
        </p>
        <p className="body muted">
          <Link to="/">← All prototypes</Link>
        </p>
      </div>

      <Alert type="information" title="All of this is invented">
        <p className="body">
          No real young person, mentor, club or address appears in this repo, and none ever should.
          The names are deliberately awkward in places — long, non-Latin, apostrophes, two young
          people sharing a first name — because that is what catches layout and flow problems.
        </p>
      </Alert>

      <div className="theme-list">
        <section className="theme">
          <h2 className="title-md theme-head">Clubs</h2>
          <p className="body muted">
            A club maps to what Code Classroom calls a school, with classes beneath it. One club
            here runs two classes and one runs a single class, so no prototype can assume
            one-to-one.
          </p>
          {CLUBS.map((club) => (
            <div className="kit-card" key={club.id}>
              <div className="debug-row">
                <h3 className="title-sm">{club.name}</h3>
                <Tag text={`School code: ${club.schoolCode}`} variant="information" />
              </div>
              <p className="body muted">
                {club.country} · <code>{club.id}</code> · {club.mentorIds.length} mentor
                {club.mentorIds.length === 1 ? '' : 's'}
              </p>
              {classesInClub(club.id).map((group) => (
                <div key={group.id}>
                  <p className="body">
                    <strong>{group.name}</strong>{' '}
                    <span className="muted">
                      · {group.studentIds.length} young{' '}
                      {group.studentIds.length === 1 ? 'person' : 'people'}
                    </span>
                  </p>
                  <ul className="debug-list">
                    {group.studentIds.map((id) => {
                      const student = classroomStudent(id)
                      return (
                        <li key={id}>
                          {student?.name} <code>{student?.username}</code>
                          {student?.alsoHasPiAccountId && (
                            <> — also has their own Pi account</>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="theme">
          <h2 className="title-md theme-head">Pi accounts</h2>
          <p className="body muted">
            Works on Code Club Projects. Self-registered, so a mentor has no visibility of or
            control over a young person's own account.
          </p>
          <ul className="debug-list">
            {PI_ACCOUNTS.map((account) => (
              <li key={account.id}>
                {account.name} <code>{account.email}</code>{' '}
                <Tag text={account.kind === 'mentor' ? 'mentor' : 'young person'} />
              </li>
            ))}
          </ul>
        </section>

        <section className="theme">
          <h2 className="title-md theme-head">Code Classroom student accounts</h2>
          <p className="body muted">
            Created by a mentor, so no email address is needed — just a username and password,
            scoped to the club's school code. These do not work on Code Club Projects.
          </p>
          <ul className="debug-list">
            {CLASSROOM_STUDENTS.map((student) => (
              <li key={student.id}>
                {student.name} <code>{student.username}</code>{' '}
                <span className="muted">
                  {student.classIds.length} class{student.classIds.length === 1 ? '' : 'es'}
                </span>
              </li>
            ))}
          </ul>
          <p className="body muted">
            {CLASS_GROUPS.length} classes across {CLUBS.length} clubs.
          </p>
        </section>

        <section className="theme">
          <h2 className="title-md theme-head">Projects</h2>
          <p className="body muted">
            Importing one means bringing across its ordered markdown steps <em>and</em> its starter
            code template — not just a link.
          </p>
          {PROJECTS.map((project) => (
            <div className="kit-card" key={project.id}>
              <div className="debug-row">
                <h3 className="title-sm">{project.title}</h3>
                <Tag text={project.language} />
              </div>
              <p className="body muted">
                Ages {project.ages} · {project.steps.length} steps ·{' '}
                {project.starterCode.split('\n').length} lines of starter code
              </p>
              <ul className="debug-list">
                {project.steps.map((step) => (
                  <li key={step.title}>{step.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
