import { useEffect, useState } from 'react'
import { ManageClub, MentorDashboard, liveManageClubItems } from '../../screens'
import { SCHOOLS } from '../../fixtures'
import { Surface } from '../../surfaces'
import { useSession } from '../../session'

// ─────────────────────────────────────────────────────────────────────────────
// WHO IS THIS FOR, AND WHAT ARE THEY SIGNED IN AS?
//
// There are two unconnected identity systems, and which one your person holds
// changes everything downstream. Decide deliberately:
//
//   signInPiAccount('pi-mentor-jo')        a mentor, or a young person with
//                                          their own self-registered account
//   signInClassroomStudent('cs-amara')     a young person with a mentor-created
//                                          Code Classroom account
//   neither                                signed out
//
// A young person in a club usually has a classroom account and NO Pi account.
// If your variant assumes otherwise, that assumption is part of your hypothesis
// and belongs in notes.md.
//
// See #/debug for everyone you can sign in as.
// ─────────────────────────────────────────────────────────────────────────────

/** The screens this flow moves between. Add to this as your flow grows. */
type Step = 'dashboard' | 'manage'

export default function Template() {
  const { signInPiAccount } = useSession()
  const [step, setStep] = useState<Step>('dashboard')

  // Start the person off signed in as a mentor. Delete this if your flow
  // starts signed out — for a young person, that is often the whole point.
  useEffect(() => {
    signInPiAccount('pi-mentor-jo')
  }, [signInPiAccount])

  const club = SCHOOLS[0]

  // Plain useState, deliberately. There is no flow engine in this repo and
  // there is not going to be one — a switch you can read beats an abstraction
  // you have to work around.
  if (step === 'manage') {
    return (
      <Surface id="code-club" account="Your Account">
        <ManageClub
          clubName={club.name}
          items={liveManageClubItems(() => {})}
          onBack={() => setStep('dashboard')}
        />
      </Surface>
    )
  }

  return (
    <Surface id="code-club" account="Your Account">
      <MentorDashboard
        clubsManaged={[club]}
        pendingRequests={[]}
        onDismissRequest={() => {}}
        onCreateEvent={() => {}}
        onManageClub={() => setStep('manage')}
        onViewPublicProfile={() => {}}
        onStartAClub={() => {}}
        onFindAClub={() => {}}
      />
    </Surface>
  )
}
