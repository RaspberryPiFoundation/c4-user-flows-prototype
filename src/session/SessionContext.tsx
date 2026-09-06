import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { classroomStudent, piAccount } from '../fixtures'
import type { ClassroomStudent, PiAccount } from '../fixtures'

// A fake sign-in state for prototypes. Nothing is authenticated, nothing
// leaves the browser, and no password is ever checked.
//
// THE IMPORTANT BIT: there are two identities, not one, and they are
// independent. Code Club Projects uses a standalone Pi account; Code Classroom
// uses a mentor-created student account. A young person can be signed in to
// one, both, or neither, and being signed in to one tells you nothing about
// the other.
//
// If this were a single `currentUser`, every import prototype would silently
// assume a bridge between the two products that does not exist.

interface Session {
  /** Signed in to Code Club Projects (or, for a mentor, to Code Classroom). */
  piAccount: PiAccount | null
  /** Signed in to Code Classroom as a young person. */
  classroomStudent: ClassroomStudent | null
  signInPiAccount: (id: string) => void
  signOutPiAccount: () => void
  signInClassroomStudent: (id: string) => void
  signOutClassroomStudent: () => void
  /** Sign out of both. Useful at the start of a testing session. */
  reset: () => void
}

const SessionContext = createContext<Session | null>(null)

// sessionStorage, not localStorage: a refresh mid-flow keeps you where you
// were, but closing the tab starts the next person from scratch.
const STORAGE_KEY = 'c4-prototype-session'

interface StoredSession {
  piAccountId: string | null
  classroomStudentId: string | null
}

function read(): StoredSession {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { piAccountId: null, classroomStudentId: null }
    const parsed = JSON.parse(raw) as Partial<StoredSession>
    return {
      piAccountId: parsed.piAccountId ?? null,
      classroomStudentId: parsed.classroomStudentId ?? null,
    }
  } catch {
    // A corrupt or unavailable store should never break a prototype.
    return { piAccountId: null, classroomStudentId: null }
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredSession>(read)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // Private browsing can refuse writes. Not worth failing over.
    }
  }, [stored])

  const signInPiAccount = useCallback((id: string) => {
    setStored((s) => ({ ...s, piAccountId: id }))
  }, [])
  const signOutPiAccount = useCallback(() => {
    setStored((s) => ({ ...s, piAccountId: null }))
  }, [])
  const signInClassroomStudent = useCallback((id: string) => {
    setStored((s) => ({ ...s, classroomStudentId: id }))
  }, [])
  const signOutClassroomStudent = useCallback(() => {
    setStored((s) => ({ ...s, classroomStudentId: null }))
  }, [])
  const reset = useCallback(() => {
    setStored({ piAccountId: null, classroomStudentId: null })
  }, [])

  const value = useMemo<Session>(
    () => ({
      piAccount: stored.piAccountId ? piAccount(stored.piAccountId) ?? null : null,
      classroomStudent: stored.classroomStudentId
        ? classroomStudent(stored.classroomStudentId) ?? null
        : null,
      signInPiAccount,
      signOutPiAccount,
      signInClassroomStudent,
      signOutClassroomStudent,
      reset,
    }),
    [
      stored,
      signInPiAccount,
      signOutPiAccount,
      signInClassroomStudent,
      signOutClassroomStudent,
      reset,
    ],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used inside a SessionProvider')
  return session
}
