import { Button, Card, Placeholder } from '../../../kit'

// The signed-out Code Classroom home page. It exists in the real product, but
// it is not in `screens/` — nobody has needed it until this flow started from
// the very beginning. Grey-boxed and UNVERIFIED: the real page almost
// certainly says more than this.
//
// Here because of the one rule. If another prototype needs a signed-out
// Code Classroom landing, that is when it earns a place in `screens/`.

interface Props {
  onLogIn: () => void
}

export function ClassroomHome({ onLogIn }: Props) {
  return (
    <div className="section-stack">
      <h1 className="title-lg">Code Classroom</h1>

      <Card>
        <Placeholder label="Marketing content — what Code Classroom is for" height={120} />
        <p className="body muted">
          Teach and learn computing, with projects set by a teacher and work you can pick up
          where you left off.
        </p>
        <Button type="primary" text="Log in" onClick={onLogIn} />
      </Card>
    </div>
  )
}
