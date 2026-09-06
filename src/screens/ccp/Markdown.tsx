import type { ReactNode } from 'react'

/**
 * A deliberately tiny markdown renderer for project instructions.
 *
 * Handles headings, paragraphs, bullets, `inline code` and **bold** — which is
 * what Code Club Projects steps actually use. It is not a real markdown
 * implementation and does not need to be: adding a dependency for a grey-box
 * prototype would cost every contributor an install for something that renders
 * four constructs.
 *
 * If a prototype needs more, render the raw text instead and say so.
 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  // Split on `code` and **bold**, keeping the delimiters.
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code className="md-code" key={key}>
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    return <span key={key}>{part}</span>
  })
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.split('\n')
  const out: ReactNode[] = []
  let bullets: string[] = []

  const flushBullets = () => {
    if (bullets.length === 0) return
    out.push(
      <ul className="md-list" key={`ul-${out.length}`}>
        {bullets.map((item, index) => (
          <li key={index}>{inline(item, `li-${out.length}-${index}`)}</li>
        ))}
      </ul>,
    )
    bullets = []
  }

  blocks.forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ')) {
      bullets.push(trimmed.slice(2))
      return
    }
    flushBullets()
    if (trimmed === '') return
    if (trimmed.startsWith('## ')) {
      out.push(
        <h3 className="title-sm" key={index}>
          {trimmed.slice(3)}
        </h3>,
      )
      return
    }
    if (trimmed.startsWith('# ')) {
      out.push(
        <h2 className="title-md" key={index}>
          {trimmed.slice(2)}
        </h2>,
      )
      return
    }
    out.push(
      <p className="body" key={index}>
        {inline(trimmed, `p-${index}`)}
      </p>,
    )
  })
  flushBullets()

  return <div className="md">{out}</div>
}
