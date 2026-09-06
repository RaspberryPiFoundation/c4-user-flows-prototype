import { Alert, Button } from '../../kit'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  layout: 'centred',
  existsToday: true,
  verified: true,
  note: 'The first thing anyone signing in to Code Classroom sees. "I\'m a student" hands off to Pi Accounts.',
}

interface Props {
  onTeacher: () => void
  onStudent: () => void
  error?: string
}

/**
 * "Are you a teacher or a student?" — Code Classroom's sign-in fork.
 *
 * Copy is the real thing, not softened for Code Club. A volunteer mentor is
 * not a teacher and a club member is not a student, and watching someone
 * hesitate here is worth more than a rewrite that hides it.
 */
export function RoleChooser({ onTeacher, onStudent, error }: Props) {
  return (
    <div className="login-card">
      <div className="login-card-head">
        <p className="login-card-eyebrow">Code Classroom</p>
        <h1 className="title-md">Are you a teacher or a student?</h1>
      </div>
      <div className="login-card-body">
        {error && (
          <div role="alert">
            <Alert type="error" title="We could not sign you in" text={error} />
          </div>
        )}
        <div className="login-card-actions">
          <Button type="secondary" text="I'm a teacher" onClick={onTeacher} />
          <Button type="primary" text="I'm a student" onClick={onStudent} />
        </div>
        <p className="body">
          <a href="#/screens">Back to Code Classroom home</a>
        </p>
      </div>
    </div>
  )
}
