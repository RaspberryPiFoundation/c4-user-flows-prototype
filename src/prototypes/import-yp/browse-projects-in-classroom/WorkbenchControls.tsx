import { Card, CheckboxInput } from '../../../kit'

// Not part of the flow. Hidden in `?full=1`, so nobody being tested sees it.
//
// The flow diagram has three decision points whose "No" branch a testing
// session would never reach by accident — Kofi IS in a class, and his class
// DOES have a project. Rather than write three prototypes, these switch the
// starting conditions so the team can walk every branch.
//
// Deliberately switches to STATE, not to screens. Flipping one changes what is
// true about this young person and lets the flow do what it would really do.

export interface Conditions {
  firstLogin: boolean
  inAClass: boolean
  leaderMadeProject: boolean
}

interface Props {
  conditions: Conditions
  onChange: (conditions: Conditions) => void
}

export function WorkbenchControls({ conditions, onChange }: Props) {
  function set(key: keyof Conditions) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...conditions, [key]: event.target.checked })
  }

  return (
    <Card>
      <h2 className="title-sm">Starting conditions</h2>
      <p className="body small muted">
        Workbench only — hidden in full screen. Each one is a decision point in the flow
        diagram; turn it off to walk the other branch.
      </p>
      <CheckboxInput
        id="cond-first-login"
        name="cond-first-login"
        label="First time logging in (asks them to set a password)"
        checked={conditions.firstLogin}
        onChange={set('firstLogin')}
      />
      <CheckboxInput
        id="cond-in-class"
        name="cond-in-class"
        label="Has been added to a class"
        checked={conditions.inAClass}
        onChange={set('inAClass')}
      />
      <CheckboxInput
        id="cond-leader-project"
        name="cond-leader-project"
        label="Their mentor has already set up a project"
        checked={conditions.leaderMadeProject}
        onChange={set('leaderMadeProject')}
      />
    </Card>
  )
}
