// The shape every prototype declares in its own `meta.ts`.
//
// `lane` and `slug` are deliberately NOT part of this — they are derived from
// the folder path in registry.ts, so they can never drift out of sync with
// where the prototype actually lives.

/**
 * Where a prototype has got to.
 *
 * Deliberately NOT shown anywhere in the interface. Labelling every card with
 * "sketch" or "explored" reads as a judgement on the person who made it, and
 * nobody needs that on their own work. It is here as data, for pulling the
 * shortlist together when it is time to decide what goes in front of users.
 */
export type PrototypeStatus =
  /** Being built. Not ready for anyone else to look at. */
  | 'sketch'
  /** Finished enough to show the team and compare against others. */
  | 'explored'
  /** Shortlisted to put in front of mentors or young people. */
  | 'marked-for-testing'
  /** Has been through a testing session — see notes.md for what happened. */
  | 'tested'
  /** Not being taken further. Left here because the thinking is still useful. */
  | 'parked'

export interface PrototypeMeta {
  /** Short label for the card on the landing page. */
  title: string
  /** Who built it, so people know who to ask. */
  owner: string
  /** What you think is true, that this prototype is meant to test. */
  hypothesis: string
  status: PrototypeStatus
  /**
   * Who this prototype is about.
   *
   * A prototype is a story — "Amara, at Westlands, joins for the first time" —
   * and the author knows who it stars. Declaring it here means the workbench
   * signs them in for you, fills their details into sign-in screens, and can
   * never disagree with what your flow assumes.
   *
   * Ids come from src/fixtures — see #/debug for everyone available. To tell
   * the story about someone else, change it here; do not write a flow that
   * copes with all eleven students across three clubs, because it will not.
   */
  cast?: {
    /** A mentor or a self-registered young person, e.g. 'pi-mentor-jo'. */
    piAccount?: string
    /** A Code Classroom student account, e.g. 'cs-amara'. */
    classroomStudent?: string
  }
  /**
   * True if the flow signs people in itself — an onboarding variant, typically.
   * The cast is then held back for autofill rather than signed in, so the
   * fiction can start signed out while the fields are still filled in for you.
   */
  ownsSignIn?: boolean
}
