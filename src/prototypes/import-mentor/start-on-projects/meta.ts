import type { PrototypeMeta } from '../../types'

export const meta: PrototypeMeta = {
  title: 'Start on Projects, not Classroom',

  owner: 'Sarah Tucker',

  hypothesis:
    'Mentors are more likely to start on Code Club Projects, because it is the site they already know — so the route into Code Classroom should begin in the catalogue, with a filter for what will actually work in a class, rather than beginning in Code Classroom and sending them out.',

  status: 'sketch',

  // The SAME mentor as out-to-projects-and-back, on purpose. These two
  // prototypes exist to be compared, and they should differ in exactly one
  // thing: where the mentor starts. Same person, same club, same two classes,
  // so anything a session turns up is about the route and not about the cast.
  cast: { piAccount: 'pi-mentor-thabo' },

  // The flow starts SIGNED OUT and signs Thabo in itself, because a mentor
  // browsing Code Club Projects usually has not logged in — there has never
  // been a reason to. That is the condition the import route actually has to
  // work from, and it changes what the site is allowed to know about them.
  ownsSignIn: true,
}
