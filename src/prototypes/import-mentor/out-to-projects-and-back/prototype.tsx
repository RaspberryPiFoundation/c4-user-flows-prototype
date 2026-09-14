import { useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Card } from '../../../kit'
import {
  PROJECTS,
  classesInSchool,
  project,
  school,
  schoolsForMentor,
  type ClassGroup,
  type Project,
} from '../../../fixtures'
import {
  ClassroomProjectEditor,
  EducatorClassPage,
  EducatorProjectPage,
  ProjectPage,
} from '../../../screens'
import { Surface } from '../../../surfaces'
import { AddProjectChoice } from './AddProjectChoice'
import { AddInstructions } from './CreateInClassroom'
import { AddToClass, AddedToClass } from './AddToClass'
import { MentorSchoolHome } from './MentorSchoolHome'
import { HowToCreateClass, NameAndDescription } from './NewClass'
import { ProjectsCatalogue } from './ProjectsCatalogue'
import { ShowToStudents } from './ShowToStudents'
import { createdProject, hasInstructions, withInstructions } from './projectTypes'
import { meta } from './meta'

// Everything comes from the one mentor named in meta.ts. Change the cast and
// the club, the classes and the school code all follow. Nothing below
// hardcodes Westlands.
//
// The pink sticky on the flow chart — "this assumes the mentor is logged in
// and has a school" — is satisfied by the cast rather than by a sign-in step,
// which is why `ownsSignIn` is not set: the workbench signs Thabo in before
// the flow renders, and the flow opens where the chart opens.
const MENTOR = meta.cast?.piAccount ?? ''
const CLUB = school(schoolsForMentor(MENTOR)[0].id)!
const CLASSES = classesInSchool(CLUB.id)

/**
 * What the mentor set up before today, so "Add project" sits in a class that
 * is already running rather than an empty one. Not from the chart — the chart
 * starts at a class page without saying what is in it.
 */
const ALREADY_THERE: Record<string, string[]> = {
  [CLASSES[0].id]: ['space-talk'],
}

/**
 * The narrow centred column the add-to-class steps sit in, like the Experience
 * CS cards they follow.
 *
 * Done here rather than with the Surface's own `layout="centred"`, which looks
 * right and is wrong for this: it suppresses the product's navigation, because
 * the pages it was built for — Pi Accounts, the Code Classroom sign-in — do not
 * have any. Code Club Projects does, and the whole point of keeping these steps
 * on Projects is that the mentor does not appear to leave. Chrome vanishing
 * halfway through would undo exactly what the change is for.
 *
 * 520px rather than that layout's 420px, measured rather than picked: the
 * widest button row here is "Find another project" plus "View your class" at
 * 241 + 8 + 190, and the card's own padding adds 48, so 488px is where they
 * stop stacking. The rest is slack. The row still wraps on a narrow window,
 * which is what should happen there.
 */
const CENTRED_COLUMN = { width: '100%', maxWidth: '520px', margin: '0 auto' } as const

/** A project sitting in one of this mentor's classes. */
interface Placed {
  project: Project
  classId: string
  /** Hidden until the mentor says otherwise — see ShowToStudents.tsx. */
  shownToStudents: boolean
}

// Neither the fork ("find a project or create your own") nor naming a new
// project is a step here. Both are steps INSIDE one dialog over the class page,
// so the class stays visible behind the question and nothing ever stacks — see
// AddProjectChoice.tsx. "Back" out of the find branch returns to the class with
// that dialog open again, rather than to a page of its own.
type Step =
  // Code Classroom
  | 'school'
  | 'class'
  // Create your own
  | 'create-project-page'
  | 'create-code'
  | 'create-instructions'
  // Find a project — Code Club Projects, then back
  | 'browse'
  | 'project-landing'
  | 'choose-class'
  | 'new-class-how'
  | 'new-class-name'
  | 'success'
  // Both branches end here
  | 'project-page'
  | 'show-to-students'

