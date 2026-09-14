import { Button, Card } from '../../../kit'
import { PROJECT_TYPES, type ProjectTypeId } from './projectTypes'

// PROPOSED, all three. Nothing in Code Classroom lets a young person add a
// project today — a class lists only what the mentor set up, and there is no
// way to start anything of your own.
//
// Deliberately NOT badged "proposed" on screen. See screens/types.ts: a tester
// who sees the badge reacts to the badge instead of the screen. notes.md and
// the workbench commentary are where this is said.

/** "What do you want to start?" — the fork this prototype exists to test. */
export function StartChooser({
  onFromScratch,
  onBrowse,
  onBack,
}: {
  onFromScratch: () => void
  onBrowse: () => void
  onBack: () => void
}) {
  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <h1 className="title-lg">What do you want to start?</h1>

      <Card>
        <h2 className="title-sm">Start from scratch</h2>
        <p className="body muted">
          An empty project. You decide what it does — no instructions to follow.
        </p>
        <Button type="primary" text="Start from scratch" onClick={onFromScratch} />
      </Card>

      <Card>
        <h2 className="title-sm">Browse Code Club projects</h2>
        <p className="body muted">
          Pick something with step-by-step instructions, made by the Raspberry Pi Foundation.
        </p>
        <Button type="secondary" text="Browse projects" onClick={onBrowse} />
      </Card>
    </div>
  )
}

/** "Choose project type: Blocks, Python or Web." Both branches pass through it. */
export function ProjectTypeChooser({
  heading,
  onChoose,
  onBack,
}: {
  heading: string
  onChoose: (type: ProjectTypeId) => void
  onBack: () => void
}) {
  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <h1 className="title-lg">{heading}</h1>

      {PROJECT_TYPES.map((type) => (
        <Card key={type.id}>
          <h2 className="title-sm">{type.id}</h2>
          <p className="body muted">{type.blurb}</p>
          <Button type="secondary" text={`Choose ${type.id}`} onClick={() => onChoose(type.id)} />
        </Card>
      ))}
    </div>
  )
}

/** "Project created" — then view it, or add another. */
export function ProjectCreated({
  projectTitle,
  onView,
  onAddAnother,
}: {
  projectTitle: string
  onView: () => void
  onAddAnother: () => void
}) {
  return (
    <div className="section-stack">
      <Card>
        <h1 className="title-md">{projectTitle} is in your class</h1>
        <p className="body muted">
          Your work saves as you go, and your mentor can see it.
        </p>
        <div className="cc-actions">
          <Button type="primary" text="Open the project" onClick={onView} />
          <Button type="secondary" text="Add another project" onClick={onAddAnother} />
        </div>
      </Card>
    </div>
  )
}
