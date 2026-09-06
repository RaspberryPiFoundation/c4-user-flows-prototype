import type { PrototypeMeta } from '../types'

export const meta: PrototypeMeta = {
  // Short label for the card on the landing page. Two or three words.
  title: 'Untitled prototype',

  // Your name, so people know who to ask about it.
  owner: 'Your name',

  // What you think is true, that this prototype exists to test. Be specific
  // enough to be wrong — "mentors will prefer X because Y", not "improve
  // onboarding". If you cannot write one, you are probably not ready to build.
  hypothesis: 'Write what you believe, in a way a testing session could disprove.',

  // sketch -> explored -> marked-for-testing -> tested -> parked
  status: 'sketch',

  // Who this prototype is about. The workbench signs them in and fills their
  // details into sign-in screens. See #/debug for everyone available.
  cast: { piAccount: 'pi-mentor-jo' },

  // Set true if your flow signs people in itself, so it starts signed out.
  // ownsSignIn: true,
}
