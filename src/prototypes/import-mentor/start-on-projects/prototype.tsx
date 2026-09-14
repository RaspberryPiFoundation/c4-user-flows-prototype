import { useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Card } from '../../../kit'
import {
  PROJECTS,
  classesInSchool,
  piAccount,
  project,
  school,
  schoolsForMentor,
  type ClassGroup,
  type Project,
} from '../../../fixtures'
import {
  EducatorClassPage,
  EducatorProjectPage,
  MentorSignIn,
  ProjectPage,
} from '../../../screens'
import { Surface } from '../../../surfaces'
import { useSession } from '../../../session'
import { AddToClass, AddedToClass } from './AddToClass'
import { ProjectSelector, type Filters } from './ProjectSelector'
import { HowToCreateClass, NameAndDescription } from './NewClass'
import { ShowToStudents } from './ShowToStudents'
import { meta } from './meta'

// Everything comes from the one mentor named in meta.ts — the same mentor as
// the sibling prototype, so the two can be compared. Change the cast and the
// club and its classes follow. Nothing below hardcodes Westlands.
//
// The pink sticky on the flow chart — "this assumes the mentor is logged in
// and has a school" — is carried by the cast rather than by a sign-in step,
// which is why `ownsSignIn` is not set.
const MENTOR = meta.cast?.piAccount ?? ''
const CLUB = school(schoolsForMentor(MENTOR)[0].id)!
const CLASSES = classesInSchool(CLUB.id)
const MENTOR_EMAIL = piAccount(MENTOR)?.email ?? ''

/** What the mentor set up before today, so the class is already running. */
const ALREADY_THERE: Record<string, string[]> = {
  [CLASSES[0].id]: ['space-talk'],
}

/** The narrow centred column the add-to-class cards sit in. */
const CENTRED_COLUMN = { width: '100%', maxWidth: '520px', margin: '0 auto' } as const

/** A project sitting in one of this mentor's classes. */
interface Placed {
  project: Project
  classId: string
  /** Hidden until the mentor says otherwise — see ShowToStudents.tsx. */
  shownToStudents: boolean
}

// There is no "create your own" branch in this chart. Option 2 is entirely
// about importing, which is why it is shorter than its sibling.
type Step =
  // Code Club Projects
  | 'selector'
  | 'project-landing'
  | 'sign-in'
  | 'choose-class'
  | 'new-class-how'
  | 'new-class-name'
  | 'success'
  // Code Classroom, reached only by asking for it
  | 'class'
  | 'project-page'
  | 'show-to-students'

