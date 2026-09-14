import { useEffect, useState } from 'react'
import { Modal, Placeholder, TextInput } from '../../../kit'
import { PROJECT_TYPES, type ProjectTypeId } from './projectTypes'

// PROPOSED, all three. Nothing in Code Classroom lets a young person add a
// project today — a class lists only what the mentor set up, and there is no
// way to start anything of your own.
//
// Deliberately NOT badged "proposed" on screen. See screens/types.ts: a tester
// who sees the badge reacts to the badge instead of the screen. notes.md and
// the workbench commentary are where this is said.

/**
 * A Material Symbols glyph.
 *
 * The design system's own CSS already pulls in Material Symbols Sharp, so this
 * is the house icon set rather than something drawn for this prototype — and
 * no new dependency, which the repo does not allow anyway.
 *
 * Black, matching the heading underneath rather than the surface accent — so
 * the icon reads as part of the label instead of competing with the button
 * for attention. `--rpf-text` is the same near-black the headings use;
 * `--rpf-black` is true #000 if that turns out to be too soft.
 *
 * Decorative: the heading next to it says the same thing in words, so it is
 * hidden from screen readers rather than announced twice.
 *
 * Swap the glyph by changing the `name` passed below — `list_alt`, `draw`,
 * `explore`, `widgets` and `menu_book` are all in the same set.
 */
const ICON_FONT = '40px "Material Symbols Sharp"'

function OptionIcon({
  name,
  size = 40,
  colour = 'var(--rpf-text)',
}: {
  name: string
  size?: number
  colour?: string
}) {
  // Material Symbols renders the glyph via a ligature, so until the webfont
  // arrives the browser shows the literal word — "construction" sitting above
  // "Start from scratch". It is brief, but a young person reading it mid-
  // session is exactly the kind of thing that derails a testing session, and
  // the font comes from Google Fonts over whatever connection the venue has.
  //
  // So: hold the glyph back until the font is ready, in a box of the final
  // size, which also means no layout shift when it lands. One size is checked
  // for all of them — a loaded font is loaded at every size.
  const [ready, setReady] = useState(() => document.fonts?.check(ICON_FONT) ?? true)

  useEffect(() => {
    if (ready || !document.fonts) return
    let cancelled = false
    document.fonts.load(ICON_FONT).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [ready])

  return (
    <span
      className="material-symbols-sharp"
      aria-hidden="true"
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        color: colour,
        display: 'inline-block',
        minWidth: `${size}px`,
        height: `${size}px`,
        visibility: ready ? 'visible' : 'hidden',
      }}
    >
      {name}
    </span>
  )
}

/**
 * One selectable row in a choice dialog: icon, title, description, radio.
 *
 * Shared by both modals on purpose. The fork and the type chooser are the same
 * kind of question asked twice, and if they looked like two different patterns
 * a young person would have to learn the screen twice.
 *
 * `tone` puts the icon in a coloured tile, which the language rows use because
 * the colour is carrying the brand. The fork has no brand to carry, so its
 * icons are plain and black.
 */
function ChoiceRow({
  name,
  value,
  selected,
  onSelect,
  glyph,
  tone,
  title,
  description,
}: {
  name: string
  value: string
  selected: boolean
  onSelect: () => void
  glyph: string
  tone?: 'orange' | 'green' | 'purple'
  title: string
  description: string
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--rpf-white)',
        cursor: 'pointer',
        // Two border widths would shift the row by a pixel when selected, so
        // the width is constant and only the colour changes.
        border: `2px solid ${selected ? 'var(--rpf-text)' : 'var(--rpf-grey-150)'}`,
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        // Visually hidden, not `display: none` — the row is the control, but
        // the radio still has to be reachable by keyboard and announced as one
        // of a group.
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}
      />
      {tone ? (
        <span
          className={`cc-tile cc-tile-${tone}`}
          aria-hidden="true"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <OptionIcon name={glyph} size={24} colour="var(--rpf-white)" />
        </span>
      ) : (
        <OptionIcon name={glyph} size={32} />
      )}
      <span>
        <strong>{title}</strong>
        <span className="body small muted" style={{ display: 'block' }}>
          {description}
        </span>
      </span>
    </label>
  )
}

export type StartChoice = 'scratch' | 'browse'

const START_CHOICES: Array<{
  id: StartChoice
  glyph: string
  title: string
  description: string
}> = [
  {
    id: 'scratch',
    glyph: 'construction',
    title: 'Start from scratch',
    description: 'An empty project. You decide what it does — no instructions to follow.',
  },
  {
    id: 'browse',
    glyph: 'library_books',
    title: 'Browse Code Club projects',
    description: 'Pick something with step-by-step instructions, made by the Raspberry Pi Foundation.',
  },
]

/**
 * "What do you want to start?" — the fork this prototype exists to test.
 *
 * A dialog rather than a page, and the same select-then-confirm shape as the
 * language step that follows it, so adding a project is one consistent kind of
 * question rather than two unrelated screens.
 *
 * The cost is a click: you pick a route, then confirm, then pick a language.
 * Worth watching whether that reads as deliberate or as being asked the same
 * thing twice.
 */
