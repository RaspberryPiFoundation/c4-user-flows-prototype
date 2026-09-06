import { CLASSROOM_STUDENTS } from './people'
import type { ClassGroup, School } from './types'

// Three containers on purpose, because a Code Club can sit at either level of
// Code Classroom's school → class → student model, and both really happen:
//
// - school-westlands: a community club that IS its own school, running two
//   classes. Proves a club is not necessarily one-to-one with a class.
// - school-galway: a community club with a single class of three, much closer
//   to a typical new club, and it catches designs that only look right full.
// - school-aidans: an actual primary school running a timetabled lesson AND a
//   Code Club, with pupils in both. Here the club is a CLASS, not a school,
//   and the mentor already has a Code Classroom account before Code Club is
//   involved at all.
//
// That last case is the awkward one for onboarding: the flow cannot assume the
// mentor is starting from nothing.
//
// One mentor (Jo) runs both community clubs, so "which one am I setting up?"
// is a real question a prototype has to answer rather than assume away.

export const SCHOOLS: School[] = [
  {
    id: 'school-westlands',
    name: 'Westlands Library Code Club',
    schoolCode: '48-21-06',
    country: 'Kenya',
    kind: 'code-club-only',
    mentorIds: ['pi-mentor-jo', 'pi-mentor-thabo'],
    venue: 'Westlands Library, Ojijo Road, Nairobi',
    schedule: 'Every Thursday, 16:00 - 17:30 (EAT)',
    online: false,
  },
  {
    id: 'school-galway',
    name: 'Galway Community Code Club',
    schoolCode: '71-35-92',
    country: 'Ireland',
    kind: 'code-club-only',
    mentorIds: ['pi-mentor-jo'],
    venue: 'Galway Education Centre, Cluain Mhuire, Galway',
    schedule: 'Every two weeks on Saturday, 10:00 - 12:00 (GMT)',
    online: true,
  },
  {
    id: 'school-aidans',
    name: "St Aidan's Primary School",
    schoolCode: '20-64-13',
    country: 'United Kingdom',
    kind: 'school',
    mentorIds: ['pi-mentor-nadia'],
    // It is a school, and it also runs a Code Club — so it advertises a venue
    // and a session time on codeclub.org like any other club.
    venue: "St Aidan's Primary School, Mill Lane, Leeds",
    schedule: 'Every Wednesday, 15:30 - 16:30 (GMT)',
    online: false,
  },
]

export const CLASS_GROUPS: ClassGroup[] = [
  {
    id: 'class-westlands-scratch',
    schoolId: 'school-westlands',
    name: 'Thursday Scratch group',
    kind: 'code-club',
    studentIds: [],
  },
  {
    id: 'class-westlands-python',
    schoolId: 'school-westlands',
    name: 'Thursday Python group',
    kind: 'code-club',
    studentIds: [],
  },
  {
    id: 'class-galway-all',
    schoolId: 'school-galway',
    name: 'Saturday club',
    kind: 'code-club',
    studentIds: [],
  },
  // The same school, one timetabled lesson and one club. Several pupils are in
  // both, so their work is spread across a lesson and a club in one account.
  {
    id: 'class-aidans-year6',
    schoolId: 'school-aidans',
    name: 'Year 6 computing',
    kind: 'lesson',
    studentIds: [],
  },
  {
    id: 'class-aidans-club',
    schoolId: 'school-aidans',
    name: 'Wednesday Code Club',
    kind: 'code-club',
    studentIds: [],
  },
]

// Derived from the students rather than hand-listed, so the two can never
// disagree with each other.
for (const group of CLASS_GROUPS) {
  group.studentIds = CLASSROOM_STUDENTS.filter((s) => s.classIds.includes(group.id)).map(
    (s) => s.id,
  )
}

export function school(id: string): School | undefined {
  return SCHOOLS.find((s) => s.id === id)
}

export function schoolBySchoolCode(code: string): School | undefined {
  const normalised = code.trim().toUpperCase()
  return SCHOOLS.find((s) => s.schoolCode === normalised)
}

export function classGroup(id: string): ClassGroup | undefined {
  return CLASS_GROUPS.find((g) => g.id === id)
}

export function classesInSchool(schoolId: string): ClassGroup[] {
  return CLASS_GROUPS.filter((g) => g.schoolId === schoolId)
}

export function schoolsForMentor(piAccountId: string): School[] {
  return SCHOOLS.filter((s) => s.mentorIds.includes(piAccountId))
}

/** Classes a young person is in, across lessons and clubs. */
export function classesForStudent(studentId: string): ClassGroup[] {
  return CLASS_GROUPS.filter((g) => g.studentIds.includes(studentId))
}