export default function OutToProjectsAndBack() {
  const [params] = useSearchParams()
  // Author commentary belongs to the team, not to the person being tested.
  const showWorkbench = params.get('full') !== '1'

  const [step, setStep] = useState<Step>('school')
  /** The "add a project" fork, open over the class page. */
  const [addOpen, setAddOpen] = useState(false)

  /** Back out of either branch: the class, with the fork open again. */
  function backToFork() {
    setStep('class')
    setAddOpen(true)
  }

  // Classes can grow: the find branch can create one on the way through.
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
  const [stepIndex, setStepIndex] = useState(0)

  const activeClass = classes.find((group) => group.id === activeClassId) ?? classes[0]
  const activePlaced = placed.find(
    (item) => item.project.id === activeProjectId && item.classId === activeClassId,
  )
  const activeProject = activePlaced?.project
  const viewing = viewingId ? project(viewingId) : undefined

  const inClass = (classId: string) =>
    placed.filter((item) => item.classId === classId).map((item) => item.project)

  /** Projects in a class that students cannot see yet — the crossed-out eye. */
  const hiddenIn = (classId: string) =>
    placed
      .filter((item) => item.classId === classId && !item.shownToStudents)
      .map((item) => item.project.id)

  function memberCount(classId: string) {
    return classes.find((group) => group.id === classId)?.studentIds.length ?? 0
  }

  /** Put a project in a class and make it the one being looked at. */
  function place(item: Project, classId: string) {
    setPlaced((current) =>
      current.some((p) => p.project.id === item.id && p.classId === classId)
        ? current
        : [...current, { project: item, classId, shownToStudents: false }],
    )
    setActiveClassId(classId)
    setActiveProjectId(item.id)
  }

  /** Replace a placed project, for "Add instructions". */
  function update(item: Project) {
    setPlaced((current) =>
      current.map((p) =>
        p.project.id === item.id && p.classId === activeClassId ? { ...p, project: item } : p,
      ),
    )
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

  /**
   * Where a breadcrumb goes. Code Classroom has no other navigation, so this
   * is the only way back up — and the trail here is always
   * ['Your school', class, project, ...], so an index maps to a step.
   */
  function goToCrumb(index: number) {
    if (index === 0) setStep('school')
    else if (index === 1) setStep('class')
    else if (index === 2) setStep('project-page')
  }

  // --- Code Classroom: where the chart starts --------------------------------

  if (step === 'school') {
    return (
      <Surface id="classroom" account="Your Account" breadcrumbs={crumbs()} onCrumb={goToCrumb}>
        <div className="section-stack">
          <MentorSchoolHome
            school={CLUB}
            classes={classes}
            memberCount={memberCount}
            onOpenClass={(classId) => {
              setActiveClassId(classId)
              setStep('class')
            }}
          />
          <Note>
            The chart's starting assumption, and the whole bet: {CLUB.name} already exists in Code
            Classroom and the mentor is already in it. If that is true, Code Classroom is the hub
            and this is where a mentor goes looking for a project. If a mentor would really open
            Code Club Projects first, this prototype is answering the wrong question — and that is
            the thing to watch for, before anyone touches a screen.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'class') {
    return (
      <Surface id="classroom" account="Your Account" breadcrumbs={crumbs(activeClass.name)} onCrumb={goToCrumb}>
        <div className="section-stack">
          <EducatorClassPage
            classGroup={activeClass}
            projects={inClass(activeClass.id)}
            hiddenProjectIds={hiddenIn(activeClass.id)}
            memberCount={memberCount(activeClass.id)}
            onAddProject={() => setAddOpen(true)}
            onOpenProject={(projectId) => {
              setActiveProjectId(projectId)
              setStep('project-page')
            }}
            onCopyLink={() => {}}
            onClassMembers={() => {}}
          />

          {/* The fork, over the class rather than instead of it. */}
          <AddProjectChoice
            isOpen={addOpen}
            setIsOpen={setAddOpen}
            className={activeClass.name}
            onFind={() => {
              setAddOpen(false)
              setStep('browse')
            }}
            onCreate={(name, type) => {
              setAddOpen(false)
              place(createdProject(name, type), activeClass.id)
              setStep('create-project-page')
            }}
          />

          <Note>
            The real class page, and everything on it except the dialog is real. Two things it
            already says that this flow has to live with: projects "contain starter code created
            by a teacher", so a project is the adult's to set up, and there is no sign anywhere
            that Code Club Projects exists.
            <br />
            <br />
            The crossed-out eye is the live product's own marker for a project students cannot see
            yet, and it is worth watching against finding 2 in notes.md: a project imported by
            this flow arrives hidden, so it shows up here marked, in a list beside projects that
            are live. Whether a mentor reads that icon as "not finished" or misses it entirely is
            the cheapest test of the hidden-by-default question.
            <br />
            <br />
            "Add project" is the only way on, and what it opens is the proposal. Today it goes
            straight to creating a project from nothing, with no question asked and no mention of
            Code Club Projects. Watch which option a mentor reads first, whether "find a project"
            reads as Code Club's own projects or as something vaguer, and whether anyone closes
            the dialog to go and look at the class again before choosing.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Create your own ------------------------------------------------------

  if (step === 'create-project-page' && activeProject) {
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
            onViewCode={() => {
              setStepIndex(0)
              setStep('create-code')
            }}
            onHideFromStudents={() => setStep('show-to-students')}
            onCopyLink={() => {}}
            onOpenWork={() => {}}
          />
          <Note>
            The real project page, and it disagrees with the chart. It offers "Hide from students",
            which means a project is visible as soon as it exists — the chart ends at "Show to
            students", which means the opposite. One of the two has to give; see notes.md.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'create-code' && activeProject) {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={crumbs(activeClass.name, activeProject.title)}
        onCrumb={goToCrumb}
      >
        <div className="section-stack">
          <ClassroomProjectEditor
            project={activeProject}
            stepIndex={stepIndex}
            onStepChange={setStepIndex}
            readyForReview={false}
            onReadyForReviewChange={() => {}}
            onSave={() => {}}
            onUpload={() => {}}
            onDownload={() => {}}
            onBack={() => setStep('create-project-page')}
          />
          <div className="cc-actions">
            <Button
              type="primary"
              text="Add instructions"
              onClick={() => setStep('create-instructions')}
            />
          </div>
          <Note>
            {hasInstructions(activeProject)
              ? 'The instructions the mentor wrote, in the panel a young person reads. Compare it with what an imported Code Club project arrives with.'
              : 'The chart sends the mentor here BEFORE "Add instructions", so the instructions panel has nothing in it — the mentor is writing starter code into a shell. The panel says so out loud rather than showing an empty step, because the screen has no empty state to show. See notes.md, finding 1.'}
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'create-instructions' && activeProject) {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={crumbs(activeClass.name, activeProject.title, 'Add instructions')}
        onCrumb={goToCrumb}
      >
        <div className="section-stack">
          <AddInstructions
            projectTitle={activeProject.title}
            onSave={(instructions: string) => {
              update(withInstructions(activeProject, instructions))
              setStep('show-to-students')
            }}
            onBack={() => setStep('create-code')}
          />
          <Note>
            Where the two branches rejoin. The chart runs a long connector from here straight to
            "Show to students", skipping the class page — so a mentor who creates their own project
            never passes back through the class to check it landed.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Find a project: out to Code Club Projects -----------------------------

  if (step === 'browse') {
    return (
      <Surface id="ccp" account="Your Account">
        <div className="section-stack">
          <ProjectsCatalogue
            projects={PROJECTS}
            alreadyAddedIds={placed.map((item) => item.project.id)}
            onView={(projectId) => {
              setViewingId(projectId)
              setStep('project-landing')
            }}
            onBack={backToFork}
          />
          <Note>
            A different product, and the chrome says so. Worth noticing what this crossing costs a
            mentor and does not cost a young person: {CLUB.name}'s mentor signs in here with the
            same Raspberry Pi account they use for Code Classroom, so leaving is free. A club
            member holding only a classroom account cannot follow them — which is why this route
            exists for mentors and not for the young people they are choosing on behalf of.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'project-landing' && viewing) {
    return (
      <Surface id="ccp" account="Your Account">
        <div className="section-stack">
          <ProjectPage
            project={viewing}
            onStart={() => setStep('project-landing')}
            onImport={() => setStep('choose-class')}
          />
          <Note>
            The real Code Club Projects landing page. "Add to my club" is PROPOSED — nothing like
            it exists on the live site or in the designs — and it has to compete with "Start
            project", which the page repeats top and bottom. Watch whether a mentor who came here
            to import ends up starting the project instead.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Adding to a class, all of it still on Code Club Projects -------------
  //
  // A DELIBERATE DEPARTURE FROM THE CHART, decided by Divya. The chart puts
  // "choose new or existing class" and everything after it in the Code
  // Classroom lane, so clicking "Add to a class" on Projects crossed a product
  // boundary mid-task, before the mentor had finished. Experience CS — the
  // other product that feeds Code Classroom — does the whole interaction on
  // its own side and crosses only at "View your class", and that is what the
  // flow does now.
  //
  // So every step below stays on the `ccp` surface, and no step below carries
  // breadcrumbs: breadcrumbs are Code Classroom's entire navigation model and
  // Code Club Projects does not have them.

  if (step === 'choose-class' && viewing) {
    return (
      <Surface id="ccp" account="Your Account">
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
            Still on Code Club Projects, which is the change: the mentor picks a Code Classroom
            class without leaving the site they are browsing on. Following Experience CS, which
            does the same job for the same Code Classroom. Watch whether anyone is surprised to
            be choosing a class here — and whether "School class" means anything to a volunteer
            whose club is not a school.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'new-class-how') {
    return (
      <Surface id="ccp" account="Your Account">
        <div className="section-stack" style={CENTRED_COLUMN}>
          <HowToCreateClass
            onNameIt={() => setStep('new-class-name')}
            onBack={() => setStep('choose-class')}
          />
          <Note>
            A decision point with one option. The chart draws this diamond with a single branch
            leaving it, so either there is a second way to create a class that the board does not
            show, or the diamond should not be a diamond. Left as drawn rather than invented —
            worth five minutes with Sarah before this goes in front of anyone.
            <br />
            <br />
            Worth noticing what it now claims, though: creating a Code Classroom class from
            inside Code Club Projects. Picking an existing class from here is a read; making a new
            one is a write into another product, and a bigger thing to ask for.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'new-class-name' && viewing) {
    return (
      <Surface id="ccp" account="Your Account">
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
            A class with nobody in it. The chart's next box is "Success", and it is worth asking
            what succeeded: the project is in a class no young person can reach until the mentor
            goes and adds them, which is a job this flow never mentions — and which now sits in a
            different product from the one they are standing in.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'success' && activeProject) {
    return (
      <Surface id="ccp" account="Your Account">
        <div className="section-stack" style={CENTRED_COLUMN}>
          <AddedToClass
            projectTitle={activeProject.title}
            className={activeClass.name}
            isNewClass={newClassName === activeClass.name}
            onViewClass={() => setStep('class')}
            onFindAnother={() => setStep('browse')}
          />
          <Note>
            The same card as the step before it, which is how Experience CS does it — same
            heading, a tick, and one sentence saying what went where.
            <br />
            <br />
            This is the only screen in the flow that crosses products, and it makes the mentor ask
            for it: "View your class" is the one button that leaves Code Club Projects. "Find
            another project" keeps them here and loops back to the catalogue, which is the chart's
            own loop and the thing a mentor setting up a term of sessions actually wants. Watch
            which of the two they reach for — and whether they notice the product changed when
            they do leave.
          </Note>
        </div>
      </Surface>
    )
  }

  // --- Both branches end here -----------------------------------------------

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
            onViewCode={() => {
              setStepIndex(0)
              setStep('create-code')
            }}
            onHideFromStudents={() => setStep('show-to-students')}
            onCopyLink={() => {}}
            onOpenWork={() => {}}
          />
          <Note>
            {activePlaced?.shownToStudents
              ? 'The imported project, in the class, visible. "Student work" is empty and stays empty until someone saves — a mentor cannot tell who has started and got stuck from who has not started.'
              : 'The imported project is here and hidden. The only thing on this page about visibility is "Hide from students" — the opposite of what this flow just did to it. A mentor looking for "show to students" will not find it here.'}
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
            The end of both branches, and the most uncertain screen here — it is in square brackets
            on the chart for a reason. It inverts the live product: today a project is visible the
            moment it exists. The sticky's question is the one to test, and it cannot be tested by
            asking. Watch whether a mentor leaves this screen without pressing the button, then ask
            them what a young person can see.
          </Note>
        </div>
      </Surface>
    )
  }

  // Any step whose data went missing — only reachable by editing state by hand.
  return (
    <Surface id="classroom" account="Your Account" breadcrumbs={crumbs()} onCrumb={goToCrumb}>
      <div className="section-stack">
        <Alert type="warning" title="Nothing to show">
          <p className="body">This step needs a project and there is not one.</p>
        </Alert>
        <Button type="secondary" text="Start again" onClick={() => setStep('school')} />
      </div>
    </Surface>
  )
}
