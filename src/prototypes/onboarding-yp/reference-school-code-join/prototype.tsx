import { useEffect, useState } from 'react'
import { Alert, Card } from '../../../kit'
import { CLASSROOM_STUDENTS, classesInSchool, school, schoolBySchoolCode } from '../../../fixtures'
import {
  RoleChooser,
  SchoolCodeEntry,
  StudentSignIn,
  YoungPersonSchoolHome,
} from '../../../screens'
import { Surface } from '../../../surfaces'
import { useSession } from '../../../session'
import { meta } from './meta'

// Everything about this flow comes from the one young person named in meta.ts.
// Nothing is hardcoded to a particular club, so changing the cast changes the
// whole story — the code, the username, the club they land in.
const STUDENT = CLASSROOM_STUDENTS.find((s) => s.id === meta.cast?.classroomStudent)!
const CLUB = school(STUDENT.schoolId)!

type Step = 'role' | 'code' | 'signin' | 'home'

export default function SchoolCodeJoin() {
  const { autofill, classroomStudent, signInClassroomStudent } = useSession()
  const [step, setStep] = useState<Step>('role')
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  // Fill in this young person's code and username, so a demo does not begin
  // with retyping six digits. Turn autofill off in the bar to watch someone
  // actually type it — which in a testing session is the point.
  useEffect(() => {
    setCode(autofill.schoolCode)
    setUsername(autofill.username)
    setPassword(autofill.password)
  }, [autofill.schoolCode, autofill.username, autofill.password])

  if (step === 'role') {
    return (
      <Surface id="classroom" layout="centred">
        <RoleChooser
          onTeacher={() => setError('This walkthrough follows the young person route.')}
          onStudent={() => {
            setStep('code')
            setError(undefined)
          }}
          error={error}
        />
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
            // Any real club's code gets you in — a young person who typed a
            // neighbouring club's code by mistake would get through to a
            // sign-in they cannot complete, which is worth seeing.
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
            if (match) {
              signInClassroomStudent(match.id)
              setStep('home')
              setError(undefined)
            } else if (enteredClub && enteredClub.id !== CLUB.id) {
              setError(
                `That username is not at ${enteredClub.name}. The code you typed belongs to a different club.`,
              )
            } else {
              setError(
                `We do not recognise that username. Your mentor would have given you one — ${CLUB.name} uses names like ${STUDENT.username}.`,
              )
            }
          }}
          error={error}
        />
      </Surface>
    )
  }

  const landedClub = classroomStudent ? school(classroomStudent.schoolId) ?? CLUB : CLUB

  return (
    <Surface id="classroom" account="Log Out" breadcrumbs={['Your school']}>
      <div className="section-stack">
        <Alert type="success" title="Signed in">
          <p className="body">
            Four screens, a six-digit code and a username. Count how much of that a young person
            could do without a mentor standing next to them.
          </p>
        </Alert>
        <YoungPersonSchoolHome
          school={landedClub}
          classes={classesInSchool(landedClub.id)}
          onOpenClass={() => {}}
        />
        <Card>
          <p className="body muted">
            Signed in as <strong>{classroomStudent?.name ?? 'nobody'}</strong>. This account works
            only in Code Classroom — the same young person on Code Club Projects would be asked to
            log in or sign up all over again.
          </p>
        </Card>
      </div>
    </Surface>
  )
}
