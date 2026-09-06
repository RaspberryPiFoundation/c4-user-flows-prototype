import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Tag } from './kit'
import {
  MentorSignIn,
  RoleChooser,
  SchoolCodeEntry,
  StudentSignIn,
  mentorSignInMeta,
  roleChooserMeta,
  schoolCodeEntryMeta,
  studentSignInMeta,
  type ScreenMeta,
} from './screens'
import { SURFACES, Surface } from './surfaces'
import { SCHOOLS } from './fixtures'

const noop = () => {}

function Frame({
  name,
  meta,
  children,
}: {
  name: string
  meta: ScreenMeta
  children: React.ReactNode
}) {
  return (
    <section className="surface-demo" aria-labelledby={`sc-${name}`}>
      <div className="debug-row">
        <h2 className="title-md" id={`sc-${name}`}>
          {name}
        </h2>
        <Tag
          text={meta.existsToday ? 'Exists today' : 'Proposed'}
          variant={meta.existsToday ? 'success' : 'warning'}
        />
        {!meta.verified && <Tag text="Not verified" variant="warning" secondary />}
      </div>
      <p className="body muted">{meta.note}</p>
      <span className="surface-host">{SURFACES[meta.surface].host}</span>
      <Surface id={meta.surface} badge={meta.badge} layout={meta.layout}>
        {children}
      </Surface>
    </section>
  )
}

export function ScreenGallery() {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)

  const err = (message: string) => (showErrors ? message : undefined)
  const westlands = SCHOOLS[0]

  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-lg">Base screens</h1>
        <p className="body muted">
          The parts of the real products a prototype can reuse. Import them with{' '}
          <code>import {'{'} StudentSignIn {'}'} from '../../screens'</code>.
        </p>
        <p className="body muted">
          <Link to="/">← All prototypes</Link>
        </p>
      </div>

      <Alert type="information" title="The copy is the real copy">
        <p className="body">
          Nothing here has been softened for Code Club. "Teacher", "student", "your school" and
          "school code" are what these screens actually say — and watching a mentor or a young
          person hesitate at that language is worth far more than a rewrite that hides it.
        </p>
      </Alert>

      <div className="debug-row">
        <button className="link-button" onClick={() => setShowErrors((s) => !s)}>
          {showErrors ? 'Hide error states' : 'Show error states'}
        </button>
      </div>

      <div className="theme-list">
        <Frame name="Role chooser" meta={roleChooserMeta}>
          <RoleChooser
            onTeacher={noop}
            onStudent={noop}
            error={err('Something went wrong. Try again.')}
          />
        </Frame>

        <Frame name="School code entry" meta={schoolCodeEntryMeta}>
          <SchoolCodeEntry
            value={code}
            onChange={setCode}
            onContinue={noop}
            error={err(
              'Check the code and try again. It is six numbers, like 12-34-56, and your teacher can tell you what it is.',
            )}
          />
        </Frame>

        <Frame name="Student sign-in" meta={studentSignInMeta}>
          <StudentSignIn
            schoolCode={westlands.schoolCode}
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLogIn={noop}
            onChangeSchoolCode={noop}
            onGoogleLogIn={noop}
            error={err(
              'That username and password did not match. Ask your teacher to check them for you.',
            )}
          />
        </Frame>

        <Frame name="Mentor sign-in" meta={mentorSignInMeta}>
          <MentorSignIn
            email=""
            password=""
            onEmailChange={noop}
            onPasswordChange={noop}
            onLogIn={noop}
            error={err('That email address and password did not match.')}
          />
        </Frame>
      </div>
    </div>
  )
}
