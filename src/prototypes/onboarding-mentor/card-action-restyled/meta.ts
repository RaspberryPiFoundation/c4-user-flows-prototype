import type { PrototypeMeta } from '../../types'

export const meta: PrototypeMeta = {
  title: 'Club card action, restyled',

  owner: 'Sarah Tucker',

  // DRAFT — Sarah to correct. The flow is a straight copy of
  // "Code Classroom as the club card action", so the route is not what is
  // being tested here; only how the confirm screen is presented.
  hypothesis:
    'The confirm screen is where a mentor decides whether Code Classroom is for them, and two dense cards of prose get skimmed. Presented as one centred explainer — a short claim per panel, each with an icon — a mentor will be able to say in their own words what Code Classroom is before they press yes, rather than agreeing and finding out afterwards.',

  status: 'sketch',

  // The same mentor as the prototype this copies, on purpose: two visual
  // treatments of one route only compare if the club, the code and the class
  // name are identical.
  cast: { piAccount: 'pi-mentor-jo' },
}
