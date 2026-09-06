import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Shown so the person looking knows whose prototype broke. */
  label: string
}

interface State {
  error: Error | null
}

/**
 * Wraps each prototype so that one person's runtime error shows a contained
 * message instead of blanking the whole site for everyone else.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label}] crashed`, error, info)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="card">
        <div className="intro">
          <h1 className="title-md">This prototype has a problem</h1>
          <p className="body muted">
            Something in <strong>{this.props.label}</strong> threw an error, so it can't be shown.
            Everything else on the site still works.
          </p>
        </div>
        <pre className="error-detail">{error.message}</pre>
        <p className="body muted">
          <a href="#/">Back to all prototypes</a>
        </p>
      </div>
    )
  }
}
