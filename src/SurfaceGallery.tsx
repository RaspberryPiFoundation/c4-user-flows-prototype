import { Link } from 'react-router-dom'
import { Alert, Button, Card, Placeholder, TextInput } from './kit'
import { SURFACE_LIST, Surface } from './surfaces'

/**
 * Every product surface, one after another, so it is obvious what a flow
 * crossing between them will feel like.
 */
export function SurfaceGallery() {
  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-lg">Product surfaces</h1>
        <p className="body muted">
          The five products these flows cross. Wrap a screen in the surface it belongs to:{' '}
          <code>{'<Surface id="classroom">…</Surface>'}</code>
        </p>
        <p className="body muted">
          <Link to="/">← All prototypes</Link>
        </p>
      </div>

      <Alert type="information" title="Crossing products should look like crossing products">
        <p className="body">
          Chrome is grey-box — right name, right accent, roughly the right navigation, not
          pixel-accurate. Tokens are scoped per surface rather than set globally, so a Code
          Classroom screen cannot quietly inherit Code Club's colours. If moving between two of
          these feels like a jarring handoff, that is a finding, not a styling bug.
        </p>
      </Alert>

      <div className="theme-list">
        {SURFACE_LIST.map((surface) => (
          <section className="surface-demo" key={surface.id} aria-labelledby={`s-${surface.id}`}>
            <h2 className="title-md" id={`s-${surface.id}`}>
              {surface.name}
            </h2>
            <p className="body muted">{surface.note}</p>
            <span className="surface-host">{surface.host}</span>

            <Surface id={surface.id} activeNav={surface.nav[0]}>
              {surface.layout === 'centred' ? (
                // Roughly the real Code Classroom student login, which is
                // served by Pi Accounts.
                <Card>
                  <h3 className="title-sm">Enter your school code</h3>
                  <TextInput
                    id={`demo-code-${surface.id}`}
                    name="school-code"
                    label="School code"
                    hint="For example, 12-34-56. Your teacher will be able to tell you your school code."
                  />
                  <div>
                    <Button type="primary" text="Continue" onClick={() => {}} />
                  </div>
                </Card>
              ) : (
                <div className="section-stack">
                  <h3 className="title-sm">A screen in {surface.name}</h3>
                  <p className="body muted">
                    Content goes here. Prototypes fill this with whatever the step needs.
                  </p>
                  <Placeholder label={`${surface.name} content`} height={72} />
                </div>
              )}
            </Surface>
          </section>
        ))}
      </div>
    </div>
  )
}
