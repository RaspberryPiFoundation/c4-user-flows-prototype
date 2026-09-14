import { useState } from 'react'
import { Button, Card, TextInput, TextareaInput } from '../../../kit'

// PROPOSED. The chart's "create a new class" branch, reached while adding a
// project — so a mentor is setting up a class as a side effect of importing.
//
// The diamond before this one ("How do you want to create your class") has
// only ONE branch drawn on the board, to "Name + description". Kept as its own
// step so the flow matches the chart, with the missing branch called out in
// the workbench commentary rather than invented here. See notes.md.

/** The diamond: "How do you want to create your class". */
export function HowToCreateClass({
  onNameIt,
  onBack,
}: {
  onNameIt: () => void
  onBack: () => void
}) {
  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <h1 className="title-lg">How do you want to create your class?</h1>

      <Card>
        <h2 className="title-sm">Name it yourself</h2>
        <p className="body muted">
          Give the class a name and a description, and add young people afterwards.
        </p>
        <Button type="primary" text="Name it myself" onClick={onNameIt} />
      </Card>
    </div>
  )
}

/** "Name + description". */
export function NameAndDescription({
  projectTitle,
  onCreate,
  onBack,
}: {
  projectTitle: string
  onCreate: (name: string, description: string) => void
  onBack: () => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string>()

  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <div>
        <h1 className="title-lg">Name your class</h1>
        <p className="body muted">{projectTitle} will be added to it.</p>
      </div>

      <Card>
        <TextInput
          id="class-name"
          name="class-name"
          label="Class name"
          hint="Young people see this when they sign in."
          fullWidth
          value={name}
          error={error}
          onChange={(event) => {
            setName(event.target.value)
            setError(undefined)
          }}
        />
      </Card>

      <Card>
        <TextareaInput
          id="class-description"
          name="class-description"
          label="Description"
          hint="Optional. For you, not for them."
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Card>

      <div className="cc-actions">
        <Button
          type="primary"
          text="Create class"
          onClick={() => {
            if (!name.trim()) {
              setError('Give the class a name first.')
              return
            }
            onCreate(name.trim(), description.trim())
          }}
        />
      </div>
    </div>
  )
}
