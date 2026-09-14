import type { Project } from '../../../fixtures'

// The three kinds of project Code Classroom offers, matching the real
// "Create a new project" modal in the teacher flow — same names, same order,
// same descriptions. Copy is the real copy.
//
// The fixtures use the language names Code Club Projects uses, so the two have
// to be mapped, and the mapping is not neat:
//
//   Blocks -> Scratch   the young person sees "Blocks", the catalogue says "Scratch"
//   Python -> Python    the only one where both products agree
//   Web    -> HTML      "Web" to a learner, "HTML" in the catalogue
//
// A young person who picks "Blocks" and lands on a list of things labelled
// Scratch has to work out for themselves that those are the same thing.

export type ProjectTypeId = 'Blocks' | 'Python' | 'Web'

export interface ProjectType {
  id: ProjectTypeId
  /** What the project fixtures call it. */
  language: Project['language']
  /** The real product's description, from the teacher's create-project modal. */
  blurb: string
  /**
   * Tile colour. Orange, green and purple approximate the real modal's orange,
   * teal and purple — these are the repo's existing tile tones rather than
   * exact matches, because the screens are grey-box and the pattern is the
   * point, not the hex value.
   */
  tone: 'orange' | 'green' | 'purple'
  /** Material Symbols glyph sitting in the tile. */
  glyph: string
}

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'Blocks',
    language: 'Scratch',
    blurb: 'Based on the open-source Scratch editor',
    tone: 'orange',
    glyph: 'extension',
  },
  {
    id: 'Python',
    language: 'Python',
    blurb: 'Wide range of built-in libraries',
    tone: 'green',
    glyph: 'terminal',
  },
  {
    id: 'Web',
    language: 'HTML',
    blurb: 'HTML, CSS, and JavaScript',
    tone: 'purple',
    glyph: 'code',
  },
]

export function projectType(id: ProjectTypeId): ProjectType {
  return PROJECT_TYPES.find((type) => type.id === id)!
}

/** The name the real modal pre-fills, e.g. "Blocks project". */
export function defaultProjectName(type: ProjectTypeId): string {
  return `${type} project`
}

/**
 * A project the young person is starting from nothing.
 *
 * Note what has to be invented to make one: a Project carries instruction
 * steps, and a project you thought up yourself has none. The Code Classroom
 * editor is built around those steps, so a from-scratch project needs a step
 * that is not an instruction. That mismatch is a finding, not a workaround —
 * see notes.md.
 */
export function fromScratchProject(type: ProjectTypeId, name: string, index: number): Project {
  const { language } = projectType(type)
  return {
    id: `scratch-${type.toLowerCase()}-${index}`,
    title: name.trim() || defaultProjectName(type),
    language,
    level: 1,
    ages: '',
    intro: 'Your own project. Nobody has written instructions for this one — that is the point.',
    steps: [
      {
        title: 'Your project',
        body: [
          'This project is yours. There are no steps to follow.',
          '',
          'Build whatever you want, and press **Save** as you go. Your mentor will be able to see it.',
        ].join('\n'),
      },
    ],
    starterCode: '',
  }
}
