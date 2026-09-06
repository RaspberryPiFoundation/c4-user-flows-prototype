import { useState } from 'react'
import { Alert, Button, Card } from '../../../kit'
import { schoolsForMentor } from '../../../fixtures'
import { ManageClub, MentorDashboard, liveManageClubItems } from '../../../screens'
import { meta } from './meta'
import { Surface } from '../../../surfaces'

// A mentor, signed in on codeclub.org. Unambiguous — unlike the young person
// lanes, there is only one identity a mentor can hold.

type Step = 'dashboard' | 'manage' | 'setup'

export default function ManageClubRoute() {
  const [step, setStep] = useState<Step>('dashboard')

  // Derived from the cast in meta.ts, not hardcoded — change the cast and
  // this follows. Jo runs two clubs, so this takes the first of hers.
  const club = schoolsForMentor(meta.cast?.piAccount ?? '')[0]

  if (step === 'setup') {
    return (
      <Surface id="code-club" account="Your Account">
        <div className="section-stack">
          <Button type="secondary" size="small" text="Back" onClick={() => setStep('manage')} />
          <h1 className="title-lg">Set up Code Classroom</h1>
          <Alert type="information" title="This screen does not exist">
            <p className="body">
              Everything up to here is the real product. This is the proposal: what a mentor would
              see after choosing Code Classroom from the menu.
            </p>
          </Alert>
          <Card>
            <h2 className="title-sm">You will get</h2>
            <ul className="disclaimer-list">
              <li>A place to set projects for the young people at your club</li>
              <li>Accounts you create for them — no email addresses needed</li>
              <li>Their work in one place, so you can see who is stuck</li>
            </ul>
            <p className="body muted">
              Your club becomes a "school" in Code Classroom, with a code young people type in to
              join. That wording is the product's, not ours — worth watching whether it lands.
            </p>
            <Button type="primary" text="Set up Code Classroom" onClick={() => {}} />
          </Card>
        </div>
      </Surface>
    )
  }

  if (step === 'manage') {
    return (
      <Surface id="code-club" account="Your Account">
        <ManageClub
          clubName={club.name}
          items={[
            ...liveManageClubItems(() => {}),
            // The proposal: one more row. `proposed` marks it as not real.
            {
              label: 'Code Classroom',
              tone: 'blue',
              proposed: true,
              onSelect: () => setStep('setup'),
            },
          ]}
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
