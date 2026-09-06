// Base screens: the parts of the real products a prototype needs, so nobody
// rebuilds a sign-in page from scratch.
//
//   import { StudentSignIn } from '../../screens'
//
// Screens are dumb on purpose. Props in, callbacks out, no navigation decisions
// — the prototype owns what happens next. That is what lets two variants
// disagree about the order of things while sharing the same screens.
//
// A screen that does NOT exist in any product is a decision point, not a base
// screen, and belongs in your prototype folder. See README.md here.

export type { ScreenMeta } from './types'

export { RoleChooser, meta as roleChooserMeta } from './classroom/RoleChooser'
export { SchoolCodeEntry, meta as schoolCodeEntryMeta } from './pi-accounts/SchoolCodeEntry'
export { StudentSignIn, meta as studentSignInMeta } from './pi-accounts/StudentSignIn'
export { MentorSignIn, meta as mentorSignInMeta } from './pi-accounts/MentorSignIn'
