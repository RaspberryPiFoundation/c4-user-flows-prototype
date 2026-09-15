import { useState } from 'react'
import { Card, SelectInput, Tag } from '../../kit'
import type { ClassGroup, School } from '../../fixtures'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'Where a young person lands after signing in. The page is titled with the SCHOOL name, which for a community club is the club name.',
}

/** Name order is the only sort the design shows. */
type Sort = 'a-z' | 'z-a'

const SORT_OPTIONS = [
  { key: 'a-z', value: 'Name (A — Z)' },
  { key: 'z-a', value: 'Name (Z — A)' },
]

interface Props {
  school: School
  classes: ClassGroup[]
  onOpenClass: (classId: string) => void
  /**
   * Classes where the mentor has left work for the young person to look at.
   * The real page marks these "New feedback", and it is the only thing on a
   * row that distinguishes one class from another — so a flow about feedback
   * getting back to a young person needs it, and one that is not can leave it
   * out.
   */
  classesWithFeedback?: string[]
}

/**
 * A young person's home in Code Classroom: the list of classes they are in.
 *
 * Built from the Code Editor Figma file (node 6775:88858, "Dashboard
 * Student"), so this is the checked version of the page rather than the
 * educator page with the actions taken off.
 *
 * Three things worth knowing:
 *
 * - **It is titled with the school name**, and at St Aidan's a young person in
 *   both a lesson and the club sees both listed together with nothing
 *   distinguishing "school work" from "club".
 * - **There is no breadcrumb and no back control on it.** The student page is
 *   the top of their tree; a prototype that gives it a crumb trail is adding
 *   navigation the product does not have.
 * - **"New feedback" is the only per-row signal.** No project counts, no
 *   dates, nothing about whether anything is waiting — one tag, or nothing.
 */
export function YoungPersonSchoolHome({
  school,
  classes,
  onOpenClass,
  classesWithFeedback = [],
}: Props) {
  /* Display state, not flow state — the screen still decides nothing about
     what comes next, it just orders a list it was handed. */
  const [sort, setSort] = useState<Sort>('a-z')

  const ordered = [...classes].sort((a, b) =>
    sort === 'a-z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  )

  return (
    <>
      <div className="cc-page-header">
        <div className="cc-page-title">
          <h1 className="title-lg">{school.name}</h1>
        </div>
      </div>

      <div className="cc-page-main">
        <Card>
          <div className="cc-section-head">
            <div>
              <h2 className="title-sm">Your classes</h2>
              {/* The design's wording, kept as it is written there — including
                  the missing "to". Same rule as "teacher" and "student": the
                  product's words are the product's words. */}
              <p className="body muted">
                Here you can see an overview of what classes you have been added.
              </p>
            </div>
          </div>

          {classes.length === 0 ? (
            <p className="lane-empty">You are not in any classes yet</p>
          ) : (
            <>
              <div className="cc-list-controls">
                <SelectInput
                  id="class-sort"
                  name="class-sort"
                  label="Sort by:"
                  options={SORT_OPTIONS}
                  value={sort}
                  onChange={(event) => setSort(event.target.value as Sort)}
                />
              </div>

              <ul className="cc-list cc-list-boxed">
                {ordered.map((group) => (
                  <li className="cc-row cc-row-tall" key={group.id}>
                    <span className="cc-row-main">
                      {/* Bold text, not a link — the design gives the row no
                          other affordance, so the whole name is the control. */}
                      <button className="cc-row-title" onClick={() => onOpenClass(group.id)}>
                        {group.name}
                      </button>
                    </span>
                    {classesWithFeedback.includes(group.id) && (
                      <Tag text="New feedback" variant="information" />
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
