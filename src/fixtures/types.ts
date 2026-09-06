// Fake data shaped to match how Code Classroom and Code Club Projects actually
// work today. The point is not schema accuracy — it is that a prototype built
// on these types cannot quietly assume something the real products do not do.
//
// The important fact encoded here: there are TWO unconnected identity systems.
// See src/session for what that means in practice.

/**
 * A Raspberry Pi account — the standalone kind a young person sets up for
 * themselves, or the kind a mentor signs in with.
 *
 * Works on Code Club Projects. Does NOT get you into Code Classroom.
 * Crucially, a mentor has no visibility of or control over a young person's
 * own Pi account.
 */
export interface PiAccount {
  id: string
  name: string
  /** Mentors sign in with one of these; so do young people who self-register. */
  kind: 'mentor' | 'young-person'
  /** Self-registered accounts have an email. */
  email: string
}

/**
 * A Code Classroom student account. Created BY a mentor, so it needs no email
 * address — just a username and password, scoped to the club's school code.
 *
 * Works only in Code Classroom. A young person cannot use this to sign in to
 * Code Club Projects; bridging that would need a school code screen on Code
 * Club Projects, which does not exist yet.
 */
export interface ClassroomStudent {
  id: string
  name: string
  username: string
  /** The Code Classroom "school" this account belongs to. */
  schoolId: string
  classIds: string[]
  /**
   * Whether this young person ALSO has their own Pi account. Usually unknown to
   * the mentor in real life — included so import prototypes can explore what
   * happens when the two identities belong to the same person.
   */
  alsoHasPiAccountId?: string
}

/**
 * A "school", in Code Classroom's own terminology — the container that holds
 * classes and issues the school code. Called a school even when it is nothing
 * of the kind, which is itself one of the findings this repo exists to surface.
 *
 * A Code Club can sit at either level, and BOTH happen:
 *
 * - A community club (a library, a village hall) is its own school, with one or
 *   more classes beneath it.
 * - A school-based club is one class inside a school that already exists for
 *   formal teaching.
 *
 * So "does a club map to a school or to a class?" has no single answer, and a
 * mentor onboarding flow has to cope with both — including the case where the
 * mentor already has a Code Classroom school and is adding a club to it.
 */
export interface School {
  id: string
  name: string
  /**
   * What a young person types on the Code Classroom student login.
   *
   * Six digits in three hyphenated pairs — the live screen's own example is
   * "12-34-56". Not a memorable word-based code, which matters: a young person
   * has to read it off a board and type it correctly.
   */
  schoolCode: string
  country: string
  /**
   * Whether this exists only to run a Code Club, or is a real school that runs
   * formal lessons and a club side by side.
   */
  kind: 'code-club-only' | 'school'
  /** Pi accounts of the adults who run it. Teachers, in the school case. */
  mentorIds: string[]
}

export interface ClassGroup {
  id: string
  schoolId: string
  name: string
  /**
   * Whether this class is a Code Club session or a timetabled lesson. A school
   * can have both, sometimes containing the same young people.
   */
  kind: 'code-club' | 'lesson'
  studentIds: string[]
}

/** One step of a project: a markdown instruction page. */
export interface ProjectStep {
  title: string
  /** Markdown, as the real projects are authored. */
  body: string
}

/**
 * A Code Club Project. Importing one means bringing across its ordered
 * instruction steps AND its starter code template — not just a link.
 */
export interface Project {
  id: string
  title: string
  language: 'Scratch' | 'Python' | 'HTML'
  /** Rough age range the project is written for. */
  ages: string
  steps: ProjectStep[]
  starterCode: string
}
