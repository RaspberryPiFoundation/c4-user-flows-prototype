import type { Project } from '../../../fixtures'

// Code Classroom offers three kinds of project. The fixtures use the language
// names Code Club Projects uses, so the two have to be mapped — and the
// mapping is not neat, which is itself worth knowing:
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
  blurb: string
}

export const PROJECT_TYPES: ProjectType[] = [
  { id: 'Blocks', language: 'Scratch', blurb: 'Snap blocks together to make things move and talk.' },
  { id: 'Python', language: 'Python', blurb: 'Write code that asks questions and makes decisions.' },
  { id: 'Web', language: 'HTML', blurb: 'Build a page with words, pictures and links.' },
]

export function projectType(id: ProjectTypeId): ProjectType {
  return PROJECT_TYPES.find((type) => type.id === id)!
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
export function fromScratchProject(type: ProjectTypeId, index: number): Project {
  const { language } = projectType(type)
  return {
    id: `scratch-${type.toLowerCase()}-${index}`,
    title: `My ${type} project`,
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
