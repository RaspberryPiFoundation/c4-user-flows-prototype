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
  /** The club (a "school", in Code Classroom's model) this account belongs to. */
  clubId: string
  classIds: string[]
  /**
   * Whether this young person ALSO has their own Pi account. Usually unknown to
   * the mentor in real life — included so import prototypes can explore what
   * happens when the two identities belong to the same person.
   */
  alsoHasPiAccountId?: string
}

/**
 * A Code Club. In Code Classroom's model a club maps to a "school", with
 * classes beneath it — hence the school code.
 *
 * Whether one club should be one class or many is an open question (see
 * digital-code-club#1205), so the fixtures deliberately include both shapes.
 */
export interface Club {
  id: string
  name: string
  /** What a young person types on the Code Classroom student login. */
  schoolCode: string
  country: string
  mentorIds: string[]
}

export interface ClassGroup {
  id: string
  clubId: string
  name: string
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
