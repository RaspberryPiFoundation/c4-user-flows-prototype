import { useState } from 'react'
import { Button, Card, SelectInput } from '../../../kit'
import type { ClassGroup } from '../../../fixtures'

// PROPOSED. "Choose new or existing class" from the flow chart, reworked to
// follow the equivalent screens in Experience CS — the other product that
// integrates with Code Classroom, and so the closest thing to a precedent we
// have for how a content product hands a piece of work to a class.
//
// Both cards render on the Code Club Projects surface. The mentor picks a Code
// Classroom class without leaving the site they were browsing on, and the flow
// crosses products only when they press "View your class". That follows
// Experience CS rather than the chart, which had put this step in the Code
// Classroom lane; see prototype.tsx and notes.md.
//
// Taken from those screens:
//
// - one small centred card on a tinted page, not a full-width page
// - a heading naming the thing being added: "Add Weather watchers to class"
// - a sentence explaining what a class is FOR, before asking which one
// - the class as a single select labelled "School class", not a list of
//   buttons — so picking a class is one decision, not one decision per class
// - one primary action, bottom right of the card
// - a success card of the same shape: same heading, a tick, one sentence
//   naming what went where, then where to go next
//
// Changed for Code Club Projects rather than copied:
//
// - "unit" is Experience CS's word for a group of lessons. Code Club Projects
//   has projects, so this says project.
// - Experience CS offers no way to create a class here; the chart's diamond
//   does, so "Create a new class" sits beside the primary action. Without it
//   this screen is a dead end for a mentor whose club has no class yet.
// - Experience CS's mint page is its own brand colour. These sit on Code Club
//   Projects' own page colour rather than importing another product's, so the
//   card is told apart by its border rather than by a tint.
//
// Deliberately NOT badged "proposed" on screen; see screens/types.ts.

/** "Add <project> to class" — the select screen. */
export function AddToClass({
  projectTitle,
  classes,
  onAdd,
  onNew,
  onBack,
}: {
  projectTitle: string
  classes: ClassGroup[]
  onAdd: (classId: string) => void
  onNew: () => void
  onBack: () => void
}) {
  const [classId, setClassId] = useState(classes[0]?.id ?? '')

  return (
    <Card>
      <h1 className="title-md">Add {projectTitle} to class</h1>

      <p className="body muted">
        Classes let you group students and assign projects to them. After adding this project to a
        class, students will be able to work on it.
      </p>

      {classes.length === 0 ? (
        // Reachable: a club whose Code Classroom school has no class yet. The
        // select has nothing to offer, so the only way on is to make one.
        <p className="body muted">
          You have no classes yet. Create one and this project will be added to it.
        </p>
      ) : (
        <div>
          <SelectInput
            id="school-class"
            name="school-class"
            label="School class"
            fullWidth
            options={classes.map((group) => ({ key: group.id, value: group.name }))}
            value={classId}
            onChange={(event) => setClassId(event.target.value)}
          />
          {/* Sits under the field it is about rather than in the button row.
              Three buttons do not fit a 420px card, and more importantly the
              Experience CS card drives at ONE action — a second button of
              equal weight would undo that. */}
          <button className="link-button" onClick={onNew}>
            Create a new class instead
          </button>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-1)',
          justifyContent: 'flex-end',
        }}
      >
        <Button type="secondary" text="Back" onClick={onBack} />
        {classes.length > 0 ? (
          <Button type="primary" text="Add project to class" onClick={() => onAdd(classId)} />
        ) : (
          <Button type="primary" text="Create a new class" onClick={onNew} />
        )}
      </div>
    </Card>
  )
}

/** The success card. Experience CS keeps the same heading and swaps the body. */
export function AddedToClass({
  projectTitle,
  className,
  isNewClass,
  onViewClass,
  onFindAnother,
}: {
  projectTitle: string
  className: string
  isNewClass: boolean
  onViewClass: () => void
  onFindAnother: () => void
}) {
  return (
    <Card>
      <h1 className="title-md">Add {projectTitle} to class</h1>

      {/* Experience CS uses a circled tick here. There is no icon component in
          the kit, so this is drawn from a border and a character, and hidden
          from screen readers — the sentence below it carries the meaning. */}
      <span
        aria-hidden="true"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '48px',
          height: '48px',
          margin: '0 auto',
          borderRadius: '50%',
          border: '2px solid var(--rpf-text)',
          fontSize: 'var(--fs-15)',
          lineHeight: 1,
        }}
      >
        ✓
      </span>

      <p className="body">
        <strong>{projectTitle}</strong> has been added to <strong>{className}</strong>.
      </p>

      <p className="body muted">
        You can manage this project anytime from the class project list on your Code Classroom
        dashboard.
      </p>

      {isNewClass && (
        // Not in the Experience CS screens, and it matters here: the chart's
        // new-class branch lands the project in a class with nobody in it.
        <p className="body muted">
          Nobody is in {className} yet, so nobody can see it. Add young people to the class from
          your Code Classroom dashboard.
        </p>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-1)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Experience CS's secondary here is "View unit" — the thing you just
            added. This keeps the chart's loop instead, which is the action a
            mentor setting up a term of sessions actually wants. */}
        <Button type="secondary" text="Find another project" onClick={onFindAnother} />
        <Button type="primary" text="View your class" onClick={onViewClass} />
      </div>
    </Card>
  )
}
