import { Alert, Button, Card, PasswordInput } from '../../../kit'

// First sign-in: choose your own password.
//
// UNVERIFIED. Something like this has to exist — a mentor creates the account
// and hands over a password, so the young person has to be able to change it.
// Nobody on the team has seen the real screen, so treat the details as wrong.
//
// Worth noticing in a club: recovery for these accounts runs entirely through
// the mentor ("ask your teacher to reset it for you"). A young person who
// picks a password here on a Saturday morning and forgets it has no way back
// without the mentor who is not there until the next session.

interface Props {
  password: string
  confirm: string
  onPasswordChange: (value: string) => void
  onConfirmChange: (value: string) => void
  onSave: () => void
  error?: string
}

export function UpdatePassword({
  password,
  confirm,
  onPasswordChange,
  onConfirmChange,
  onSave,
  error,
}: Props) {
  return (
    <Card>
      <h1 className="title-md">Choose a new password</h1>
      <p className="body muted">
        This is the first time you have logged in. Pick a password you will remember.
      </p>

      {error && (
        <div role="alert">
          <Alert type="error" title="Check your password">
            <p className="body">{error}</p>
          </Alert>
        </div>
      )}

      <PasswordInput
        id="new-password"
        name="new-password"
        label="New password"
        fullWidth
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onPasswordChange(event.target.value)
        }
      />
      <PasswordInput
        id="confirm-password"
        name="confirm-password"
        label="Type it again"
        fullWidth
        value={confirm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onConfirmChange(event.target.value)
        }
      />

      <Button type="primary" text="Save and carry on" onClick={onSave} />
    </Card>
  )
}