export function StartChoiceModal({
  selected,
  onSelect,
  onContinue,
  onCancel,
}: {
  selected: StartChoice
  onSelect: (choice: StartChoice) => void
  onContinue: () => void
  onCancel: () => void
}) {
  return (
    <Modal
      isOpen
      setIsOpen={(open) => {
        if (!open) onCancel()
      }}
      heading="Add a project"
      showCloseButton
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onCancel}
      primaryButtonText="Continue"
      onClickPrimaryButton={onContinue}
    >
      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        <legend className="body" style={{ fontWeight: 700, padding: 0 }}>
          What do you want to start?
        </legend>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
            marginTop: 'var(--space-1)',
          }}
        >
          {START_CHOICES.map((choice) => (
            <ChoiceRow
              key={choice.id}
              name="start-choice"
              value={choice.id}
              selected={choice.id === selected}
              onSelect={() => onSelect(choice.id)}
              glyph={choice.glyph}
              title={choice.title}
              description={choice.description}
            />
          ))}
        </div>
      </fieldset>
    </Modal>
  )
}

/**
 * "What kind of project?" — built to match the real teacher-facing
 * "Create a new project" modal in Code Classroom: a dialog rather than a page,
 * the three types as selectable rows with a coloured tile and the product's
 * own descriptions, and Cancel / confirm in the footer.
 *
 * Matching it matters more than it looks. A young person adding a project and
 * a mentor adding a project should be doing recognisably the same thing — if
 * the two diverge, the mentor cannot help from memory when a child is stuck.
 *
 * Two deliberate departures from the real modal:
 *
 * - The question drops "for your students". The rest of the copy is the real
 *   copy, but a young person is not making this for anyone else, and leaving
 *   it in would be nonsense rather than a useful tension to test.
 * - The browse branch reuses the same dialog without the name field, because
 *   it is choosing a filter, not creating anything. Same pattern, honest about
 *   doing something different.
 */
export function ProjectTypeModal({
  heading,
  confirmText,
  selected,
  onSelect,
  name,
  onNameChange,
  onConfirm,
  onCancel,
}: {
  heading: string
  confirmText: string
  selected: ProjectTypeId
  onSelect: (type: ProjectTypeId) => void
  /** Omit both to hide the name field — the browse branch does not name anything. */
  name?: string
  onNameChange?: (value: string) => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const showName = name !== undefined && onNameChange !== undefined

  return (
    <Modal
      isOpen
      setIsOpen={(open) => {
        if (!open) onCancel()
      }}
      heading={heading}
      showCloseButton
      secondaryButtonText="Cancel"
      onClickSecondaryButton={onCancel}
      primaryButtonText={confirmText}
      onClickPrimaryButton={onConfirm}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {showName && (
          <div>
            <TextInput
              id="project-name"
              name="project-name"
              label="Project name"
              hint="Your project name is visible to your mentor."
              fullWidth
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onNameChange(event.target.value)
              }
            />
          </div>
        )}

        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend className="body" style={{ fontWeight: 700, padding: 0 }}>
            What kind of project do you want to make?
          </legend>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
              marginTop: 'var(--space-1)',
            }}
          >
            {PROJECT_TYPES.map((type) => (
              <ChoiceRow
                key={type.id}
                name="project-type"
                value={type.id}
                selected={type.id === selected}
                onSelect={() => onSelect(type.id)}
                glyph={type.glyph}
                tone={type.tone}
                title={type.id}
                description={type.blurb}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </Modal>
  )
}

/**
 * "Project created" — then open it, add another, or close.
 *
 * A dialog rather than a page, for the same reason as the two steps before it,
 * and for one more: as a page it was a dead end. "Open the project" and "Add
 * another project" were the only ways out, and a young person who wanted
 * neither — who just wanted to look at their class — had nowhere to go. The
 * breadcrumbs are not real navigation here. Closing the dialog now puts them
 * back on the class page, with the thing they just made visible in it.
 *
 * Deliberately celebratory inside. Adding a project of your own is the one
 * thing in this flow a young person cannot do today, and landing it on a quiet
 * confirmation would waste the only moment in the journey that is genuinely
 * theirs. The thumbnail is there so the thing they made is a thing, not a line
 * of text.
 *
 * Worth watching whether it reads as a reward or as a speed bump between them
 * and the editor.
 */
export function ProjectCreated({
  projectTitle,
  isOwnProject,
  onView,
  onAddAnother,
  onClose,
}: {
  projectTitle: string
  /** From scratch, rather than picked out of the catalogue. */
  isOwnProject: boolean
  onView: () => void
  onAddAnother: () => void
  /** Back to the class, wanting neither of the other two. */
  onClose: () => void
}) {
  return (
    <Modal
      isOpen
      setIsOpen={(open) => {
        if (!open) onClose()
      }}
      heading={isOwnProject ? `${projectTitle} is ready` : `${projectTitle} is in your class`}
      showCloseButton
      secondaryButtonText="Add another project"
      onClickSecondaryButton={onAddAnother}
      primaryButtonText="Open the project"
      onClickPrimaryButton={onView}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <OptionIcon name="celebration" size={48} />

        <p className="body muted" style={{ margin: 0, maxWidth: '28rem' }}>
          {isOwnProject
            ? 'It is yours. Your work saves as you go, and your mentor can see it.'
            : 'Your work saves as you go, and your mentor can see it.'}
        </p>

        {/* A thumbnail so the thing they just made is a thing they can see.
            Grey-boxed like every other image in this repo — for a project from
            the catalogue this would be its real artwork, and for one started
            from scratch there is nothing to show yet, which is itself worth
            noticing. */}
        <div style={{ width: '100%', maxWidth: '18rem' }}>
          <Placeholder
            label={isOwnProject ? 'Empty project — nothing made yet' : 'Project thumbnail'}
            height={140}
          />
        </div>
      </div>
    </Modal>
  )
}
