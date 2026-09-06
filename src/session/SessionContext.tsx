import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { classroomStudent, piAccount, school } from '../fixtures'
import type { ClassroomStudent, PiAccount } from '../fixtures'

// A fake sign-in state for prototypes. Nothing is authenticated, nothing
// leaves the browser, and no password is ever checked.
//
// TWO IDENTITIES, NOT ONE. Code Club Projects uses a standalone Pi account;
// Code Classroom uses a mentor-created student account. A young person can be
// signed in to one, both, or neither, and being signed in to one tells you
// nothing about the other. A single `currentUser` would let every import
// prototype silently assume a bridge between the products that does not exist.
//
// WHO DECIDES. The prototype does, via `cast` in its meta.ts. There is no
// picker in the workbench, on purpose: when a viewer could swap the cast
// mid-story, every author had to write a flow that coped with every fixture
// combination — and the first one written did not, which is how this design
// got simplified.

interface Session {
  /** Signed in to Code Club Projects (or, for a mentor, to Code Classroom). */
  piAccount: PiAccount | null
  /** Signed in to Code Classroom as a young person. */
  classroomStudent: ClassroomStudent | null

  /**
   * Details for this prototype's cast, so a sign-in screen can be filled in
   * rather than retyped at every demo.
   *
   * Empty when `?autofill=0` is in the URL — which is what you want in a real
   * testing session, where watching someone type the code IS the thing being
   * tested. Put it in the link you send them, alongside `?full=1`.
   */
  autofill: { schoolCode: string; username: string; password: string }

  /**
   * Put the prototype's cast in place. Called by the workbench when a
   * prototype loads — a prototype should not need to call this itself.
   */
  applyCast: (cast: { piAccount?: string; classroomStudent?: string } | undefined, ownsSignIn: boolean) => void

  /** Sign someone in mid-flow. What a sign-in screen's submit handler calls. */
  signInPiAccount: (id: string) => void
  signInClassroomStudent: (id: string) => void
}

const SessionContext = createContext<Session | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [piAccountId, setPiAccountId] = useState<string | null>(null)
  const [classroomStudentId, setClassroomStudentId] = useState<string | null>(null)
  /** The cast, whether or not it is signed in — this is what autofill reads. */
  const [castStudentId, setCastStudentId] = useState<string | null>(null)
  const [params] = useSearchParams()
  const autofillEnabled = params.get('autofill') !== '0'

  const applyCast = useCallback(
    (cast: { piAccount?: string; classroomStudent?: string } | undefined, ownsSignIn: boolean) => {
      setCastStudentId(cast?.classroomStudent ?? null)
      if (ownsSignIn) {
        // The flow signs people in itself, so start the fiction empty. The
        // cast is still known, so the fields can be filled in.
        setPiAccountId(null)
        setClassroomStudentId(null)
        return
      }
      setPiAccountId(cast?.piAccount ?? null)
      setClassroomStudentId(cast?.classroomStudent ?? null)
    },
    [],
  )

  const signInPiAccount = useCallback((id: string) => setPiAccountId(id), [])
  const signInClassroomStudent = useCallback((id: string) => setClassroomStudentId(id), [])

  const value = useMemo<Session>(() => {
    const castStudent = castStudentId ? classroomStudent(castStudentId) ?? null : null
    const castSchool = castStudent ? school(castStudent.schoolId) : undefined

    return {
      piAccount: piAccountId ? piAccount(piAccountId) ?? null : null,
      classroomStudent: classroomStudentId ? classroomStudent(classroomStudentId) ?? null : null,
      autofill:
        autofillEnabled && castStudent
          ? {
              schoolCode: castSchool?.schoolCode ?? '',
              username: castStudent.username,
              // Visibly not a real password, because nobody should ever type
              // one of those into this.
              password: 'not-a-real-password',
            }
          : { schoolCode: '', username: '', password: '' },
      applyCast,
      signInPiAccount,
      signInClassroomStudent,
    }
  }, [
    piAccountId,
    classroomStudentId,
    castStudentId,
    applyCast,
    signInPiAccount,
    signInClassroomStudent,
  ])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used inside a SessionProvider')
  return session
}
