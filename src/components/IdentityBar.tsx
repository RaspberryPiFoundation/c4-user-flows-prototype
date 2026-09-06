import { useLocation, useParams } from 'react-router-dom'
import { CheckboxInput, SelectInput } from '../kit'
import { CLASSROOM_STUDENTS, PI_ACCOUNTS } from '../fixtures'
import { findPrototype } from '../prototypes/registry'
import { useSession } from '../session'

const NOBODY = ''

/** Which prototype is on screen, if any — so we can say who controls sign-in. */
function useCurrentPrototype() {
  const { pathname } = useLocation()
  const params = useParams()
  if (!pathname.startsWith('/p/')) return undefined
  const [, , lane, slug] = pathname.split('/')
  return findPrototype(params.lane ?? lane, params.slug ?? slug)
}

/**
 * Who you are, for the purposes of a prototype.
 *
 * Two dropdowns because there are two unconnected identity systems. Picking
 * someone does two things: signs them in, and fills their details into any
 * sign-in screen you meet, so demos do not involve retyping a six-digit code.
 *
 * A flow that signs people in itself starts signed out on purpose. It says so
 * rather than silently overriding what you picked.
 */
export function IdentityBar() {
  const {
    piAccount,
    classroomStudent,
    pickedPiAccount,
    pickedClassroomStudent,
    autofillEnabled,
    setAutofillEnabled,
    signInPiAccount,
    signOutPiAccount,
    signInClassroomStudent,
    signOutClassroomStudent,
    reset,
  } = useSession()

  const prototype = useCurrentPrototype()
  const ownsSignIn = prototype?.meta.ownsSignIn ?? false

  const describe = (
    signedIn: { name: string } | null,
    picked: { name: string } | null,
  ) => {
    if (signedIn) return signedIn.name
    if (picked) return `${picked.name} (signed out)`
    return 'nobody'
  }

  const summary = [
    `Pi account: ${describe(piAccount, pickedPiAccount)}`,
    `Code Classroom: ${describe(classroomStudent, pickedClassroomStudent)}`,
  ].join('  ·  ')

  return (
    <details className="identity-bar">
      <summary>
        <span className="identity-bar-label">You are</span>
        <span className="identity-bar-summary">{summary}</span>
      </summary>

      <div className="identity-bar-body">
        <p className="body muted">
          Two separate account systems. A Pi account works on Code Club Projects; a Code Classroom
          student account works only in Code Classroom. Being signed in to one tells you nothing
          about the other — which is the gap the import flows have to deal with.
        </p>

        {ownsSignIn && (
          <p className="identity-bar-notice">
            <strong>This prototype signs you in itself</strong>, so it starts signed out on
            purpose. Whoever you pick here is still used to fill in the school code and username
            for you.
          </p>
        )}

        <div className="identity-bar-fields">
          <SelectInput
            id="identity-pi"
            name="identity-pi"
            label="Pi account"
            hint="Self-registered. Mentors use one of these too."
            value={pickedPiAccount?.id ?? NOBODY}
            onChange={(e) =>
              e.target.value === NOBODY ? signOutPiAccount() : signInPiAccount(e.target.value)
            }
            options={[
              { key: NOBODY, value: 'Nobody' },
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
            value={pickedClassroomStudent?.id ?? NOBODY}
            onChange={(e) =>
              e.target.value === NOBODY
                ? signOutClassroomStudent()
                : signInClassroomStudent(e.target.value)
            }
            options={[
              { key: NOBODY, value: 'Nobody' },
              ...CLASSROOM_STUDENTS.map((s) => ({
                key: s.id,
                value: `${s.name} (${s.username})`,
              })),
            ]}
          />
        </div>

        <CheckboxInput
          id="autofill"
          name="autofill"
          label="Fill in sign-in screens for me"
          checked={autofillEnabled}
          onChange={(e) => setAutofillEnabled(e.target.checked)}
        />
        <p className="body muted small">
          Turn this off before a real testing session. Watching a young person type a six-digit
          code off a board is often the thing you are there to see.
        </p>

        <p className="body">
          <button className="link-button" onClick={reset}>
            Forget everything
          </button>
        </p>
      </div>
    </details>
  )
}
