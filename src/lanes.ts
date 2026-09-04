// The flow questions this repo exists to answer, taken from
// RaspberryPiFoundation/digital-code-club#1205 (Code Classroom x Code Club
// integration). A "theme" is one of the areas in that story; a "lane" is one
// question within a theme, for one audience.
//
// Prototypes are not wired up yet — when they are, each will declare the lane
// it belongs to and appear inside it on this page. Until then every lane shows
// an empty state, which doubles as a visible to-do list for the team.

export interface Lane {
  /** Short stable id, also used as the folder name when prototypes are added. */
  id: string
  /** Short label shown on the page. The theme heading supplies the context,
   * so this only needs to say who the lane is for. */
  title: string
}

export interface Theme {
  id: string
  title: string
  lanes: Lane[]
}

export const THEMES: Theme[] = [
  {
    id: 'onboarding',
    title: 'Onboarding',
    lanes: [
      { id: 'onboarding-mentor', title: 'For mentors' },
      { id: 'onboarding-yp', title: 'For young people' },
    ],
  },
  {
    id: 'importing-projects',
    title: 'Importing projects',
    lanes: [
      { id: 'import-mentor', title: 'For mentors' },
      { id: 'import-yp', title: 'For young people' },
    ],
  },
]
