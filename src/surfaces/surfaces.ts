// The five product surfaces these flows cross. Prototypes wrap a screen in the
// surface it belongs to, so a flow that moves between products visibly moves
// between products.
//
// That visibility is deliberate. Merging everything into one house style would
// hide the handoffs, and the handoffs are exactly what the onboarding and
// import lanes are about — a mentor or young person crossing from Code Club to
// Pi Accounts to Code Classroom is where things get lost.
//
// Chrome is grey-box: the right name, the right accent, and roughly the right
// navigation. It is not pixel-accurate, and it is not meant to be until a
// testing session shows fidelity is getting in the way.
//
// There is no separate "editor" surface. The code editor is always embedded in
// another product — Code Club Projects or Code Classroom — and never stands on
// its own, so it takes the chrome of whichever it is inside.

export type SurfaceId = 'code-club' | 'ccp' | 'classroom' | 'pi-accounts'

export interface SurfaceInfo {
  id: SurfaceId
  /** What the product calls itself in its own header. */
  name: string
  /** Where it really lives, shown as a fake address bar in the gallery. */
  host: string
  /** Default navigation, overridable per screen. */
  nav: string[]
  /**
   * `app` is a normal page with a header, nav and content.
   * `centred` is a coloured page with a single centred card — how Pi Accounts
   * and the Code Classroom sign-in actually look.
   */
  layout: 'app' | 'centred'
  /** One line on what this surface is for, shown in the gallery. */
  note: string
}

export const SURFACES: Record<SurfaceId, SurfaceInfo> = {
  'code-club': {
    id: 'code-club',
    name: 'Code Club',
    host: 'codeclub.org',
    // Taken from the live site.
    nav: ['Join a club', 'Run a club', 'Start coding', 'Partner with us'],
    layout: 'app',
    note: 'Mentor-facing. Where a mentor finds out about Code Classroom in the first place.',
  },
  ccp: {
    id: 'ccp',
    name: 'Code Club Projects',
    host: 'projects.raspberrypi.org',
    // Taken from the live site.
    nav: ['Home', 'Find a project'],
    layout: 'app',
    note: 'Where young people and mentors browse projects. Uses standalone Pi accounts.',
  },
  classroom: {
    id: 'classroom',
    name: 'Code Classroom',
    host: 'classroom.raspberrypi.org',
    // Deliberately empty. Code Classroom has NO primary navigation — you move
    // around it by breadcrumb ("Your school / Divya's test class / Python test
    // project"). Verified against the designs in the Code Classroom FigJam.
    nav: [],
    layout: 'app',
    note: 'Mentor and young-person facing. Student accounts work only here. Navigation is by breadcrumb, not a nav bar.',
  },
  'pi-accounts': {
    id: 'pi-accounts',
    name: 'Raspberry Pi Accounts',
    host: 'my.raspberrypi.org',
    nav: [],
    layout: 'centred',
    note: 'Signing in and up. Note: the Code Classroom student login is hosted HERE, wearing Code Classroom branding.',
  },
}

export const SURFACE_LIST: SurfaceInfo[] = Object.values(SURFACES)
