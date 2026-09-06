export function NotFound({ detail }: { detail?: string }) {
  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-md">Nothing here</h1>
        <p className="body muted">
          {detail ?? 'That page does not exist.'}
        </p>
      </div>
      <p className="body">
        <a href="#/">Back to all prototypes</a>
      </p>
    </div>
  )
}
