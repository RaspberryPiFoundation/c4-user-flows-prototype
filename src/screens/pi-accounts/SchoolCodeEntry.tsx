import { Alert, Button, TextInput } from '../../kit'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'pi-accounts',
  badge: 'Code Classroom',
  layout: 'centred',
  existsToday: true,
  verified: true,
  note: 'Served by Pi Accounts, badged Code Classroom. Six digits in hyphenated pairs, read off a board and typed in.',
}

interface Props {
  value: string
  onChange: (value: string) => void
  onContinue: () => void
  error?: string
}

/**
 * "Enter your school code" — the first thing a young person does, unless their
 * mentor shared a direct link that skips it.
 *
 * The code is six digits, so this is a transcription task for a 9-year-old:
 * read it off a board, get it exactly right. That makes the error state at
 * least as important as the happy path.
 */
export function SchoolCodeEntry({ value, onChange, onContinue, error }: Props) {
  return (
    <div className="login-card">
      <div className="login-card-head">
        <p className="login-card-eyebrow">Code Classroom</p>
        <h1 className="title-md">Enter your school code</h1>
      </div>
      <div className="login-card-body">
        {error && (
          <div role="alert">
            <Alert type="error" title="We could not find that school code" text={error} />
          </div>
        )}
        <TextInput
          id="school-code"
          name="school-code"
          label="School code"
          fullWidth
          hint="For example, 12-34-56. Your teacher will be able to tell you your school code."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="login-card-actions end">
          <Button type="primary" text="Continue" onClick={onContinue} />
        </div>
      </div>
    </div>
  )
}
