import { useState } from 'react'
import { Button, Card, TextareaInput } from '../../../kit'

// The tail of the chart's "create your own" branch. Naming the project and
// picking its type now happen in step 2 of the add-project dialog, which is
// the live "Create a new project" screen — see AddProjectChoice.tsx.
//
// PROPOSED. Adding instructions exists in Code Classroom, but nobody has built
// this screen in `screens/` and nobody has checked it against the real thing,
// so treat the details as wrong.
//
// This branch is in the prototype because it is the alternative the mentor is
// choosing against. If it turns out to be the one they reach for, the
// hypothesis is wrong in an interesting way.

/** "Add instructions" — the last box before the two branches rejoin. */
export function AddInstructions({
  projectTitle,
  onSave,
  onBack,
}: {
  projectTitle: string
  onSave: (instructions: string) => void
  onBack: () => void
}) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string>()

  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <div>
        <h1 className="title-lg">Add instructions</h1>
        <p className="body muted">
          What young people read in the left-hand panel while they work on {projectTitle}.
        </p>
      </div>

      <Card>
        <TextareaInput
          id="instructions"
          name="instructions"
          label="Instructions"
          hint="Markdown, as Code Club projects are written."
          fullWidth
          value={text}
          error={error}
          onChange={(event) => {
            setText(event.target.value)
            setError(undefined)
          }}
        />
      </Card>

      <div className="cc-actions">
        <Button
          type="primary"
          text="Save instructions"
          onClick={() => {
            if (!text.trim()) {
              setError('Write something, or go back and skip this.')
              return
            }
            onSave(text.trim())
          }}
        />
      </div>
    </div>
  )
}
