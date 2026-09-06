import { Button, Placeholder, Tag } from '../../kit'
import type { Project } from '../../fixtures'
import type { ScreenMeta } from '../types'
import { Markdown } from './Markdown'

export const meta: ScreenMeta = {
  surface: 'ccp',
  existsToday: true,
  verified: true,
  note: 'The blocks editor on Code Club Projects. Instructions on the left, editor on the right — and the same layout instructions get inside Code Classroom.',
}

/** Which panel the left rail has open. */
export type EditorPanel = 'instructions' | 'save'

interface Props {
  project: Project
  stepIndex: number
  onStepChange: (index: number) => void
  panel: EditorPanel
  onPanelChange: (panel: EditorPanel) => void
  /**
   * Whether the young person has a Pi account. Everything about saving hinges
   * on this — see the save panel.
   */
  signedIn: boolean
  onLogIn: () => void
  onSignUp: () => void
  onDownload: () => void
  onUpload: () => void
}

/**
 * The two-pane project editor: instructions beside the code.
 *
 * The save panel is the important part for the import lane. On the live site,
 * saving requires a Raspberry Pi account — "With a Raspberry Pi Account you can
 * save your code and project steps progress". A young person in a club holding
 * only a Code Classroom student account cannot save here at all. Their only
 * route is to self-register a standalone account their mentor cannot see, or
 * to download the files and carry them somewhere else.
 */
export function ProjectEditor({
  project,
  stepIndex,
  onStepChange,
  panel,
  onPanelChange,
  signedIn,
  onLogIn,
  onSignUp,
  onDownload,
  onUpload,
}: Props) {
  const step = project.steps[stepIndex]
  const total = project.steps.length

  return (
    <div className="editor">
      {/* Left rail. Grey-box: the real one has icons, this has short labels. */}
      <nav className="editor-rail" aria-label="Editor panels">
        <button
          className={panel === 'instructions' ? 'editor-rail-item active' : 'editor-rail-item'}
          onClick={() => onPanelChange('instructions')}
          aria-current={panel === 'instructions'}
        >
          Steps
        </button>
        <button
          className={panel === 'save' ? 'editor-rail-item active' : 'editor-rail-item'}
          onClick={() => onPanelChange('save')}
          aria-current={panel === 'save'}
        >
          Save
        </button>
      </nav>

      <div className="editor-panel">
        {panel === 'instructions' ? (
          <>
            <h2 className="title-sm editor-panel-head">Project instructions</h2>
            <div className="editor-panel-body">
              <Tag text={`Step ${stepIndex + 1}`} variant="success" />
              <h3 className="title-sm">{step.title}</h3>
              <Markdown source={step.body} />
              <Placeholder label="Block image or screenshot" height={64} />
            </div>
            <div className="editor-steps">
              <Button
                type="secondary"
                size="small"
                text="Back"
                disabled={stepIndex === 0}
                onClick={() => onStepChange(stepIndex - 1)}
              />
              <span className="body small muted">
                {stepIndex + 1} of {total}
              </span>
              <Button
                type="secondary"
                size="small"
                text="Next"
                disabled={stepIndex >= total - 1}
                onClick={() => onStepChange(stepIndex + 1)}
              />
            </div>
            <div
              className="editor-progress"
              role="progressbar"
              aria-valuenow={stepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={total}
            >
              <span style={{ width: `${((stepIndex + 1) / total) * 100}%` }} />
            </div>
          </>
        ) : (
          <>
            <h2 className="title-sm editor-panel-head">Save &amp; download</h2>
            <div className="editor-panel-body">
              {signedIn ? (
                <p className="body">Your code and step progress are saved to your account.</p>
              ) : (
                <>
                  <h3 className="title-sm">Log in to save your progress</h3>
                  <p className="body">
                    With a Raspberry Pi Account you can save your code and project steps progress.
                  </p>
                  <Button type="primary" fullWidth text="Log in to save" onClick={onLogIn} />
                  <Button type="secondary" fullWidth text="Sign up" onClick={onSignUp} />
                </>
              )}
              <p className="body">
                Download your project files so you can use them offline and in a different code
                editor.
              </p>
              <Button type="secondary" fullWidth text="Download project" onClick={onDownload} />
              <Button type="secondary" fullWidth text="Upload project" onClick={onUpload} />
            </div>
          </>
        )}
      </div>

      <div className="editor-main">
        <div className="editor-tabs">
          <span className="editor-tab active">{project.title} starter</span>
          <span className="editor-tab-actions">
            <Button type="secondary" size="small" text="Upload" onClick={onUpload} />
            <Button type="secondary" size="small" text="Download" onClick={onDownload} />
          </span>
        </div>
        <div className="editor-canvas">
          <Placeholder
            label={`${project.language} editor — blocks palette, canvas and stage`}
            height={240}
          />
        </div>
      </div>
    </div>
  )
}
