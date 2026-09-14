import type { PrototypeMeta } from '../../types'

export const meta: PrototypeMeta = {
  title: 'Creating or browsing, without leaving',

  owner: 'Natalie Larkin',

  hypothesis:
    'Offered "start from scratch" or "browse Code Club projects" in the same place, a young person will take one of them and never go looking for Code Club Projects — so it is the handoff between the two sites, not the browsing, that loses them today. If they still ask where the real projects are, bringing the catalogue inside is not enough on its own.',

  status: 'sketch',

  // Kofi is at the small Galway club and has NO Pi account, which is the
  // ordinary case for a club member. Deliberate: if this works for him, it
  // works without a second identity existing at all.
  cast: { classroomStudent: 'cs-kofi' },

  // The flow signs him in itself — it starts at the Code Classroom home page,
  // as the flow diagram does. Autofill still knows who he is, so a demo does
  // not open on retyping a six-digit code.
  ownsSignIn: true,
}
