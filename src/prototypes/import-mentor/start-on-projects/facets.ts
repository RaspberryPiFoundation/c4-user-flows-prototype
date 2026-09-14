import type { Project } from '../../../fixtures'

// What the project selector filters on. Two of these are properties the
// fixtures do not have, so they are stood in for here — read the warnings.

/**
 * Which projects can be used inside Code Classroom. **PROPOSED, and invented.**
 *
 * Sarah's flow chart turns on a filter called "can be used in my code
 * classroom", and her sticky says why it should exist: *"Should we only allow
 * them to add embedded editor projects? Think yes — we know that having
 * separate tabs is pain for younger users."*
 *
 * So compatibility is a property of a PROJECT, not of a language: on the live
 * site a Scratch project that drives a Raspberry Pi, or one that only ships as
 * a PDF, will not run inside a class however Scratch it is. `src/fixtures` has
 * no such field, and fixtures are shared and not this prototype's to change.
 *
 * **The assignment is invented.** One Scratch project is marked incompatible
 * purely so the filter and the compatibility tag have visible work to do;
 * without it every fixture qualifies, the filter removes nothing, and the
 * central mechanic of this flow cannot be tested. Nothing about the real Rock
 * Band project says it would not import. The honest fix is a
 * `usableInClassroom` field in the fixtures.
 */
const NOT_COMPATIBLE = new Set(['rock-band'])

export function usableInClassroom(project: Project): boolean {
  return !NOT_COMPATIBLE.has(project.id)
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
