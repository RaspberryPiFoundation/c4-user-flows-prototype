import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
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
// PICKED vs SIGNED IN. These are different, and conflating them is what made
// the identity bar confusing:
//
//   picked    who you told the prototype you are. Survives signing out, so a
//             flow that starts signed out can still autofill their details.
//   signedIn  who the fiction currently has signed in. A sign-in flow starts
//             this empty and fills it in as you go.
//
// So you can pick "Amara Kimani" at the top, open a flow that starts signed
// out, and still have her school code and username typed in for you.

interface Session {
  /** Signed in to Code Club Projects (or, for a mentor, to Code Classroom). */
  piAccount: PiAccount | null
  /** Signed in to Code Classroom as a young person. */
  classroomStudent: ClassroomStudent | null

  /** Who you picked at the top, whether or not they are signed in. */
  pickedPiAccount: PiAccount | null
  pickedClassroomStudent: ClassroomStudent | null

  /**
   * Details for the person you picked, so a sign-in screen can be filled in
   * for you instead of retyping a six-digit code at every demo.
   *
   * Empty strings when nothing is picked, or when autofill is switched off —
   * which you want during a real testing session, where watching someone type
   * the code IS the thing being tested.
   */
  autofill: { schoolCode: string; username: string; password: string }
  autofillEnabled: boolean
  setAutofillEnabled: (enabled: boolean) => void

  /** Pick someone and sign them in. What the bar at the top does. */
  signInPiAccount: (id: string) => void
  signInClassroomStudent: (id: string) => void
  signOutPiAccount: () => void
  signOutClassroomStudent: () => void

  /**
   * Sign out of both but KEEP who you picked. What a sign-in flow calls on
   * mount: the fiction starts signed out, the autofill still knows who you are.
   */
  startSignedOut: () => void

  /** Forget everything, including the pick. */
  reset: () => void
}

const SessionContext = createContext<Session | null>(null)

// sessionStorage, not localStorage: a refresh mid-flow keeps you where you
// were, but closing the tab starts the next person from scratch.
const STORAGE_KEY = 'c4-prototype-session'

interface Stored {
  piAccountId: string | null
  classroomStudentId: string | null
  pickedPiAccountId: string | null
  pickedClassroomStudentId: string | null
  autofillEnabled: boolean
}

const EMPTY: Stored = {
  piAccountId: null,
  classroomStudentId: null,
  pickedPiAccountId: null,
  pickedClassroomStudentId: null,
  autofillEnabled: true,
}

function read(): Stored {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Stored>) }
  } catch {
    // A corrupt or unavailable store should never break a prototype.
    return EMPTY
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored>(read)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // Private browsing can refuse writes. Not worth failing over.
    }
  }, [stored])

  const signInPiAccount = useCallback((id: string) => {
    setStored((s) => ({ ...s, piAccountId: id, pickedPiAccountId: id }))
  }, [])
  const signInClassroomStudent = useCallback((id: string) => {
    setStored((s) => ({ ...s, classroomStudentId: id, pickedClassroomStudentId: id }))
  }, [])
  const signOutPiAccount = useCallback(() => {
    setStored((s) => ({ ...s, piAccountId: null, pickedPiAccountId: null }))
  }, [])
  const signOutClassroomStudent = useCallback(() => {
    setStored((s) => ({ ...s, classroomStudentId: null, pickedClassroomStudentId: null }))
  }, [])
  const startSignedOut = useCallback(() => {
    setStored((s) => ({ ...s, piAccountId: null, classroomStudentId: null }))
  }, [])
  const reset = useCallback(() => setStored(EMPTY), [])
  const setAutofillEnabled = useCallback((enabled: boolean) => {
    setStored((s) => ({ ...s, autofillEnabled: enabled }))
  }, [])

  const value = useMemo<Session>(() => {
    const pickedStudent = stored.pickedClassroomStudentId
      ? classroomStudent(stored.pickedClassroomStudentId) ?? null
      : null
    const pickedSchool = pickedStudent ? school(pickedStudent.schoolId) : undefined

    return {
      piAccount: stored.piAccountId ? piAccount(stored.piAccountId) ?? null : null,
      classroomStudent: stored.classroomStudentId
        ? classroomStudent(stored.classroomStudentId) ?? null
        : null,
      pickedPiAccount: stored.pickedPiAccountId
        ? piAccount(stored.pickedPiAccountId) ?? null
        : null,
      pickedClassroomStudent: pickedStudent,
      autofill:
        stored.autofillEnabled && pickedStudent
          ? {
              schoolCode: pickedSchool?.schoolCode ?? '',
              username: pickedStudent.username,
              // Visibly not a real password, because nobody should ever type
              // one of those into this.
              password: 'not-a-real-password',
            }
          : { schoolCode: '', username: '', password: '' },
      autofillEnabled: stored.autofillEnabled,
      setAutofillEnabled,
      signInPiAccount,
      signInClassroomStudent,
      signOutPiAccount,
      signOutClassroomStudent,
      startSignedOut,
      reset,
    }
  }, [
    stored,
    setAutofillEnabled,
    signInPiAccount,
    signInClassroomStudent,
    signOutPiAccount,
    signOutClassroomStudent,
    startSignedOut,
    reset,
  ])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used inside a SessionProvider')
  return session
}
