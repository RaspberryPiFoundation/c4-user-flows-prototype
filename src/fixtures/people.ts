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
  // A teacher, not a volunteer. Already had a Code Classroom account for
  // timetabled lessons before the club existed, so onboarding cannot assume
  // she is starting from nothing.
  {
    id: 'pi-mentor-nadia',
    name: 'Nadia Okonkwo',
    kind: 'mentor',
    email: 'n.okonkwo@staidans.example.sch.uk',
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
    schoolId: 'school-westlands',
    classIds: ['class-westlands-scratch'],
    alsoHasPiAccountId: 'pi-yp-amara',
  },
  {
    id: 'cs-ravi',
    name: 'Ravi Prasad',
    username: 'ravi.p',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-scratch'],
  },
  {
    id: 'cs-aisha-b',
    name: 'Aisha Bello',
    username: 'aisha.b',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-scratch'],
  },
  // Shares a first name with the account above. Any screen that shows only
  // first names becomes ambiguous here, which is the point.
  {
    id: 'cs-aisha-r',
    name: 'Aisha Rahman',
    username: 'aisha.r',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-python'],
  },
  {
    id: 'cs-siobhan',
    name: "Siobhán O'Sullivan",
    username: 'siobhan.o',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-python'],
  },
  {
    id: 'cs-priya',
    name: 'Priya Venkataraman',
    username: 'priya.v',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-python'],
  },
  {
    id: 'cs-ananya',
    name: 'अनन्या शर्मा',
    username: 'ananya.s',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-scratch'],
  },
  // A very long name, to catch truncation in lists and cards.
  {
    id: 'cs-maximilian',
    name: 'Maximilian Oluwaseun Adeyemi-Fitzgerald',
    username: 'max.af',
    schoolId: 'school-westlands',
    classIds: ['class-westlands-scratch'],
  },
  // St Aidan's: pupils spread across a timetabled lesson and a Code Club, in
  // the same Code Classroom account. Two are in BOTH, so their work spans a
  // lesson and a club — which is exactly where project visibility gets murky.
  {
    id: 'cs-daniel',
    name: 'Daniel Whitcombe',
    username: 'daniel.w',
    schoolId: 'school-aidans',
    classIds: ['class-aidans-year6'],
  },
  {
    id: 'cs-fatima',
    name: 'Fatima Al-Rashid',
    username: 'fatima.a',
    schoolId: 'school-aidans',
    classIds: ['class-aidans-year6'],
  },
  {
    id: 'cs-oliver',
    name: 'Oliver Brennan',
    username: 'oliver.b',
    schoolId: 'school-aidans',
    classIds: ['class-aidans-year6', 'class-aidans-club'],
  },
  {
    id: 'cs-yusuf',
    name: 'Yusuf Demir',
    username: 'yusuf.d',
    schoolId: 'school-aidans',
    classIds: ['class-aidans-year6', 'class-aidans-club'],
  },
  // Comes to the club but is not in that computing lesson — a different year
  // group, so the club is not a subset of the class.
  {
    id: 'cs-grace',
    name: 'Grace Adeyinka',
    username: 'grace.a',
    schoolId: 'school-aidans',
    classIds: ['class-aidans-club'],
  },
  // The small community club: three young people, one class.
  {
    id: 'cs-kofi',
    name: 'Kofi Mensah',
    username: 'kofi.m',
    schoolId: 'school-galway',
    classIds: ['class-galway-all'],
  },
  {
    id: 'cs-mei',
    name: 'Mei Chen',
    username: 'mei.c',
    schoolId: 'school-galway',
    classIds: ['class-galway-all'],
  },
  {
    id: 'cs-tomasz',
    name: 'Tomasz Kowalczyk',
    username: 'tomasz.k',
    schoolId: 'school-galway',
    classIds: ['class-galway-all'],
  },
]

export function piAccount(id: string): PiAccount | undefined {
  return PI_ACCOUNTS.find((a) => a.id === id)
}

export function classroomStudent(id: string): ClassroomStudent | undefined {
  return CLASSROOM_STUDENTS.find((s) => s.id === id)
}
