import { Accordion, Alert, Button, PasswordInput, TextInput } from '../../kit'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'pi-accounts',
  badge: 'Code Classroom',
  layout: 'centred',
  existsToday: true,
  verified: true,
  note: 'Username and password AND Google sign-in on one screen. Echoes the school code back, not the school name.',
}

interface Props {
  /** Echoed back so the young person can check they are in the right place. */
  schoolCode: string
  username: string
  password: string
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onLogIn: () => void
  onChangeSchoolCode: () => void
  onGoogleLogIn: () => void
  error?: string
}

/**
 * "Log in to your school" — the Code Classroom student sign-in.
 *
 * Three things here are worth noticing rather than smoothing over:
 *
 * 1. It offers BOTH a mentor-created username and a school Google account. A
 *    club member will not have the latter, so half this screen is noise to
 *    them — and worse, a question they cannot answer.
 * 2. It echoes back the school CODE, not the school or club name. "59-97-90"
 *    does not reassure a young person that they are in the right place.
 * 3. Password recovery runs entirely through the mentor: "ask your teacher to
 *    reset it for you". No email, no self-service. In a volunteer-run club with
 *    rotating mentors, that is a real way to be locked out of a session.
 */
export function StudentSignIn({
  schoolCode,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLogIn,
  onChangeSchoolCode,
  onGoogleLogIn,
  error,
}: Props) {
  return (
    <div className="login-card">
      <div className="login-card-head">
        <p className="login-card-eyebrow">Code Classroom</p>
        <h1 className="title-md">Log in to your school</h1>
        <p className="body">Use your school Google account or your username and password.</p>
        <p className="body">
          <strong>School code: {schoolCode}</strong>
        </p>
        <p className="body small">
          Not your school?{' '}
          <button className="link-button" onClick={onChangeSchoolCode}>
            Enter a different school code
          </button>
        </p>
      </div>

      <div className="login-card-body">
        {error && (
          <div role="alert">
            <Alert type="error" title="We could not log you in" text={error} />
          </div>
        )}

        <p className="body">If your teacher gave you a username and password, use this.</p>

        <TextInput
          id="student-username"
          name="student-username"
          label="Student username"
          fullWidth
          hint="For example, student123"
          value={username}
          error={error ? ' ' : undefined}
          onChange={(e) => onUsernameChange(e.target.value)}
        />

        <PasswordInput
          id="student-password"
          label="Password"
          fullWidth
          hint="If you have forgotten your password, ask your teacher to reset it for you"
          value={password}
          error={error ? ' ' : undefined}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <div className="login-card-actions end">
          <Button type="primary" text="Log in" onClick={onLogIn} />
        </div>

        <div className="or-divider">
          <span className="line" />
          <span>or</span>
          <span className="line" />
        </div>

        <p className="body">
          If your teacher told you to use your school Google account, use this instead.
        </p>
        <Button type="secondary" text="Log in with Google" fullWidth onClick={onGoogleLogIn} />

        <Accordion
          id="google-trouble"
          className=""
          title="Having trouble using Google?"
          content={
            <p className="body">
              Ask your teacher which way you should log in.
            </p>
          }
        />
      </div>

      <div className="login-card-foot">
        <strong>Not sure how to log in? Ask your teacher.</strong>
      </div>
    </div>
  )
}
