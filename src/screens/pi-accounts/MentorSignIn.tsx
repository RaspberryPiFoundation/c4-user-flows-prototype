import { Alert, Button, PasswordInput, TextInput } from '../../kit'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'pi-accounts',
  layout: 'centred',
  existsToday: true,
  // Behind a login, so this is built from the pattern rather than the article.
  verified: false,
  note: 'The standard Pi Accounts sign-in, which is where "I\'m a teacher" leads. NOT VERIFIED — built from the pattern, so the details are probably wrong.',
}

interface Props {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onLogIn: () => void
  error?: string
}

/**
 * The mentor's way in: an ordinary Raspberry Pi account with an email address.
 *
 * Worth contrasting with StudentSignIn — a mentor can reset their own
 * password, a young person cannot. That asymmetry is the whole reason the two
 * identity systems exist, and it is also what gives a mentor oversight.
 */
export function MentorSignIn({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogIn,
  error,
}: Props) {
  return (
    <div className="login-card">
      <div className="login-card-head">
        <p className="login-card-eyebrow">Raspberry Pi</p>
        <h1 className="title-md">Log in</h1>
        <p className="body">Use your Raspberry Pi account.</p>
      </div>
      <div className="login-card-body">
        {error && (
          <div role="alert">
            <Alert type="error" title="We could not log you in" text={error} />
          </div>
        )}
        <TextInput
          id="mentor-email"
          name="mentor-email"
          label="Email address"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <PasswordInput
          id="mentor-password"
          label="Password"
          fullWidth
          value={password}
          forgotPasswordHref="#/screens"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <div className="login-card-actions end">
          <Button type="primary" text="Log in" onClick={onLogIn} />
        </div>
      </div>
    </div>
  )
}
