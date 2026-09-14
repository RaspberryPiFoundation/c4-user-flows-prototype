import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Card } from '../../../kit'
import {
  CLASSROOM_STUDENTS,
  PROJECTS,
  classesForStudent,
  project,
  school,
  schoolBySchoolCode,
  type Project,
} from '../../../fixtures'
import {
  ClassroomProjectEditor,
  ProjectPage,
  RoleChooser,
  SchoolCodeEntry,
  StudentSignIn,
  YoungPersonSchoolHome,
  type WorkStatus,
} from '../../../screens'
import { Surface } from '../../../surfaces'
import { useSession } from '../../../session'
import { ClassProjects } from './ClassProjects'
import { ClassroomHome } from './ClassroomHome'
import { UpdatePassword } from './UpdatePassword'
import { ProjectLibrary } from './ProjectLibrary'
import {
  ProjectCreated,
  ProjectTypeModal,
  StartChoiceModal,
  type StartChoice,
} from './AddProjectChoices'
import { WorkbenchControls, type Conditions } from './WorkbenchControls'
import { defaultProjectName, fromScratchProject, type ProjectTypeId } from './projectTypes'
import { meta } from './meta'

// Everything comes from the one young person named in meta.ts. Change the cast
// and the whole story changes — the club, the class, the school code, the
// username. Nothing below hardcodes Galway.
const STUDENT = CLASSROOM_STUDENTS.find((s) => s.id === meta.cast?.classroomStudent)!
const CLUB = school(STUDENT.schoolId)!
const CLASSES = classesForStudent(STUDENT.id)

// Kofi is in one class. A young person at St Aidan's is in two, so this takes
// the club rather than assuming there is only ever one.
const CLASS = CLASSES.find((group) => group.kind === 'code-club') ?? CLASSES[0]

/** What the mentor set up before the session — the only thing reachable today. */
const MENTOR_SET_UP: Array<{ projectId: string; status: WorkStatus }> = [
  { projectId: 'space-talk', status: 'complete' },
]

type Step =
  | 'home'
  | 'role'
  | 'teacher-end'
  | 'code'
  | 'signin'
  | 'update-password'
  | 'classes'
  | 'class'
  | 'start-choice'
  | 'type-from-scratch'
  | 'type-browse'
  | 'browse'
  | 'details'
  | 'created'
  | 'editor'

