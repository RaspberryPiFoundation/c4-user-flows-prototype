import { CheckboxInput } from '../kit'
import { school } from '../fixtures'
import { useSession } from '../session'

/**
 * A read-only statement of who is signed in, plus the one control that is
 * genuinely a viewing preference.
 *
 * There is no person picker here on purpose. Who a prototype is about is
 * declared by the prototype (`cast` in its meta.ts), because it is the author
 * who knows the story. When the workbench let a viewer swap the cast, every
 * author had to write a flow that coped with every fixture combination —
 * eleven students across three clubs — and the first flow written did not.
 *
 * To see a flow as someone else, change one line in the prototype.
 */
export function IdentityBar() {
  const { piAccount, classroomStudent, autofillEnabled, setAutofillEnabled } = useSession()

  const studentSchool = classroomStudent ? school(classroomStudent.schoolId) : undefined

  const summary = piAccount || classroomStudent ? null : 'Signed out'

  return (
    <details className="identity-bar">
      <summary>
        <span className="identity-bar-label">Signed in as</span>
        <span className="identity-bar-summary">
          {summary ?? (
            <>
              {piAccount && <>Pi account: {piAccount.name}</>}
              {piAccount && classroomStudent && '  ·  '}
              {classroomStudent && (
                <>
                  Code Classroom: {classroomStudent.username}
                  {studentSchool && ` at ${studentSchool.name}`}
                </>
              )}
            </>
          )}
        </span>
      </summary>

      <div className="identity-bar-body">
        <p className="body muted">
          Two separate account systems. A Pi account works on Code Club Projects; a Code Classroom
          student account works only in Code Classroom. Being signed in to one tells you nothing
          about the other — which is the gap the import flows have to deal with.
        </p>
        <p className="body muted">
          Who a prototype is about is set by the prototype, in its <code>meta.ts</code>. To see a
          flow as someone else, change <code>cast</code> there. See <a href="#/debug">#/debug</a>{' '}
          for everyone available.
        </p>

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
      </div>
    </details>
  )
}