export default function StartOnProjects() {
  const [params] = useSearchParams()
  // Author commentary belongs to the team, not to the person being tested.
  const showWorkbench = params.get('full') !== '1'

  // Signed in, or not, is the session's business rather than this flow's —
  // `ownsSignIn` in meta.ts holds the cast back so the fiction starts logged
  // out, and this reads the result.
  const { piAccount: account, signInPiAccount } = useSession()
  const signedIn = account?.id === MENTOR

  // `?autofill=0` empties the sign-in fields, which is what you want when the
  // thing you are there to watch is a mentor actually logging in.
  const autofill = params.get('autofill') !== '0'
  const [email, setEmail] = useState(autofill ? MENTOR_EMAIL : '')
  // Visibly not a real password. Nobody should ever type one into this.
  const [password, setPassword] = useState(autofill ? 'not-a-real-password' : '')
  const [signInError, setSignInError] = useState<string>()

  const [step, setStep] = useState<Step>('selector')
  /**
   * The selector's filters live here, not in the screen, because the chart
   * loops "find another project" back to the FILTERED list — so they have to
   * survive leaving the page. All start empty: filters that arrive switched on
   * would narrow the catalogue before the mentor knows they exist, and "do
   * they ever touch the Code Classroom one?" is a thing to watch.
   */
  const [filters, setFilters] = useState<Filters>({
    query: '',
    classroomOnly: false,
    levels: [],
    interests: [],
    technologies: [],
  })

  const [classes, setClasses] = useState<ClassGroup[]>(CLASSES)
  const [placed, setPlaced] = useState<Placed[]>(() =>
    Object.entries(ALREADY_THERE).flatMap(([classId, projectIds]) =>
      projectIds.map((id) => ({ project: project(id)!, classId, shownToStudents: true })),
    ),
  )

  const [activeClassId, setActiveClassId] = useState(CLASSES[0].id)
  const [activeProjectId, setActiveProjectId] = useState<string>()
  /** The project being looked at on Code Club Projects, before it is added. */
  const [viewingId, setViewingId] = useState<string>()
  const [newClassName, setNewClassName] = useState<string>()

  const activeClass = classes.find((group) => group.id === activeClassId) ?? classes[0]
  const activePlaced = placed.find(
    (item) => item.project.id === activeProjectId && item.classId === activeClassId,
  )
  const activeProject = activePlaced?.project
  const viewing = viewingId ? project(viewingId) : undefined

  const inClass = (classId: string) =>
    placed.filter((item) => item.classId === classId).map((item) => item.project)

  /** The mentor's classes that already hold the project being looked at. */
  const viewingIn = viewing
    ? placed
        .filter((item) => item.project.id === viewing.id)
        .map((item) => classes.find((group) => group.id === item.classId))
        .filter((group): group is ClassGroup => Boolean(group))
    : []

  /** Projects in a class that students cannot see yet — the crossed-out eye. */
  const hiddenIn = (classId: string) =>
    placed
      .filter((item) => item.classId === classId && !item.shownToStudents)
      .map((item) => item.project.id)

  function memberCount(classId: string) {
    return classes.find((group) => group.id === classId)?.studentIds.length ?? 0
  }

  function place(item: Project, classId: string) {
    setPlaced((current) =>
      current.some((p) => p.project.id === item.id && p.classId === classId)
        ? current
        : [...current, { project: item, classId, shownToStudents: false }],
    )
    setActiveClassId(classId)
    setActiveProjectId(item.id)
  }

  function show() {
    setPlaced((current) =>
      current.map((p) =>
        p.project.id === activeProjectId && p.classId === activeClassId
          ? { ...p, shownToStudents: true }
          : p,
      ),
    )
  }

  /** Author commentary. Rendered only in the workbench. */
  function Note({ children }: { children: ReactNode }) {
    if (!showWorkbench) return null
    return (
      <Card>
        <p className="body muted">{children}</p>
      </Card>
    )
  }

  const crumbs = (...rest: string[]) => ['Your school', ...rest]

  /** Code Classroom's only navigation. The trail is always school, class... */
  function goToCrumb(index: number) {
    if (index === 0) setStep('class')
    else if (index === 1) setStep('class')
  }

  // --- Code Club Projects: where this chart starts --------------------------

  if (step === 'selector') {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack">
          <ProjectSelector
            projects={PROJECTS}
            filters={filters}
            onFiltersChange={setFilters}
            onView={(projectId) => {
              setViewingId(projectId)
              setStep('project-landing')
            }}
          />
          <Note>
            The whole bet, and the opposite of the sibling prototype's. This one says a mentor
            opens the site they already know and finds a project the way they always have — so
            the route into Code Classroom has to start here. If they would really open Code
            Classroom first, this flow begins in the wrong place and "Out to Projects and back" is
            the right shape. Run the two with different mentors and the answer is the finding.
            <br />
            <br />
            This is the live project selector, and the proposal is one checkbox in the rail plus a
            tag on the cards. Three things to watch, in order of how much they would change:
            <br />
            <br />
            <strong>Which filter group they reach for.</strong> Sarah's assumption on the chart is
            that <em>"mentors will find a project based on technology over interest"</em>. Interest
            and Technology sit side by side here, so this screen can actually answer that — and
            the chart's "Scratch" box is a tick in Technology, not a page of its own.
            <br />
            <br />
            <strong>Whether they open the rail at all.</strong> Most people do not, which is why
            compatible cards carry a tag regardless. If the tag is doing all the work, the filter
            is a designer's answer to a problem the tag already solved.
            <br />
            <br />
            <strong>Whether anything here says Code Classroom exists.</strong> One checkbox, in a
            rail, on a page whose job is finding a project — against a mentor who may not know
            the two products connect at all.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'project-landing' && viewing) {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack">
          {/* The project's header, and the only place that says anything
              about this mentor's classes. Deliberately not on the catalogue
              cards: "already in a class" is a fact about one mentor, and the
              catalogue is shared with young people.

              Signed out there is nothing here at all, which is the honest
              state — Code Club Projects has no idea who is looking, so it
              cannot call out a club it does not know about. Sarah's green
              sticky asks whether we should make that call-out "if a user has a
              club connected to their account", and the answer only exists once
              they are logged in. */}
          {signedIn &&
            (viewingIn.length > 0 ? (
              <Alert
                type="success"
                title={`Already in ${viewingIn.map((group) => group.name).join(' and ')}`}
              >
                <p className="body">
                  Young people in {viewingIn.length === 1 ? 'that class' : 'those classes'} can
                  already find {viewing.title}. You can add it to another class as well.
                </p>
              </Alert>
            ) : (
              <Alert type="information" title={`You run ${CLUB.name}`}>
                <p className="body">
                  You can add this project to one of your classes in Code Classroom, with its
                  instructions and starter code.
                </p>
              </Alert>
            ))}

          <ProjectPage
            project={viewing}
            onStart={() => setStep('project-landing')}
            // Visible whether or not they are logged in, and the sign-in
            // happens after the intent rather than before it. Asking someone
            // to log in before they have said what they want is how you lose
            // them.
            onImport={() => setStep(signedIn ? 'choose-class' : 'sign-in')}
          />

          <Note>
            {signedIn
              ? 'Signed in, so the page can say something about their club — the banner is the green sticky\'s question made concrete. Worth asking whether it earns its place: it is the loudest thing on a page whose whole design drives at "Start project", and a mentor who came here to find something for Thursday may not want to be told what they run.'
              : 'Signed out, which is how a mentor usually arrives, and the page has nothing to say about their club because it does not know they have one. "Add to a class" is still offered — the intent comes first and the log-in comes after, because asking someone to log in before they have said what they want is how you lose them. Watch whether an offer to add to a class means anything to someone the site has not identified.'}
            <br />
            <br />
            Either way "Add to a class" has to compete with "Start project", which the live page
            repeats top and bottom.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'sign-in' && viewing) {
    return (
      <Surface id="pi-accounts" layout="centred">
        <div className="section-stack">
          <MentorSignIn
            email={email}
            password={password}
            onEmailChange={(value) => {
              setEmail(value)
              setSignInError(undefined)
            }}
            onPasswordChange={(value) => {
              setPassword(value)
              setSignInError(undefined)
            }}
            onLogIn={() => {
              // Matched on email only; the password is never checked, because
              // nothing here is real.
              if (email.trim().toLowerCase() !== MENTOR_EMAIL.toLowerCase()) {
                setSignInError(
                  `We do not recognise that email address. This mentor's account is ${MENTOR_EMAIL}.`,
                )
                return
              }
              signInPiAccount(MENTOR)
              setSignInError(undefined)
              setStep('choose-class')
            }}
            error={signInError}
          />
          <Note>
            A third product, mid-task. Adding a project to a class turns out to need a Raspberry Pi
            account, and signing in to one is a Pi Accounts page — so a mentor who started on Code
            Club Projects has now been sent somewhere with different chrome before they have
            finished the thing they came to do.
            <br />
            <br />
            This screen is NOT VERIFIED: it is behind a login, so `screens/MentorSignIn` was built
            from the pattern and its details are probably wrong.
            <br />
            <br />
            Two things worth watching. Whether anyone abandons here — a log-in wall in the middle
            of a browsing session is the most expensive step in the flow. And whether they come
            back to the right place: after signing in this returns them to choosing a class for
            the project they were looking at, rather than to the catalogue, which is the only
            version of this that is not infuriating.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Still on Projects: adding to a class ---------------------------------
  //
  // The chart puts these in the Code Classroom lane. They stay on Code Club
  // Projects here for two reasons: Divya settled that question on the sibling
  // prototype, following Experience CS, and holding it identical is what lets
  // the two prototypes be compared on the one thing they are meant to differ
  // about — where the mentor starts.

  if (step === 'choose-class' && viewing) {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack" style={CENTRED_COLUMN}>
          <AddToClass
            projectTitle={viewing.title}
            classes={classes}
            onAdd={(classId) => {
              place(viewing, classId)
              setNewClassName(undefined)
              setStep('success')
            }}
            onNew={() => setStep('new-class-how')}
            onBack={() => setStep('project-landing')}
          />
          <Note>
            Identical to the sibling prototype, on purpose. If these two flows differed here as
            well as at the start, a session could not tell which difference it was reacting to.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'new-class-how') {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack" style={CENTRED_COLUMN}>
          <HowToCreateClass
            onNameIt={() => setStep('new-class-name')}
            onBack={() => setStep('choose-class')}
          />
          <Note>
            A decision point with one option: the chart draws this diamond with a single branch
            leaving it, in both options. Left as drawn rather than invented.
            <br />
            <br />
            And it still claims the big thing — creating a Code Classroom class from inside Code
            Club Projects. Picking an existing class is a read; making one is a write into another
            product.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'new-class-name' && viewing) {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack" style={CENTRED_COLUMN}>
          <NameAndDescription
            projectTitle={viewing.title}
            onCreate={(name: string) => {
              const group: ClassGroup = {
                id: `class-new-${classes.length + 1}`,
                schoolId: CLUB.id,
                name,
                kind: 'code-club',
                studentIds: [],
              }
              setClasses((current) => [...current, group])
              setNewClassName(name)
              place(viewing, group.id)
              setStep('success')
            }}
            onBack={() => setStep('new-class-how')}
          />
          <Note>
            A class with nobody in it, and the mentor is two products away from the screen where
            they would add anyone.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'success' && activeProject) {
    return (
      <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
        <div className="section-stack" style={CENTRED_COLUMN}>
          <AddedToClass
            projectTitle={activeProject.title}
            className={activeClass.name}
            isNewClass={newClassName === activeClass.name}
            onViewClass={() => setStep('class')}
            // The chart loops back to the FILTERED LIST, not to a fresh
            // catalogue — so a mentor keeps every filter they set.
            onFindAnother={() => setStep('selector')}
          />
          <Note>
            "Find another project" returns to the selector with every filter and the search
            text as they left them, which is how the chart draws it. That matters more in this
            flow than in its sibling: a mentor who started here is already mid-browse, and setting
            up a term of sessions is the obvious next thing.
            <br />
            <br />
            "View your class" is the only button in the whole flow that leaves Code Club Projects.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Code Classroom, reached only by asking -------------------------------

  if (step === 'class') {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={crumbs(activeClass.name)}
        onCrumb={goToCrumb}
      >
        <div className="section-stack">
          <EducatorClassPage
            classGroup={activeClass}
            projects={inClass(activeClass.id)}
            hiddenProjectIds={hiddenIn(activeClass.id)}
            memberCount={memberCount(activeClass.id)}
            onAddProject={() => setStep('selector')}
            onOpenProject={(projectId) => {
              setActiveProjectId(projectId)
              setStep('project-page')
            }}
            onCopyLink={() => {}}
            onClassMembers={() => {}}
          />
          <Note>
            The first Code Classroom screen in the flow, and the mentor asked to come here. The
            project they just imported is in the list and marked with a crossed-out eye, because
            it arrives hidden from students.
            <br />
            <br />
            "Add project" here opens Code Classroom's own create dialog in the real product. In
            this prototype it goes back to Code Club Projects, which is a shortcut rather than a
            proposal — the sibling prototype is where that fork is designed.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'project-page' && activeProject) {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={crumbs(activeClass.name, activeProject.title)}
        onCrumb={goToCrumb}
      >
        <div className="section-stack">
          <EducatorProjectPage
            project={activeProject}
            work={[]}
            onViewCode={() => {}}
            onHideFromStudents={() => setStep('show-to-students')}
            onCopyLink={() => {}}
            onOpenWork={() => {}}
          />
          <Note>
            {activePlaced?.shownToStudents
              ? 'Visible now. "Student work" stays empty until someone saves, so a mentor cannot tell who has started and got stuck from who has not started.'
              : 'The imported project, hidden. The only thing on this page about visibility is "Hide from students" — the opposite of what the flow just did to it.'}
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'show-to-students' && activeProject) {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={crumbs(activeClass.name, activeProject.title)}
        onCrumb={goToCrumb}
      >
        <div className="section-stack">
          <ShowToStudents
            projectTitle={activeProject.title}
            className={activeClass.name}
            memberCount={memberCount(activeClass.id)}
            shown={activePlaced?.shownToStudents ?? false}
            onShow={show}
            onDone={() => setStep('class')}
            onBack={() => setStep('project-page')}
          />
          <Note>
            In square brackets on the chart, and it inverts the live product, which only offers
            "hide". Same open question as the sibling prototype — see notes.md there and here.
            <br />
            <br />
            Sarah's other sticky lands here too: <em>"when a YP starts the project, should they
            only be able to do it once, or are the options more like continue or start a new
            one"</em>. Nothing in this flow answers that, and it is a young person's question
            rather than a mentor's — it belongs in the import-yp lane.
          </Note>
        </div>
      </Surface>
    )
  }

  // Any step whose data went missing — only reachable by editing state by hand.
  return (
    <Surface id="ccp" account={signedIn ? 'Your Account' : 'Log In'}>
      <div className="section-stack">
        <Alert type="warning" title="Nothing to show">
          <p className="body">This step needs a project and there is not one.</p>
        </Alert>
        <Button type="secondary" text="Start again" onClick={() => setStep('selector')} />
      </div>
    </Surface>
  )
}
