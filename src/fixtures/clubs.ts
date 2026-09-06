import { CLASSROOM_STUDENTS } from './people'
import type { ClassGroup, Club } from './types'

// Two clubs on purpose:
//
// - club-nairobi runs TWO classes, so prototypes have to cope with a club that
//   is not one-to-one with a class. Whether that is how it should work is an
//   open question, so the fixtures do not assume it away.
// - club-galway is three young people in one class, which is much closer to a
//   typical new club and catches designs that only look right when full.
//
// One mentor (Jo) runs both, so "which club am I setting up?" is a real
// question a prototype has to answer rather than assume.

export const CLUBS: Club[] = [
  {
    id: 'club-nairobi',
    name: 'Westlands Library Code Club',
    schoolCode: 'WLDS-2K',
    country: 'Kenya',
    mentorIds: ['pi-mentor-jo', 'pi-mentor-thabo'],
  },
  {
    id: 'club-galway',
    name: 'Galway Community Code Club',
    schoolCode: 'GLWY-7P',
    country: 'Ireland',
    mentorIds: ['pi-mentor-jo'],
  },
]

export const CLASS_GROUPS: ClassGroup[] = [
  {
    id: 'class-nairobi-scratch',
    clubId: 'club-nairobi',
    name: 'Thursday Scratch group',
    studentIds: [],
  },
  {
    id: 'class-nairobi-python',
    clubId: 'club-nairobi',
    name: 'Thursday Python group',
    studentIds: [],
  },
  {
    id: 'class-galway-all',
    clubId: 'club-galway',
    name: 'Saturday club',
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

export function club(id: string): Club | undefined {
  return CLUBS.find((c) => c.id === id)
}

export function clubBySchoolCode(code: string): Club | undefined {
  const normalised = code.trim().toUpperCase()
  return CLUBS.find((c) => c.schoolCode === normalised)
}

export function classGroup(id: string): ClassGroup | undefined {
  return CLASS_GROUPS.find((g) => g.id === id)
}

export function classesInClub(clubId: string): ClassGroup[] {
  return CLASS_GROUPS.filter((g) => g.clubId === clubId)
}

export function clubsForMentor(piAccountId: string): Club[] {
  return CLUBS.filter((c) => c.mentorIds.includes(piAccountId))
}
