import { Alert, Button, Card } from '../../../kit'

// PROPOSED, and it contradicts the live product — which is why it is worth
// building rather than arguing about.
//
// The chart ends both branches at "[Show to students]", in square brackets,
// with a sticky asking whether mentors understand the project is hidden by
// default. But the real Code Classroom project page (screens/EducatorProjectPage)
// offers "Hide from students", which means a project is VISIBLE the moment it
// exists. So this screen inverts today's behaviour: nothing is shown until the
// mentor says so.
//
// Both readings are defensible. Hidden-by-default lets a mentor set a session
// up in advance without young people wandering into a half-built project;
// visible-by-default means one less step and nothing to forget. The cost of
// hidden-by-default is the whole reason for the sticky: a mentor who does not
// realise has a room of young people who cannot see the thing they came for.
//
// The "Tool tip" sticky is realised as the hint below the toggle. Whether a
// tooltip is enough to carry a default nobody expects is the thing to watch.

interface Props {
  projectTitle: string
  className: string
  memberCount: number
  shown: boolean
  onShow: () => void
  onDone: () => void
  onBack: () => void
}

export function ShowToStudents({
  projectTitle,
  className,
  memberCount,
  shown,
  onShow,
  onDone,
  onBack,
}: Props) {
  return (
    <div className="section-stack">
      <div className="cc-actions">
        <Button type="secondary" size="small" text="Back" onClick={onBack} />
      </div>

      <div>
        <h1 className="title-lg">{projectTitle}</h1>
        <p className="body muted">In {className}</p>
      </div>

      {shown ? (
        <Alert type="success" title="Young people can see this project">
          <p className="body">
            {memberCount === 0
              ? `Nobody is in ${className} yet, so there is still nobody to see it.`
              : `All ${memberCount} young people in ${className} can open it now.`}
          </p>
        </Alert>
      ) : (
        <Alert type="information" title="Hidden from young people">
          <p className="body">
            You are the only person who can see this project. It stays hidden until you show it.
          </p>
        </Alert>
      )}

      <Card>
        <h2 className="title-sm">Show to students</h2>
        {/* The "Tool tip" sticky, as copy. A default nobody expects is being
            carried by one line of hint text — that is the thing to test. */}
        <p className="body muted">
          {shown
            ? `${projectTitle} is showing to everyone in ${className}. You can hide it again from the project page.`
            : `New projects are hidden so you can set them up before a session. Young people will not see ${projectTitle} in ${className} until you show it to them.`}
        </p>
        <div className="cc-actions">
          <Button
            type="primary"
            text={shown ? 'Shown to students' : 'Show to students'}
            disabled={shown}
            onClick={onShow}
          />
          <Button type="secondary" text="Done" onClick={onDone} />
        </div>
      </Card>
    </div>
  )
}