export default function CreateOrBrowseInClassroom() {
  const [params] = useSearchParams()
  // Author commentary and the condition switches belong to the team, not to
  // the person being tested.
  const showWorkbench = params.get('full') !== '1'

  const { autofill, signInClassroomStudent } = useSession()

  const [conditions, setConditions] = useState<Conditions>({
    firstLogin: true,
    inAClass: true,
    leaderMadeProject: true,
  })

  const [step, setStep] = useState<Step>('home')
  const [error, setError] = useState<string>()

  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [startChoice, setStartChoice] = useState<StartChoice>('scratch')
  const [chosenType, setChosenType] = useState<ProjectTypeId>('Blocks')
  const [projectName, setProjectName] = useState(defaultProjectName('Blocks'))
  // Once someone types their own name, changing the type must not wipe it.
  const [nameEdited, setNameEdited] = useState(false)
  const [viewingId, setViewingId] = useState<string>()
  const [openProjectId, setOpenProjectId] = useState<string>()
  const [stepIndex, setStepIndex] = useState(0)
  const [readyForReview, setReadyForReview] = useState(false)

  // Projects the young person added themselves — the thing being proposed.
  // From-scratch ones are not in the fixtures, so they are carried whole.
  const [added, setAdded] = useState<Project[]>([])

  // Fill in this young person's code and username, so a demo does not open on
  // retyping six digits. `?autofill=0` empties them, which is what you want
  // when the thing you are there to watch is someone actually typing.
  useEffect(() => {
    setCode(autofill.schoolCode)
    setUsername(autofill.username)
    setPassword(autofill.password)
  }, [autofill.schoolCode, autofill.username, autofill.password])

  // Kept apart rather than merged, because where a project came from is now
  // the thing the screen is organised around.
  const assignedProjects = conditions.leaderMadeProject
    ? MENTOR_SET_UP.map(({ projectId, status }) => ({ project: project(projectId)!, status }))
    : []
  const createdProjects = added.map((item) => ({
    project: item,
    status: 'ready-for-you' as WorkStatus,
  }))
  const classProjects = [...assignedProjects, ...createdProjects]

  const classes = conditions.inAClass ? CLASSES : []
  const openProject =
    added.find((item) => item.id === openProjectId) ??
    (openProjectId ? project(openProjectId) : undefined)
  const viewing = viewingId ? project(viewingId) : undefined

  function addProject(item: Project) {
    setAdded((current) => (current.some((p) => p.id === item.id) ? current : [...current, item]))
    setOpenProjectId(item.id)
    setStep('created')
  }

  function open(projectId: string) {
    setOpenProjectId(projectId)
    setStepIndex(0)
    setReadyForReview(false)
    setStep('editor')
  }

  /** Author commentary. Rendered only in the workbench. */
  function Note({ children }: { children: React.ReactNode }) {
    if (!showWorkbench) return null
    return (
      <Card>
        <p className="body muted">{children}</p>
      </Card>
    )
  }

  // --- Signed out -----------------------------------------------------------

  if (step === 'home') {
    return (
      <Surface id="classroom">
        <div className="section-stack">
          {showWorkbench && (
            <WorkbenchControls conditions={conditions} onChange={setConditions} />
          )}
          <ClassroomHome onLogIn={() => setStep('role')} />
        </div>
      </Surface>
    )
  }

  if (step === 'role') {
    return (
      <Surface id="classroom" layout="centred">
        <RoleChooser
          onTeacher={() => setStep('teacher-end')}
          onStudent={() => {
            setStep('code')
            setError(undefined)
          }}
          error={error}
        />
      </Surface>
    )
  }

  if (step === 'teacher-end') {
    return (
      <Surface id="classroom" layout="centred">
        <Card>
          <h1 className="title-md">This is the mentor's route</h1>
          <p className="body muted">
            A club leader signs in here to create the school and the class, and to make the
            accounts the young people use. That flow is its own question — see the
            onboarding-mentor lane.
          </p>
          <Button type="secondary" text="Back" onClick={() => setStep('role')} />
        </Card>
      </Surface>
    )
  }

  if (step === 'code') {
    return (
      <Surface id="pi-accounts" badge="Code Classroom" layout="centred">
        <SchoolCodeEntry
          value={code}
          onChange={(value) => {
            setCode(value)
            setError(undefined)
          }}
          onContinue={() => {
            if (schoolBySchoolCode(code)) {
              setStep('signin')
              setError(undefined)
            } else {
              setError(
                `Check the code and try again. It is six numbers, like ${CLUB.schoolCode}, and your mentor can tell you what it is.`,
              )
            }
          }}
          error={error}
        />
      </Surface>
    )
  }

  if (step === 'signin') {
    const enteredClub = schoolBySchoolCode(code)
    return (
      <Surface id="pi-accounts" badge="Code Classroom" layout="centred">
        <StudentSignIn
          schoolCode={code}
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onChangeSchoolCode={() => {
            setStep('code')
            setError(undefined)
          }}
          onGoogleLogIn={() =>
            setError(
              'A club member will not have a school Google account. This route is a dead end for clubs.',
            )
          }
          onLogIn={() => {
            // Matches on username within the club whose code was entered. The
            // password is never checked, because nothing here is real.
            const match = CLASSROOM_STUDENTS.find(
              (s) => s.username === username.trim() && s.schoolId === enteredClub?.id,
            )
            if (!match) {
              setError(
                `We do not recognise that username. Your mentor would have given you one — ${CLUB.name} uses names like ${STUDENT.username}.`,
              )
              return
            }
            signInClassroomStudent(match.id)
            setError(undefined)
            setStep(conditions.firstLogin ? 'update-password' : 'classes')
          }}
          error={error}
        />
      </Surface>
    )
  }

  if (step === 'update-password') {
    return (
      <Surface id="pi-accounts" badge="Code Classroom" layout="centred">
        <UpdatePassword
          password={newPassword}
          confirm={confirmPassword}
          onPasswordChange={(value) => {
            setNewPassword(value)
            setError(undefined)
          }}
          onConfirmChange={(value) => {
            setConfirmPassword(value)
            setError(undefined)
          }}
          onSave={() => {
            if (!newPassword) {
              setError('Type a new password first.')
            } else if (newPassword !== confirmPassword) {
              setError('The two passwords are not the same.')
            } else {
              setError(undefined)
              setStep('classes')
            }
          }}
          error={error}
        />
      </Surface>
    )
  }

  // --- Signed in ------------------------------------------------------------

  if (step === 'classes') {
    return (
      <Surface id="classroom" account="Log Out" breadcrumbs={['Your school']}>
        <div className="section-stack">
          <YoungPersonSchoolHome
            school={CLUB}
            classes={classes}
            onOpenClass={() => setStep('class')}
          />
          {classes.length === 0 ? (
            <Note>
              A dead end, and a real one. The account works, the sign-in worked, and there is
              nothing here — a young person whose mentor has not added them to a class yet has
              nowhere to go and nothing telling them why.
            </Note>
          ) : (
            <Note>
              {STUDENT.name} is signed in with the account their mentor made them. They have no
              Raspberry Pi account, which is the ordinary case — so on Code Club Projects today
              they are a stranger.
            </Note>
          )}
        </div>
      </Surface>
    )
  }

  if (step === 'class') {
    return (
      <Surface id="classroom" account="Log Out" breadcrumbs={['Your school', CLASS.name]}>
        <div className="section-stack">
          <ClassProjects
            classGroup={CLASS}
            assigned={assignedProjects}
            created={createdProjects}
            initialTab={createdProjects.length > 0 ? 'created' : 'assigned'}
            onOpenProject={open}
            onAddProject={() => setStep('start-choice')}
          />


          <Note>
            {added.length > 0
              ? `"Created by you" holds ${added.length} that ${STUDENT.name.split(' ')[0]} made. Today that section could not exist — a class holds only what an adult put there.`
              : 'Today there is one undifferentiated list, and everything in it was put there by an adult. The second tab is the proposal: a place for your own work, and the only route into it.'}
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'start-choice') {
    // On the class page, as the language dialog is — you can still see what
    // you are adding to while you decide.
    return (
      <Surface id="classroom" account="Log Out" breadcrumbs={['Your school', CLASS.name]}>
        <div className="section-stack">
          <ClassProjects
            classGroup={CLASS}
            assigned={assignedProjects}
            created={createdProjects}
            initialTab={createdProjects.length > 0 ? 'created' : 'assigned'}
            onOpenProject={open}
            onAddProject={() => setStep('start-choice')}
          />

          <StartChoiceModal
            selected={startChoice}
            onSelect={setStartChoice}
            onContinue={() =>
              setStep(startChoice === 'scratch' ? 'type-from-scratch' : 'type-browse')
            }
            onCancel={() => setStep('class')}
          />

          <Note>
            The fork this prototype exists to test. "From scratch" is something Code Classroom
            has never offered a young person; "browse" is Code Club Projects' whole catalogue,
            reached without leaving. Watch which one someone reaches for, whether the two read as
            equals, and whether being asked twice in a row — route, then language — feels like
            one decision or two.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'type-from-scratch' || step === 'type-browse') {
    const fromScratch = step === 'type-from-scratch'

    // The modal sits ON the class page, as the real one does — a dialog over
    // the projects list, not a page of its own. Keeping the page behind it is
    // half the point: you can still see what you are adding to.
    return (
      <Surface id="classroom" account="Log Out" breadcrumbs={['Your school', CLASS.name]}>
        <div className="section-stack">
          <ClassProjects
            classGroup={CLASS}
            assigned={assignedProjects}
            created={createdProjects}
            initialTab={createdProjects.length > 0 ? 'created' : 'assigned'}
            onOpenProject={open}
            onAddProject={() => setStep('start-choice')}
          />

          <ProjectTypeModal
            heading={fromScratch ? 'Create a new project' : 'Find a project'}
            confirmText={fromScratch ? 'Create project' : 'Show projects'}
            selected={chosenType}
            onSelect={(type) => {
              setChosenType(type)
              if (!nameEdited) setProjectName(defaultProjectName(type))
            }}
            name={fromScratch ? projectName : undefined}
            onNameChange={
              fromScratch
                ? (value) => {
                    setProjectName(value)
                    setNameEdited(true)
                  }
                : undefined
            }
            onConfirm={() => {
              if (fromScratch) {
                addProject(fromScratchProject(chosenType, projectName, added.length + 1))
                // Ready for the next one, if they loop round again.
                setProjectName(defaultProjectName(chosenType))
                setNameEdited(false)
              } else {
                setStep('browse')
              }
            }}
            onCancel={() => setStep('start-choice')}
          />

          <Note>
            Built to match the mentor's own "Create a new project" modal — same three types, same
            descriptions, same shape. A young person and a mentor adding a project should be doing
            recognisably the same thing, or a mentor cannot help from memory when someone is
            stuck. The question drops "for your students", which is the only copy that could not
            survive the change of audience.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'browse') {
    return (
      <Surface
        id="classroom"
        account="Log Out"
        breadcrumbs={['Your school', CLASS.name, `${chosenType} projects`]}
      >
        <div className="section-stack">
          <ProjectLibrary
            projects={PROJECTS}
            type={chosenType}
            inClassIds={classProjects.map(({ project: item }) => item.id)}
            onView={(projectId) => {
              setViewingId(projectId)
              setStep('details')
            }}
            onBack={() => setStep('type-browse')}
          />
          <Note>
            Code Club Projects' catalogue, without Code Club Projects. Today this means leaving
            for a site they cannot sign in to. Watch whether anyone expects to leave.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'details' && viewing) {
    return (
      <Surface
        id="classroom"
        account="Log Out"
        breadcrumbs={['Your school', CLASS.name, viewing.title]}
      >
        <div className="section-stack">
          {/* The same dead end the success screen had: `ProjectPage` offers
              only "Start project" and "Add to a class", so without this a
              young person who looked at a project and did not want it could
              not get back to the list. */}
          <div className="cc-actions">
            <Button type="secondary" size="small" text="Back" onClick={() => setStep('browse')} />
          </div>
          <ProjectPage
            project={viewing}
            onStart={() => addProject(viewing)}
            onImport={() => addProject(viewing)}
          />
          <Note>
            This is the real Code Club Projects landing page, wearing Code Classroom's chrome —
            reused rather than rebuilt, so what a young person reads is what they would really
            read. Two things it exposes: the page drives at "Start project", and "Add to a class"
            (the proposed action) now sits beside it meaning the same thing. Two buttons, one
            outcome, is a problem to fix before this is real.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'created' && openProject) {
    // Over the class page, so closing lands somewhere real — and so the thing
    // they just made is already visible behind the dialog.
    return (
      <Surface id="classroom" account="Log Out" breadcrumbs={['Your school', CLASS.name]}>
        <div className="section-stack">
          <ClassProjects
            classGroup={CLASS}
            assigned={assignedProjects}
            created={createdProjects}
            initialTab={createdProjects.length > 0 ? 'created' : 'assigned'}
            onOpenProject={open}
            onAddProject={() => setStep('start-choice')}
          />

          <ProjectCreated
            projectTitle={openProject.title}
            isOwnProject={added.some(
              (item) => item.id === openProject.id && item.starterCode === '',
            )}
            onView={() => open(openProject.id)}
            onAddAnother={() => setStep('start-choice')}
            onClose={() => setStep('class')}
          />

          <Note>
            "Add another" goes back to the fork, and closing goes back to the class — which it
            has to, because as a page this was a dead end with only two ways out. Worth checking
            whether someone who just made one thing wants to make a second immediately, or
            whether that button is one nobody uses.
          </Note>
        </div>
      </Surface>
    )
  }

  if (step === 'editor' && openProject) {
    const invented = added.some((item) => item.id === openProject.id && item.starterCode === '')
    return (
      <Surface
        id="classroom"
        account="Log Out"
        breadcrumbs={['Your school', CLASS.name, openProject.title]}
      >
        <div className="section-stack">
          <ClassroomProjectEditor
            project={openProject}
            stepIndex={stepIndex}
            onStepChange={setStepIndex}
            readyForReview={readyForReview}
            onReadyForReviewChange={setReadyForReview}
            onSave={() => {}}
            onUpload={() => {}}
            onDownload={() => {}}
            onBack={() => setStep('class')}
          />
          <Note>
            {invented
              ? 'A from-scratch project in an editor built around instruction steps. The left-hand pane has to say something, and there is nothing to say — so it holds a step that is not a step. That mismatch is a finding: "start from scratch" does not fit the screen it lands on.'
              : 'Same editor, same project, and saving just works — no "log in to save your progress". On Code Club Projects this young person has no account to save with. The surface never changed: they are still in Code Classroom.'}
          </Note>
        </div>
      </Surface>
    )
  }

  // Any step whose data went missing — only reachable by editing state by hand.
  return (
    <Surface id="classroom" account="Log Out" breadcrumbs={['Your school']}>
      <Alert type="warning" title="Nothing to show">
        <p className="body">
          This step needs a project and there is not one. Start again from the top.
        </p>
      </Alert>
      <Button type="secondary" text="Start again" onClick={() => setStep('home')} />
    </Surface>
  )
}
