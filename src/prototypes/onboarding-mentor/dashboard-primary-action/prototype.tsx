import { useEffect, useState } from 'react'
import { Alert, Button, Card, ProgressBar } from '../../../kit'
import { schoolsForMentor, type ClassGroup, type School } from '../../../fixtures'
import { EducatorClassPage } from '../../../screens'
import { Surface } from '../../../surfaces'
import { meta } from './meta'
import { DashboardWithClassroom } from './DashboardWithClassroom'

// A mentor, signed in on codeclub.org. Everything below comes from the cast in
// meta.ts — Jo manages two clubs, so the dashboard has two cards and "which
// club am I setting up?" is answered by which card you press.
const CLUBS: School[] = schoolsForMentor(meta.cast?.piAccount ?? '')

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

/**
 * The class automatic setup would create, named from what codeclub.org already
 * knows about the club's sessions. Derived, not hardcoded: change the cast and
 * the club, the code and the class name all follow.
 *
 * Only one class, because that is all an automatic setup can honestly infer.
 * Westlands really runs a Scratch group and a Python group — see notes.
 */
function autoClass(club: School): ClassGroup {
  const day = DAYS.find((d) => club.schedule?.includes(d))
  return {
    id: `auto-${club.id}`,
    schoolId: club.id,
    name: day ? `${day} club` : 'Club session',
    kind: 'code-club',
    studentIds: [],
  }
}

type Step = 'dashboard' | 'confirm' | 'creating' | 'created' | 'classroom'

export default function DashboardPrimaryAction() {
  const [step, setStep] = useState<Step>('dashboard')
  /** Clubs that have been through setup, so the button changes on return. */
  const [setUpClubIds, setSetUpClubIds] = useState<string[]>([])
  const [activeClubId, setActiveClubId] = useState<string>(CLUBS[0].id)
  /** What a route we have not built would have done. */
  const [notice, setNotice] = useState<string>()

  const club = CLUBS.find((c) => c.id === activeClubId) ?? CLUBS[0]
  const classes = [autoClass(club)]

  // Fake latency, because "it set itself up" is a claim about how long a
  // mentor waits, and a setup that returns instantly tests a different thing.
  useEffect(() => {
    if (step !== 'creating') return
    const timer = setTimeout(() => {
      setSetUpClubIds((ids) => (ids.includes(club.id) ? ids : [...ids, club.id]))
      setStep('created')
    }, 1800)
    return () => clearTimeout(timer)
  }, [step, club.id])

  const noticeAlert = notice ? (
    <Alert type="information" text={notice} closable onClose={() => setNotice(undefined)} />
  ) : null

  /** What setup makes, derived from the club. Shown before and after. */
  const whatYouGet = (
    <ul className="disclaimer-list">
      <li>
        A school called <strong>{club.name}</strong> — Code Classroom&apos;s word, not ours
      </li>
      <li>
        A club code of <strong>{club.schoolCode}</strong>, for young people to sign in with
      </li>
      <li>
        One class, <strong>{classes[0].name}</strong>, from your session time
      </li>
    </ul>
  )

  // The mentor is asked once, and asked nothing else. No form, no naming, no
  // choosing whether the club is a school or a class — all of that is
  // answerable from what Code Club already knows.
  if (step === 'confirm') {
    return (
      <Surface id="code-club" account="Your Account">
        <div className="section-stack">
          <h1 className="title-lg">Set up Code Classroom for {club.name}?</h1>

          <Card>
            <h2 className="title-sm">What Code Classroom is</h2>
            <p className="body">
              A place to run the coding side of your club. You choose a project, and the young
              people at your club open it, work on it and save it — so their work is still there
              next week, and you can see it.
            </p>
            <ul className="disclaimer-list">
              <li>
                <strong>You set the projects.</strong> Young people work on what you have shared
                with the class, rather than picking their own.
              </li>
              <li>
                <strong>You create their accounts.</strong> A username and password you make, with
                no email addresses and nothing for a parent to sign up to.
              </li>
              <li>
                <strong>Their work stays put.</strong> They sign in with your club code, and come
                back to what they saved.
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="title-sm">If you continue, we will set up</h2>
            {whatYouGet}
            <p className="body muted">
              Nothing is announced to your club and nothing is public. You can come back and change
              the names later.
            </p>
          </Card>

          <div className="cc-actions">
            <Button
              type="primary"
              text="Yes, set up Code Classroom"
              onClick={() => setStep('creating')}
            />
            <Button type="secondary" text="Not now" onClick={() => setStep('dashboard')} />
          </div>
        </div>
      </Surface>
    )
  }

  if (step === 'creating') {
    return (
      <Surface id="code-club" account="Your Account">
        <div className="section-stack">
          <h1 className="title-lg">Setting up Code Classroom</h1>
          <Card>
            <ProgressBar text={`Creating ${club.name} in Code Classroom`} percent={60} />
            <p className="body muted">This will take a few seconds. You do not need to do anything.</p>
          </Card>
        </div>
      </Surface>
    )
  }

  if (step === 'created') {
    return (
      <Surface id="code-club" account="Your Account">
        <div className="section-stack">
          <h1 className="title-lg">Your Code Classroom account has been created</h1>

          <Card>
            <h2 className="title-sm">What was set up</h2>
            {whatYouGet}
            <p className="body muted">
              You sign in with the same Raspberry Pi account you use for Code Club — there is no new
              password to remember.
            </p>
            <p className="body muted">
              Not set up: an account for each young person at your club. Nothing on codeclub.org
              knows who they are, so that part cannot be done for you.
            </p>
            <Button
              type="primary"
              text="Go to Code Classroom"
              onClick={() => setStep('classroom')}
            />
          </Card>
        </div>
      </Surface>
    )
  }

  // Where a mentor lands: the real Code Classroom page, in the empty state a
  // mentor who has just been set up would actually find. Code Classroom has no
  // educator home page to land on instead — you arrive at a class and move by
  // breadcrumb — so this is the product as it is, not a proposal.
  if (step === 'classroom') {
    return (
      <Surface
        id="classroom"
        account="Your Account"
        breadcrumbs={['Your school', classes[0].name]}
      >
        <div className="section-stack">
          {noticeAlert}
          <Button
            type="secondary"
            size="small"
            text="Back to codeclub.org"
            onClick={() => setStep('dashboard')}
          />
          <EducatorClassPage
            classGroup={classes[0]}
            projects={[]}
            memberCount={0}
            onAddProject={() =>
              setNotice(
                'Not built here — getting a Code Club project into Code Classroom is the importing lane’s question.',
              )
            }
            onOpenProject={() => {}}
            onCopyLink={() =>
              setNotice(
                'Copy link shares the class. It skips the club code screen, but a young person still needs an account you made for them.',
              )
            }
            onClassMembers={() =>
              setNotice('No members yet. You have not created any accounts.')
            }
          />
        </div>
      </Surface>
    )
  }

  return (
    <Surface id="code-club" account="Your Account">
      <DashboardWithClassroom
        clubsManaged={CLUBS}
        pendingRequests={[]}
        onDismissRequest={() => {}}
        onManageClub={() => {}}
        onViewPublicProfile={() => {}}
        onStartAClub={() => {}}
        onFindAClub={() => {}}
        isSetUp={(schoolId) => setUpClubIds.includes(schoolId)}
        onCodeClassroom={(schoolId) => {
          setActiveClubId(schoolId)
          // Already set up? Straight in. Otherwise the mentor is asked first.
          setStep(setUpClubIds.includes(schoolId) ? 'classroom' : 'confirm')
        }}
      />
    </Surface>
  )
}
