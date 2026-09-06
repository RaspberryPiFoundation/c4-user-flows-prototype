import type { PrototypeMeta } from '../../types'

export const meta: PrototypeMeta = {
  title: 'Joining with a school code',
  owner: 'Divya',
  hypothesis:
    'A young person can get into Code Classroom from a six-digit code on a board — but the language and the code format will cost more time than the sign-in itself.',
  status: 'explored',

  // This story is about Siobhán, at the Westlands club. Change this one line to
  // tell it about someone else — the flow reads her club and code from here,
  // so nothing else needs touching.
  cast: { classroomStudent: 'cs-siobhan' },

  // The flow signs her in itself, so it starts signed out on purpose.
  ownsSignIn: true,
}
