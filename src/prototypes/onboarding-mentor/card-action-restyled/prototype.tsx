import { useEffect, useState, type CSSProperties } from 'react'
import { Alert, Button, Card, ProgressBar } from '../../../kit'
import { schoolsForMentor, type ClassGroup, type School } from '../../../fixtures'
import { ClassPageWithBanner } from './ClassPageWithBanner'
import { Surface } from '../../../surfaces'
import { meta } from './meta'
import { DashboardWithClassroom } from './DashboardWithClassroom'
import { FeatureBox } from './FeatureBox'

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

/**
 * A section heading and the copy it introduces, held tight to each other.
 *
 * The card's own column gap is 16px, which is right between blocks but too
 * loose between a heading and the sentence it belongs to. So a section is its
 * own little column at 4px, and the 16px top margin — on top of the card's
 * 16px — is what gives every section the same 32px above it.
 */
const SECTION: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-05)',
  marginTop: 'var(--space-2)',
}

/**
 * The card layout both of this flow's own screens use: one narrow card
 * centred on the page colour, everything inside it, actions bottom right.
 *
 * Shared between the confirm screen and the created screen so the two look
 * like one route rather than two prototypes. Not in kit/ — a prototype adds to
 * its own folder.
 */
const PAGE: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  padding: 'var(--space-4) var(--space-2)',
}
const COLUMN: CSSProperties = { width: '100%', maxWidth: 760 }
const CARD_STACK: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
}
const ACTIONS: CSSProperties = { justifyContent: 'flex-end', marginTop: 'var(--space-2)' }

