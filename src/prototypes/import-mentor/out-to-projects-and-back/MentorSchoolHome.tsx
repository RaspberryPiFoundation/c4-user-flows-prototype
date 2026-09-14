import { Card, Tag } from '../../../kit'
import type { ClassGroup, School } from '../../../fixtures'

// The chart's first box: "Code Classroom". A mentor who is already signed in
// and already has a school lands on the school, and the classes under it are
// the only way onwards — there is no navigation to go anywhere else.
//
// This screen EXISTS in the real product and has never been built in
// `screens/`, and NOBODY HAS CHECKED IT against the real educator view. Built
// to mirror YoungPersonSchoolHome, so treat the details as wrong. It is here
// only so the flow can start where the chart starts.

interface Props {
  school: School
  classes: ClassGroup[]
  memberCount: (classId: string) => number
  onOpenClass: (classId: string) => void
}

export function MentorSchoolHome({ school, classes, memberCount, onOpenClass }: Props) {
  return (
    <div className="section-stack">
      <div>
        <h1 className="title-lg">{school.name}</h1>
        {/* Code Classroom calls this a school even when it is a library. The
            mismatch is kept, not fixed — see screens/README.md. */}
        <p className="body muted">
          School code: {school.schoolCode} · {school.country}
        </p>
      </div>

      <Card>
        <div className="cc-section-head">
          <div>
            <h2 className="title-sm">Classes</h2>
            <p className="body muted">
              Young people sign in with the school code and join the class you put them in.
            </p>
          </div>
        </div>

        {classes.length === 0 ? (
          <p className="lane-empty">No classes yet</p>
        ) : (
          <ul className="cc-list">
            {classes.map((group) => (
              <li className="cc-row" key={group.id}>
                <button className="link-button" onClick={() => onOpenClass(group.id)}>
                  {group.name}
                </button>
                <span className="body small muted">{memberCount(group.id)} members</span>
                <Tag text={group.kind === 'code-club' ? 'Code Club' : 'Lesson'} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
