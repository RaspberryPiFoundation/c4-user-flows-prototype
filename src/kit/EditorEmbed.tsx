import { useEffect, useRef, useState } from 'react'
import { EditorCanvas } from './EditorCanvas'

/**
 * The real Raspberry Pi Code Editor, embedded.
 *
 * `editor-ui` ships as a web component on a CDN rather than an npm package, so
 * this is a script tag and a custom element — no dependency added, which is
 * what lets us use the actual editor at all.
 *
 *   https://github.com/RaspberryPiFoundation/editor-ui
 *
 * It runs Python locally through Pyodide, so `preview` mode with no `auth_key`
 * gives a genuinely working editor that talks to no API, saves nothing and
 * cannot touch a real account. That matters here: the repo's rule against real
 * API calls is about not moving real data, and this moves none.
 *
 * WHAT IT DOES NOT DO: Scratch. The bundle loads Scratch in an iframe keyed to
 * a project the editor API already holds (`project_type: code_editor_scratch`)
 * — there is no way to hand it a Scratch project inline the way `code` hands
 * it Python. Our projects are invented, so there is no identifier to pass.
 * Scratch projects therefore fall back to the drawn still, as does any project
 * if the CDN is unreachable.
 */

/* Pinned, not `latest` — `releases/latest` 404s, and a prototype that silently
   changes editor version between one review and the next is a bad prototype.
   Bump deliberately. */
const VERSION = 'v0.38.1'
const SCRIPT_URL = `https://editor-static.raspberrypi.org/releases/${VERSION}/web-component.js`

/* The bundle is ~10MB. Load it once per session, and only when a screen
   actually shows an editor — not on the landing page. */
let loading: Promise<void> | undefined

function loadEditorScript() {
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      if (customElements.get('editor-wc')) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = SCRIPT_URL
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Could not load the editor from ${SCRIPT_URL}`))
      document.head.appendChild(script)
    })
  }
  return loading
}

interface Props {
  language: 'Scratch' | 'Python' | 'HTML'
  /** Starter code. Overrides the editor's own empty main.py / index.html. */
  code: string
  /** Described to screen readers, and used on the drawn fallback. */
  label: string
  /**
   * Instruction steps, if the editor should show its own instructions panel.
   * Most prototypes here render steps themselves in the left rail, so this is
   * usually left off — pass it only if the flow is about the editor's sidebar.
   */
  steps?: { title: string; body: string }[]
  /** The editor asks the host page to handle sign-in; it does not do it itself. */
  onLogIn?: () => void
  onSignUp?: () => void
}

export function EditorEmbed({ language, code, label, steps, onLogIn, onSignUp }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  /* Scratch can never load inline, so do not even fetch 10MB to find out. */
  const embeddable = language !== 'Scratch'

  /* Serialised here rather than in the effect, so the effect depends on a
     string. `steps` is a fresh array on every render; depending on it directly
     would tear down and rebuild a 10MB editor on every parent render. */
  const instructions = steps
    ? JSON.stringify({
        project: { steps: steps.map((step) => ({ content: `<h2>${step.title}</h2>${step.body}` })) },
      })
    : undefined

  useEffect(() => {
    if (!embeddable) return
    let cancelled = false
    const mount = host.current

    loadEditorScript().then(
      () => {
        if (cancelled || !mount) return

        /* Built imperatively rather than as JSX. React sets custom element
           attributes inconsistently across versions, and every attribute here
           has to arrive as a string — getting that wrong silently gives you an
           empty editor rather than an error.

           It goes into a node React deliberately leaves empty. Appending into
           a node React also renders into gets you a removeChild crash the
           moment React tries to tidy up a child we already replaced. */
        const editor = document.createElement('editor-wc')
        editor.setAttribute('preview', 'true')
        editor.setAttribute('code', code)
        editor.setAttribute('aria-label', label)
        if (instructions) {
          editor.setAttribute('with_sidebar', 'true')
          editor.setAttribute('sidebar_options', JSON.stringify(['instructions']))
          editor.setAttribute('instructions', instructions)
        }

        mount.replaceChildren(editor)
        setReady(true)
      },
      () => {
        if (!cancelled) setFailed(true)
      },
    )

    return () => {
      cancelled = true
      mount?.replaceChildren()
    }
  }, [embeddable, code, label, instructions])

  /* The editor asks the page to handle sign-in rather than doing it itself,
     which is the whole point for the import lane: the prototype decides what
     happens, so a variant can send someone somewhere different. */
  useEffect(() => {
    if (!onLogIn && !onSignUp) return
    const logIn = () => onLogIn?.()
    const signUp = () => onSignUp?.()
    document.addEventListener('editor-logIn', logIn)
    document.addEventListener('editor-signUp', signUp)
    return () => {
      document.removeEventListener('editor-logIn', logIn)
      document.removeEventListener('editor-signUp', signUp)
    }
  }, [onLogIn, onSignUp])

  if (!embeddable || failed) {
    return <EditorCanvas language={language} label={label} />
  }

  return (
    <div className="editor-embed">
      {!ready && <p className="editor-embed-loading body small muted">Loading the editor…</p>}
      {/* React never renders into this one — the editor is mounted here. */}
      <div className="editor-embed-host" ref={host} />
    </div>
  )
}