export default function DashboardPrimaryAction() {
  const [step, setStep] = useState<Step>('dashboard')
  /** Clubs that have been through setup, so the button changes on return. */
  const [setUpClubIds, setSetUpClubIds] = useState<string[]>([])
  const [activeClubId, setActiveClubId] = useState<string>(CLUBS[0].id)
  /** What a route we have not built would have done. */
  const [notice, setNotice] = useState<string>()
  /** Whether the mentor has asked how members get added. */
  const [showHowTo, setShowHowTo] = useState(false)

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

  /**
   * What setup makes, derived from the club. Shown before and after, so it
   * stays tenseless — the confirm screen supplies "we'll create:" above it and
   * the created screen supplies "What was set up".
   *
   * The values stay interpolated. Changing the cast has to move the club name,
   * the code and the class name together, or the flow offers one club's code
   * and then names a different club's session.
   */
  const whatYouGet = (
    <ul className="disclaimer-list">
      <li>
        A school called <strong>{club.name}</strong>
      </li>
      <li>
        A club code <strong>{club.schoolCode}</strong> for creators to sign in
      </li>
      <li>
        A class called <strong>{classes[0].name}</strong>, based on your session
      </li>
    </ul>
  )

  // The mentor is asked once, and asked nothing else. No form, no naming, no
  // choosing whether the club is a school or a class — all of that is
  // answerable from what Code Club already knows.
  //
  // THIS IS THE ONLY SCREEN THAT DIFFERS from the prototype this copies. Laid
  // out like the Experience CS → Code Classroom interstitial: one narrow card
  // centred on the page colour, everything inside it, and the two actions
  // bottom right with the primary last. The three points about what Code
  // Classroom is are green panels with an icon rather than bullets, because
  // the bet is that the explanation is what gets skimmed.
  //
  // Inline styles rather than new classes: global.css is shared, and the repo
  // rule is that a prototype changes nothing outside its own folder.
  if (step === 'confirm') {
    return (
      <Surface id="code-club" account="Your Account">
        <div style={PAGE}>
          <div style={COLUMN}>
            <Card>
              <div style={CARD_STACK}>
                <h1 className="title-lg">Set up Code Classroom for {club.name}?</h1>

                <div style={SECTION}>
                  <h2 className="title-sm">What is Code Classroom?</h2>
                  <p className="body">
                    Code Classroom is a free, safe environment for teaching and learning
                    computing. You can choose projects for your creators, create their accounts,
                    and see the work they save.
                  </p>
                </div>

                <FeatureBox icon="checklist" title="Choose projects">
                  Share projects with your club so creators know what to work on
                </FeatureBox>
                <FeatureBox icon="group_add" title="Create creator accounts">
                  Set up usernames and passwords without email addresses or parent sign-up
                </FeatureBox>
                <FeatureBox icon="save" title="Save their work">
                  Creators can sign in again and continue where they left off
                </FeatureBox>

                <div style={SECTION}>
                  <h2 className="title-sm">What we&apos;ll set up</h2>
                  <p className="body">If you continue, we&apos;ll create:</p>
                  {whatYouGet}
                </div>

                <p className="body muted">
                  Nothing will be shared with your club or made public. You can change these
                  names later.
                </p>

                {/* The reference card carries a diagram of the two products
                    between the list and the buttons. Left out for now — what it
                    should show has not been designed. */}

                <div className="cc-actions" style={ACTIONS}>
                  <Button type="secondary" text="Not now" onClick={() => setStep('dashboard')} />
                  <Button
                    type="primary"
                    text="Set up Code Classroom"
                    onClick={() => setStep('creating')}
                  />
                </div>
              </div>
            </Card>
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

  // Same card as the confirm screen, so arriving here reads as the other side
  // of the question rather than a different product. The title moves inside
  // the card, the list keeps the tight heading spacing, and the one action
  // sits bottom right where "Set up Code Classroom" was a moment ago.
  if (step === 'created') {
    return (
      <Surface id="code-club" account="Your Account">
        <div style={PAGE}>
          <div style={COLUMN}>
            <Card>
              <div style={CARD_STACK}>
                <h1 className="title-lg">Your Code Classroom account has been created</h1>

                <div style={SECTION}>
                  <h2 className="title-sm">What was set up</h2>
                  {whatYouGet}
                </div>

                <p className="body muted">
                  You sign in with the same Raspberry Pi account you use for Code Club — there is
                  no new password to remember.
                </p>
                <p className="body muted">
                  Not set up: an account for each young person at your club. Nothing on
                  codeclub.org knows who they are, so that part cannot be done for you.
                </p>

                <div className="cc-actions" style={ACTIONS}>
                  <Button
                    type="primary"
                    text="Go to Code Classroom"
                    onClick={() => setStep('classroom')}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Surface>
    )
  }

  // Where a mentor lands: the real Code Classroom class page, in the empty
  // state a mentor who has just been set up would actually find.
  //
  // The alert above it is THIS PROTOTYPE'S ADDITION and is not in the product.
  // Setup makes a school, a code and a class and then stops — the creators are
  // the one thing it cannot do, because nothing on codeclub.org knows who they
  // are. A mentor who does not realise that leaves with a class nobody can get
  // into, and finds out in front of a room of young people. So the blocker is
  // stated on arrival, and the alert offers the next step rather than just
  // naming the problem.
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
          <ClassPageWithBanner
            classGroup={classes[0]}
            projects={[]}
            memberCount={0}
            banner={
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Alert
                  type="information"
                  title="Your class has no members yet"
                  actions={[
                    { label: 'How do I add members?', onClick: () => setShowHowTo(true) },
                  ]}
                >
                  Setting up made the class, but not the creators in it. Until you create their
                  accounts nobody can sign in — the club code on its own is not enough.
                </Alert>

                {showHowTo && (
                  <Card>
                    <h2 className="title-sm">Adding members</h2>
                    <ol className="disclaimer-list">
                      <li>
                        Open <strong>Class members</strong> at the top of this page.
                      </li>
                      <li>
                        Create a username and a password for each creator. No email addresses,
                        and nothing for a parent to sign up to.
                      </li>
                      <li>
                        Give them the club code <strong>{club.schoolCode}</strong> with the
                        username and password you made for them, and they can sign in.
                      </li>
                    </ol>
                    <p className="body muted">
                      Step 2 is not built in this prototype. What it actually takes to create a
                      set of accounts — one at a time, or in a batch, and who writes the
                      passwords down — is its own question, and this flow stops at the point
                      where it becomes one.
                    </p>
                  </Card>
                )}
              </div>
            }
            onAddProject={() =>
              setNotice(
                'Not built here — getting a Code Club project into Code Classroom is the importing lane’s question.',
              )
            }
            onOpenProject={() => {}}
            onCopyLink={() =>
              setNotice(
                'Copy link shares the class. It skips the club code screen, but a creator still needs an account you made for them.',
              )
            }
            onClassMembers={() =>
              setNotice(
                'Not built here — creating the accounts is the step this flow stops at. See "How do I add members?" above.',
              )
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
