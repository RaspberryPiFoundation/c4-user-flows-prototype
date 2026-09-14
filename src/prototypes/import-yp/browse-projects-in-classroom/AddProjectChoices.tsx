import { useEffect, useState } from 'react'
import { Button, Card } from '../../../kit'
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
const ICON_SIZE = 40
const ICON_FONT = `${ICON_SIZE}px "Material Symbols Sharp"`

function OptionIcon({ name }: { name: string }) {
  // Material Symbols renders the glyph via a ligature, so until the webfont
  // arrives the browser shows the literal word — "construction" sitting above
  // "Start from scratch". It is brief, but a young person reading it mid-
  // session is exactly the kind of thing that derails a testing session, and
  // the font comes from Google Fonts over whatever connection the venue has.
  //
  // So: hold the glyph back until the font is ready, in a box of the final
  // size, which also means no layout shift when it lands.
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
        fontSize: `${ICON_SIZE}px`,
        lineHeight: 1,
        color: 'var(--rpf-text)',
        display: 'inline-block',
        minWidth: `${ICON_SIZE}px`,
        height: `${ICON_SIZE}px`,
        visibility: ready ? 'visible' : 'hidden',
      }}
    >
      {name}
    </span>
  )
}

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

      {/* Side by side, so the two routes read as a choice between equals
          rather than a first option and a fallback. `auto-fit` with a minimum
          means they drop back to stacked on a narrow screen without a media
          query — which matters, because a club often runs on tablets.

          `.kit-card` is already a flex column, so grid stretches the two to
          the same height; `marginTop: auto` then lines the buttons up along
          the bottom whatever the copy does. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
          gap: 'var(--space-2)',
        }}
      >
        <Card>
          <OptionIcon name="construction" />
          <h2 className="title-sm">Start from scratch</h2>
          <p className="body muted">
            An empty project. You decide what it does — no instructions to follow.
          </p>
          <div style={{ marginTop: 'auto' }}>
            <Button type="primary" text="Start from scratch" onClick={onFromScratch} />
          </div>
        </Card>

        <Card>
          <OptionIcon name="library_books" />
          <h2 className="title-sm">Browse Code Club projects</h2>
          <p className="body muted">
            Pick something with step-by-step instructions, made by the Raspberry Pi Foundation.
          </p>
          <div style={{ marginTop: 'auto' }}>
            <Button type="secondary" text="Browse projects" onClick={onBrowse} />
          </div>
        </Card>
      </div>
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
