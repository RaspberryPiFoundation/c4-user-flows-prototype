import { useState } from 'react'
import { Modal, TextInput } from '../../../kit'
import { PROJECT_TYPES, type ProjectTypeId } from './projectTypes'

// PROPOSED, and the fork is what this prototype exists to test.
//
// ONE dialog with TWO steps, not two dialogs. Step 1 asks find-or-create; if
// the answer is "create your own", the same dialog becomes the live "Create a
// new project" dialog rather than opening a second box on top of the first.
// Stacked dialogs were the first thing anyone objected to, and they were a
// symptom rather than a styling problem: the fork was wrapping a dialog the
// product already has, so the fix is to make it the first step OF that dialog.
//
// What that buys, beyond not stacking: step 2 is now the real screen, down to
// the type descriptions and the tile colours, so the branch this prototype is
// testing AGAINST is the genuine article rather than a page invented to stand
// in for it. "Back" also means something — it returns to the question instead
// of dismissing one dialog to reveal another.
//
// Step 1 is the only proposed part. It preselects nothing, because
// preselecting would answer the question being asked, and because the design
// system's modal takes no `disabled` for its footer buttons, "Continue" with
// nothing chosen asks for a choice rather than doing nothing.
//
// Tiles are flat colour with no glyph, as in ManageClub. The live dialog has
// small icons in them; there is no icon component in the kit for arbitrary
// tiles, and grey-boxing keeps a session about the flow rather than the art.
//
// Deliberately NOT badged "proposed" on screen; see screens/types.ts.

type Choice = 'find' | 'create'

const ROUTES: Array<{ id: Choice; tone: string; title: string; blurb: string }> = [
  {
    id: 'find',
    tone: 'green',
    title: 'Find a Code Club project',
    blurb: 'Instructions and starter code already written.',
  },
  {
    id: 'create',
    tone: 'blue',
    title: 'Create your own',
    blurb: 'An empty project you write yourself.',
  },
]

/** A selectable row: coloured tile, title, one line of description. */
function OptionRow({
  tone,
  title,
  blurb,
  selected,
  onSelect,
}: {
  tone: string
  title: string
  blurb: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        width: '100%',
        textAlign: 'left',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--rpf-white)',
        cursor: 'pointer',
        font: 'inherit',
        // Heavier, darker border when selected, as in the live dialog. Inset
        // rather than a wider border so the row does not change size.
        border: `1px solid ${selected ? 'var(--rpf-text)' : 'var(--rpf-grey-150)'}`,
        boxShadow: selected ? 'inset 0 0 0 1px var(--rpf-text)' : 'none',
      }}
    >
      <span className={`cc-tile cc-tile-${tone}`} aria-hidden="true" />
      <span>
        <strong style={{ display: 'block' }}>{title}</strong>
        <span className="body small muted">{blurb}</span>
      </span>
    </button>
  )
}

interface Props {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  className: string
  onFind: () => void
  onCreate: (name: string, type: ProjectTypeId) => void
}

export function AddProjectChoice({ isOpen, setIsOpen, className, onFind, onCreate }: Props) {
  const [onCreateStep, setOnCreateStep] = useState(false)
  const [choice, setChoice] = useState<Choice>()
  const [nudge, setNudge] = useState(false)

  const [type, setType] = useState<ProjectTypeId>('Blocks')
  const [typed, setTyped] = useState<string>()
  const [nameError, setNameError] = useState<string>()

  // The live dialog arrives with "Blocks project" already in the field and
  // Blocks selected, so the name follows the type until the mentor writes
  // their own — after which it is theirs and stops moving.
  const name = typed ?? `${type} project`

  function close() {
    setOnCreateStep(false)
    setChoice(undefined)
    setNudge(false)
    setType('Blocks')
    setTyped(undefined)
    setNameError(undefined)
    setIsOpen(false)
  }

  function forward() {
    if (!choice) {
      setNudge(true)
      return
    }
    if (choice === 'find') {
      onFind()
      return
    }
    setOnCreateStep(true)
  }

  function create() {
    if (!name.trim()) {
      setNameError('Give the project a name first.')
      return
    }
    onCreate(name.trim(), type)
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => (open ? setIsOpen(true) : close())}
      heading={onCreateStep ? 'Create a new project' : 'Add a project'}
      showCloseButton
      primaryButtonText={onCreateStep ? 'Create project' : 'Continue'}
      onClickPrimaryButton={onCreateStep ? create : forward}
      // "Back" rather than "Cancel" on step 2: it came from a question, so
      // returning to it is more use than dismissing. The header's X still
      // cancels, which is how the live dialog's two buttons stay two.
      secondaryButtonText={onCreateStep ? 'Back' : 'Cancel'}
      onClickSecondaryButton={onCreateStep ? () => setOnCreateStep(false) : close}
    >
      {/* The modal's content box centres its children, so this has to claim
            the full width or every row sits in the middle. */}
      <div style={{ width: '100%', display: 'grid', gap: 'var(--space-2)' }}>
        {onCreateStep ? (
          <>
            <TextInput
              id="project-name"
              name="project-name"
              label="Project name"
              hint="Your project name is visible to your students."
              fullWidth
              value={name}
              error={nameError}
              onChange={(event) => {
                setTyped(event.target.value)
                setNameError(undefined)
              }}
            />

            <p
              style={{
                margin: 0,
                fontWeight: 'var(--fw-bold)',
                fontSize: 'var(--fs-1)',
                lineHeight: 'var(--lh-15)',
              }}
            >
              What kind of project do you want to make for your students?
            </p>

            <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
              {PROJECT_TYPES.map((option) => (
                <OptionRow
                  key={option.id}
                  tone={option.tone}
                  title={option.id}
                  blurb={option.blurb}
                  selected={type === option.id}
                  onSelect={() => setType(option.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p
              style={{
                margin: 0,
                fontWeight: 'var(--fw-bold)',
                fontSize: 'var(--fs-1)',
                lineHeight: 'var(--lh-15)',
              }}
            >
              What kind of project do you want to add to {className}?
            </p>

            {nudge && (
              <p
                role="alert"
                className="body small"
                style={{ margin: 0, color: 'var(--alert-error)' }}
              >
                Pick one of these to carry on.
              </p>
            )}

            <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
              {ROUTES.map((option) => (
                <OptionRow
                  key={option.id}
                  tone={option.tone}
                  title={option.title}
                  blurb={option.blurb}
                  selected={choice === option.id}
                  onSelect={() => {
                    setChoice(option.id)
                    setNudge(false)
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
