import type { PrototypeMeta } from '../../types'

export const meta: PrototypeMeta = {
  title: 'Code Classroom as the club card action',

  owner: 'Divya Mahadevan',

  hypothesis:
    'Code Classroom buried in Manage Club is too slow to reach. If it is the primary button on the club card, and setting it up takes no decisions from the mentor, a mentor will get to a working Code Classroom in one click — and what stops them will be the young people\'s accounts, not the setup.',

  status: 'sketch',

  // Jo manages both community clubs, so the club card answers "which club?"
  // by itself — which is one of the things this route is betting on over a
  // single row in a menu.
  cast: { piAccount: 'pi-mentor-jo' },
}
