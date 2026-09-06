import { useState } from 'react'
import { ManageClub, MentorDashboard, liveManageClubItems } from '../../screens'
import { schoolsForMentor } from '../../fixtures'
import { meta } from './meta'
import { Surface } from '../../surfaces'

// WHO IS THIS FOR?
//
// Set `cast` in meta.ts. The workbench signs them in before your flow renders,
// and fills their details into any sign-in screen you show.
//
//   cast: { piAccount: 'pi-mentor-jo' }          a mentor
//   cast: { classroomStudent: 'cs-amara' }       a young person in Code Classroom
//   ownsSignIn: true                             your flow does the signing in,
//                                                so it starts signed out
//
// A young person in a club usually has a classroom account and NO Pi account.
// If your variant assumes otherwise, that assumption is part of your hypothesis
// and belongs in notes.md.
//
// Derive everything else from the cast — do not hardcode a club. See
// onboarding-yp/reference-school-code-join for how.
//
// See #/debug for everyone available.

/** The screens this flow moves between. Add to this as your flow grows. */
type Step = 'dashboard' | 'manage'

export default function Template() {
  const [step, setStep] = useState<Step>('dashboard')
  // Derived from the cast in meta.ts, not hardcoded — change the cast and
  // this follows. Jo runs two clubs, so this takes the first of hers.
  const club = schoolsForMentor(meta.cast?.piAccount ?? '')[0]

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
