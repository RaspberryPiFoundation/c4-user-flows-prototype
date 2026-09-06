import { SelectInput } from '../kit'
import { CLASSROOM_STUDENTS, PI_ACCOUNTS } from '../fixtures'
import { useSession } from '../session'

const SIGNED_OUT = ''

/**
 * Prototype tooling for switching who you are signed in as — the two identity
 * systems separately, because they really are separate.
 *
 * Collapsed by default. In a testing session the person in front of you should
 * be looking at the flow, not at a control panel; but the summary line still
 * says who you are, so you can check at a glance without opening it.
 */
export function IdentityBar() {
  const {
    piAccount,
    classroomStudent,
    signInPiAccount,
    signOutPiAccount,
    signInClassroomStudent,
    signOutClassroomStudent,
    reset,
  } = useSession()

  const summary = [
    `Pi account: ${piAccount ? piAccount.name : 'signed out'}`,
    `Code Classroom: ${classroomStudent ? classroomStudent.username : 'signed out'}`,
  ].join('  ·  ')

  return (
    <details className="identity-bar">
      <summary>
        <span className="identity-bar-label">Signed in as</span>
        <span className="identity-bar-summary">{summary}</span>
      </summary>

      <div className="identity-bar-body">
        <p className="body muted">
          These are two separate account systems. A Pi account works on Code Club Projects; a Code
          Classroom student account works only in Code Classroom. Being signed in to one tells you
          nothing about the other — which is the gap the import flows have to deal with.
        </p>

        <div className="identity-bar-fields">
          <SelectInput
            id="identity-pi"
            name="identity-pi"
            label="Pi account"
            hint="Self-registered. Mentors use one of these too."
            value={piAccount?.id ?? SIGNED_OUT}
            onChange={(e) =>
              e.target.value === SIGNED_OUT
                ? signOutPiAccount()
                : signInPiAccount(e.target.value)
            }
            options={[
              { key: SIGNED_OUT, value: 'Signed out' },
              ...PI_ACCOUNTS.map((a) => ({
                key: a.id,
                value: `${a.name} (${a.kind === 'mentor' ? 'mentor' : 'young person'})`,
              })),
            ]}
          />

          <SelectInput
            id="identity-classroom"
            name="identity-classroom"
            label="Code Classroom student"
            hint="Created by a mentor. Username, no email."
            value={classroomStudent?.id ?? SIGNED_OUT}
            onChange={(e) =>
              e.target.value === SIGNED_OUT
                ? signOutClassroomStudent()
                : signInClassroomStudent(e.target.value)
            }
            options={[
              { key: SIGNED_OUT, value: 'Signed out' },
              ...CLASSROOM_STUDENTS.map((s) => ({
                key: s.id,
                value: `${s.name} (${s.username})`,
              })),
            ]}
          />
        </div>

        <p className="body">
          <button className="link-button" onClick={reset}>
            Sign out of both
          </button>
        </p>
      </div>
    </details>
  )
}
