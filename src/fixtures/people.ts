import type { ClassroomStudent, PiAccount } from './types'

// All names invented. Deliberately awkward in places, because that is what
// surfaces layout and flow problems: long names, non-Latin script, an
// apostrophe, and two young people who share a first name.

export const PI_ACCOUNTS: PiAccount[] = [
  {
    id: 'pi-mentor-jo',
    name: 'Jo Whelan',
    kind: 'mentor',
    email: 'jo.whelan@example.org',
  },
  {
    id: 'pi-mentor-thabo',
    name: 'Thabo Mokoena',
    kind: 'mentor',
    email: 'thabo.mokoena@example.org',
  },
  // A young person who set this up themselves. Their mentor cannot see it,
  // cannot reset the password, and does not necessarily know it exists.
  {
    id: 'pi-yp-lucy',
    name: 'Lucy Ferreira',
    kind: 'young-person',
    email: 'lucy.ferreira.2013@example.com',
  },
  // Same person as the classroom account 'cs-amara' — the identity overlap
  // that import prototypes have to deal with.
  {
    id: 'pi-yp-amara',
    name: 'Amara Kimani',
    kind: 'young-person',
    email: 'amara.k.codes@example.com',
  },
]

export const CLASSROOM_STUDENTS: ClassroomStudent[] = [
  {
    id: 'cs-amara',
    name: 'Amara Kimani',
    username: 'amara.k',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-scratch'],
    alsoHasPiAccountId: 'pi-yp-amara',
  },
  {
    id: 'cs-ravi',
    name: 'Ravi Prasad',
    username: 'ravi.p',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-scratch'],
  },
  {
    id: 'cs-aisha-b',
    name: 'Aisha Bello',
    username: 'aisha.b',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-scratch'],
  },
  // Shares a first name with the account above. Any screen that shows only
  // first names becomes ambiguous here, which is the point.
  {
    id: 'cs-aisha-r',
    name: 'Aisha Rahman',
    username: 'aisha.r',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-python'],
  },
  {
    id: 'cs-siobhan',
    name: "Siobhán O'Sullivan",
    username: 'siobhan.o',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-python'],
  },
  {
    id: 'cs-priya',
    name: 'Priya Venkataraman',
    username: 'priya.v',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-python'],
  },
  {
    id: 'cs-ananya',
    name: 'अनन्या शर्मा',
    username: 'ananya.s',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-scratch'],
  },
  // A very long name, to catch truncation in lists and cards.
  {
    id: 'cs-maximilian',
    name: 'Maximilian Oluwaseun Adeyemi-Fitzgerald',
    username: 'max.af',
    clubId: 'club-nairobi',
    classIds: ['class-nairobi-scratch'],
  },
  // The small club: three young people, one class.
  {
    id: 'cs-kofi',
    name: 'Kofi Mensah',
    username: 'kofi.m',
    clubId: 'club-galway',
    classIds: ['class-galway-all'],
  },
  {
    id: 'cs-mei',
    name: 'Mei Chen',
    username: 'mei.c',
    clubId: 'club-galway',
    classIds: ['class-galway-all'],
  },
  {
    id: 'cs-tomasz',
    name: 'Tomasz Kowalczyk',
    username: 'tomasz.k',
    clubId: 'club-galway',
    classIds: ['class-galway-all'],
  },
]

export function piAccount(id: string): PiAccount | undefined {
  return PI_ACCOUNTS.find((a) => a.id === id)
}

export function classroomStudent(id: string): ClassroomStudent | undefined {
  return CLASSROOM_STUDENTS.find((s) => s.id === id)
}
