import { Card } from '../../kit'
import type { ClassGroup, School } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'Where a young person lands after signing in. The page is titled with the SCHOOL name, which for a community club is the club name.',
}

interface Props {
  school: School
  classes: ClassGroup[]
  onOpenClass: (classId: string) => void
}

/**
 * A young person's home in Code Classroom: the list of classes they are in.
 *
 * Worth watching in testing: this is titled with the school name, and at
 * St Aidan's a young person in both a lesson and the club sees both listed
 * together with nothing distinguishing "school work" from "club".
 */
export function YoungPersonSchoolHome({ school, classes, onOpenClass }: Props) {
  return (
    <div className="section-stack">
      <h1 className="title-lg">{school.name}</h1>

      <Card>
        <h2 className="title-sm">Your classes</h2>
        <p className="body muted">Here are all the classes you have been added to.</p>

        {classes.length === 0 ? (
          <p className="lane-empty">You are not in any classes yet</p>
        ) : (
          <ul className="cc-list">
            {classes.map((group) => (
              <li className="cc-row" key={group.id}>
                <button className="link-button" onClick={() => onOpenClass(group.id)}>
                  {group.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
