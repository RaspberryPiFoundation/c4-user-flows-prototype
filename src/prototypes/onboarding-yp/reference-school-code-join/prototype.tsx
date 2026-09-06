import { useEffect, useState } from 'react'
import { Alert, Card } from '../../../kit'
import { SCHOOLS, classesInSchool, schoolBySchoolCode } from '../../../fixtures'
import {
  RoleChooser,
  SchoolCodeEntry,
  StudentSignIn,
  YoungPersonSchoolHome,
} from '../../../screens'
import { Surface } from '../../../surfaces'
import { useSession } from '../../../session'

// Signed out, and staying that way until they sign in — which is the point.
// A young person in a club has no Pi account and has not yet used their
// classroom account on this device.

type Step = 'role' | 'code' | 'signin' | 'home'

const CLUB = SCHOOLS[0]

export default function SchoolCodeJoin() {
  const { classroomStudent, signInClassroomStudent, reset } = useSession()
  const [step, setStep] = useState<Step>('role')
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  useEffect(() => {
    reset()
  }, [reset])

  if (step === 'role') {
    return (
      <Surface id="classroom" layout="centred">
        <RoleChooser
          onTeacher={() => setError('This walkthrough follows the young person route.')}
          onStudent={() => setStep('code')}
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
            // Accepts the real code only. A wrong one is the interesting path:
            // it is what a mistyped digit off a whiteboard actually produces.
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
            setError('A club member will not have a school Google account. This route is a dead end for clubs.')
          }
          onLogIn={() => {
            // Any username in the club is accepted; the password is not checked,
            // because nothing here is real.
            const match = CLUB.id === 'school-westlands' ? 'cs-amara' : undefined
            if (username.trim() && match) {
              signInClassroomStudent(match)
              setStep('home')
              setError(undefined)
            } else {
              setError('Enter a username. Try amara.k — your mentor would have given you one.')
            }
          }}
          error={error}
        />
      </Surface>
    )
  }

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
          school={CLUB}
          classes={classesInSchool(CLUB.id)}
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
