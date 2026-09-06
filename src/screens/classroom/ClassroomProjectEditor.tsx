import { Button, CheckboxInput, Placeholder, Tag } from '../../kit'
import type { Project } from '../../fixtures'
import { Markdown } from '../ccp/Markdown'
import type { ScreenMeta } from '../types'

export const meta: ScreenMeta = {
  surface: 'classroom',
  existsToday: true,
  verified: true,
  note: 'The same two-pane editor as Code Club Projects, inside Code Classroom — but saving works, and there is a "Ready for review" step.',
}

interface Props {
  project: Project
  stepIndex: number
  onStepChange: (index: number) => void
  readyForReview: boolean
  onReadyForReviewChange: (ready: boolean) => void
  onSave: () => void
  onUpload: () => void
  onDownload: () => void
  onBack: () => void
}

/**
 * A young person's editor inside Code Classroom.
 *
 * Deliberately a separate screen from the Code Club Projects editor rather
 * than a mode of it, because the differences are the point:
 *
 * - Saving just works. No "log in to save your progress" gate, because a
 *   classroom student account is already signed in. The same young person on
 *   Code Club Projects would hit that gate.
 * - There is a "Ready for review" step, which hands the work to the mentor.
 *   Nothing like it exists on Code Club Projects, where finishing means
 *   nothing happens.
 *
 * Put the two side by side and you can see the whole identity problem: the
 * work is keepable in one place and not the other, for the same child in the
 * same session.
 */
export function ClassroomProjectEditor({
  project,
  stepIndex,
  onStepChange,
  readyForReview,
  onReadyForReviewChange,
  onSave,
  onUpload,
  onDownload,
  onBack,
}: Props) {
  const step = project.steps[stepIndex]
  const total = project.steps.length

  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <div className="editor">
        <div className="editor-panel editor-panel-wide">
          <h2 className="title-sm editor-panel-head">Project instructions</h2>
          <div className="editor-panel-body">
            <Tag text={`Step ${stepIndex + 1}`} variant="success" />
            <h3 className="title-sm">{step.title}</h3>
            <Markdown source={step.body} />
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
        </div>

        <div className="editor-main">
          <div className="editor-tabs">
            <span className="editor-tab">{project.title}</span>
            <span className="editor-tab-actions">
              <Button type="secondary" size="small" text="Upload" onClick={onUpload} />
              <Button type="secondary" size="small" text="Download" onClick={onDownload} />
              {/* Saving needs no account prompt here. On Code Club Projects,
                  this same young person would be asked to log in or sign up. */}
              <Button type="primary" size="small" text="Save" onClick={onSave} />
            </span>
          </div>

          <div className="editor-ready">
            <CheckboxInput
              id="ready-for-review"
              name="ready-for-review"
              label="Ready for review"
              checked={readyForReview}
              onChange={(e) => onReadyForReviewChange(e.target.checked)}
            />
          </div>

          <div className="editor-canvas">
            <Placeholder
              label={`${project.language} editor — blocks palette, canvas and stage`}
              height={220}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
