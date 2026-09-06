// The shape every prototype declares in its own `meta.ts`.
//
// `lane` and `slug` are deliberately NOT part of this — they are derived from
// the folder path in registry.ts, so they can never drift out of sync with
// where the prototype actually lives.

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
   * True if this prototype signs people in as part of the flow — an onboarding
   * variant, typically. The workbench then says so and stops pretending the
   * dropdowns at the top are in charge, because they are not.
   *
   * Whoever you pick up there is still used to fill the sign-in fields in for
   * you, so you are not retyping a six-digit code at every demo.
   */
  ownsSignIn?: boolean
}
