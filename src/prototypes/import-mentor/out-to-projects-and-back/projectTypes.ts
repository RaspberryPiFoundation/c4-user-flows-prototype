import type { Project, ProjectStep } from '../../../fixtures'

// Two decisions the flow chart implies but does not spell out, kept in one
// file so the flow cannot quietly disagree with itself and so changing either
// is a one-line change.

/**
 * "CCP page filtered by embedded editor projects" — the chart's own words for
 * the catalogue the mentor browses.
 *
 * All three: Scratch as well as Python and HTML. Settled by Divya, September
 * 2026, rather than guessed — an earlier version of this file left Scratch out
 * on the assumption that "embedded editor" meant the Code Editor's own
 * languages, which would have dropped most of what a Code Club runs.
 *
 * Worth knowing what this costs the prototype. `Project['language']` has
 * exactly these three values, so the filter can no longer exclude anything in
 * the fixtures — which means the question on the "can we connect projects that
 * aren't editor projects?" sticky is no longer visible in this flow. It is
 * still a real question: the live catalogue has physical computing and
 * third-party-editor projects that would not import. Seeing that happen needs a
 * non-editor project in `src/fixtures`, which is shared and not this
 * prototype's to change. See notes.md.
 */
export const EMBEDDED_EDITOR_LANGUAGES: Array<Project['language']> = [
  'Scratch',
  'Python',
  'HTML',
]

export function isEmbeddedEditorProject(project: Project): boolean {
  return EMBEDDED_EDITOR_LANGUAGES.includes(project.language)
}

/**
 * "Name and project type e.g blocks" — the chart names one option, Blocks, so
 * the other two are taken from what the Code Editor supports.
 *
 * Code Classroom says Blocks, Python and Web; Code Club Projects labels the
 * same things Scratch, Python and HTML. The two products disagree, and a
 * mentor who picks Blocks and then browses a list of things called Scratch has
 * to work out they are the same. Mapped here so the mismatch is visible.
 *
 * Descriptions and tile colours are the live dialog's own, not invented.
 */
export const PROJECT_TYPES = [
  {
    id: 'Blocks',
    language: 'Scratch' as const,
    tone: 'orange',
    blurb: 'Based on the open-source Scratch editor',
  },
  {
    id: 'Python',
    language: 'Python' as const,
    tone: 'green',
    blurb: 'Wide range of built-in libraries',
  },
  {
    id: 'Web',
    language: 'HTML' as const,
    tone: 'purple',
    blurb: 'HTML, CSS, and JavaScript',
  },
]

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]['id']

export function projectType(id: ProjectTypeId) {
  return PROJECT_TYPES.find((type) => type.id === id)!
}

/**
 * A project the mentor has named but not yet written instructions for.
 *
 * The step is a stand-in, and it is here because of a real gap. The chart
 * sends the mentor to "View project code" BEFORE "Add instructions", so at
 * that moment the project has no instructions at all — and the Code Classroom
 * editor renders `project.steps[stepIndex]` with no empty state, so a project
 * with no steps crashes it. Rather than hide that behind a fake first step,
 * the stand-in says on screen what is missing. See notes.md, finding 1.
 */
const NO_INSTRUCTIONS_YET: ProjectStep = {
  title: 'No instructions yet',
  body: [
    'You have not added instructions to this project.',
    '',
    'Young people opening it will see this panel.',
  ].join('\n'),
}

export function createdProject(name: string, type: ProjectTypeId): Project {
  return {
    id: `created-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: name,
    language: projectType(type).language,
    level: 1,
    ages: '',
    intro: '',
    steps: [NO_INSTRUCTIONS_YET],
    starterCode: '',
  }
}

/** What "Add instructions" leaves behind, so the editor has something real. */
export function withInstructions(project: Project, instructions: string): Project {
  return {
    ...project,
    steps: [{ title: 'Step 1', body: instructions }],
  }
}

export function hasInstructions(project: Project): boolean {
  return project.steps[0]?.title !== NO_INSTRUCTIONS_YET.title
}
