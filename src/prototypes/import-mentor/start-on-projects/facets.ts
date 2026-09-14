import type { Project } from '../../../fixtures'

// What the project selector filters on. Compatibility is a real field on the
// fixtures now; interest is still stood in for here — read the warning.

/**
 * Which projects can be used inside Code Classroom.
 *
 * Reads `usableInClassroom` from the fixtures, which is the real thing rather
 * than a guess. An earlier version of this file invented the answer, because
 * the fixtures had no such field and a filter that excluded nothing could not
 * be tested — the field and two physical computing projects were added for
 * exactly this. Absent means usable; see the field's comment in
 * `src/fixtures/types.ts`.
 *
 * Sarah's sticky is the reason any of it exists: *"Should we only allow them
 * to add embedded editor projects? Think yes — we know that having separate
 * tabs is pain for younger users."* Note whose problem that is. The filter
 * looks like a convenience for the mentor and is really about the young
 * person's session.
 */
export function usableInClassroom(project: Project): boolean {
  return project.usableInClassroom !== false
}

/**
 * What the filter is called. Sarah's sticky says the wording is TBD, so this
 * is a proposal rather than a decision.
 *
 * Built to match the live rail's own idiom: it already carries a standalone
 * "PDF only" checkbox above the first group heading, so an "X only" filter is
 * a shape a mentor has seen on this page before. Short enough for one line in
 * the rail, which "Can be used in my Code Classroom" was not.
 *
 * Dropping "my" is deliberate and not only about length. Compatibility is a
 * property of the PROJECT — whether it runs in an embedded editor — and has
 * nothing to do with which classroom happens to be yours. "My" implied a
 * personalised filter that was never personalised.
 *
 * Alternatives, if this one tests badly: "Works in Code Classroom" is clearer
 * and still fits; "Can be added to a class" describes what the mentor gets to
 * do rather than what the project is.
 */
export const FILTER_LABEL = 'Code Classroom only'

/**
 * What a project is *about*. **Also invented**, and for a specific reason.
 *
 * Sarah's testing assumption on the chart is that *"mentors will find a
 * project based on technology over interest"*. The live selector puts Interest
 * and Technology side by side in one rail, which makes that assumption
 * watchable — you can see which group a mentor reaches for first.
 *
 * The fixtures carry no interest, so it could not be tested at all without
 * this. Values are taken from the live page's own Interest list; which project
 * got which is a guess, and a harmless one — nothing in the flow branches on
 * it. Unlike the compatibility map above, being wrong here costs nothing.
 */
const INTERESTS: Record<string, string> = {
  'space-talk': 'Space',
  'rock-band': 'Music',
  chatbot: 'Communication',
  'find-the-bug': 'Games',
}

export function interestOf(project: Project): string | undefined {
  return INTERESTS[project.id]
}
