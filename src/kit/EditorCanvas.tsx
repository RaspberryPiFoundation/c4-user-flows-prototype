/**
 * A still of the code editor, drawn in SVG.
 *
 * The biggest grey box in the repo was the editor canvas, and it sat in the
 * middle of the screen every import flow ends on. The real thing cannot be
 * embedded — the live blocks editor is inside a shadow DOM, and this repo does
 * not add dependencies — so this is a picture of one.
 *
 * It does not pretend to work. Nothing here is clickable and there is no code
 * you can read closely; at a glance it says "this is where the editor is",
 * which is all the surrounding flow needs it to say. A prototype that needs a
 * working editor is asking a different question and should say so in its notes.
 *
 * Drawn PORTRAIT, because the editor pane in this workbench is portrait
 * (roughly 290x510) — the real editor is wide, but art drawn wide letterboxes
 * into a tall pane and a still with bars down the side reads as a broken
 * image. It crops rather than letterboxes if the pane is a different shape.
 */

interface Props {
  /** Blocks for Scratch, a text editor for anything else. */
  language: 'Scratch' | 'Python' | 'HTML'
  label: string
}

const BLOCK_COLOURS = ['#4C97FF', '#9966FF', '#CF63CF', '#FFAB19', '#40BF4A']
const SYNTAX = ['#C678DD', '#61AFEF', '#98C379', '#E5C07B', '#56B6C2']

export function EditorCanvas({ language, label }: Props) {
  return (
    <svg
      className="editor-canvas-art"
      viewBox="0 0 200 340"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      focusable="false"
    >
      {language === 'Scratch' ? <BlocksEditor /> : <TextEditor />}
    </svg>
  )
}

function BlocksEditor() {
  return (
    <>
      <rect width="200" height="340" fill="#F4F4F4" />

      {/* Stage on top, as the editor lays out when the window is narrow. */}
      <rect width="200" height="126" fill="#FFFFFF" />
      <rect x="10" y="10" width="180" height="82" rx="4" fill="#E8F4FF" />
      <ellipse cx="100" cy="84" rx="82" ry="12" fill="#9BD35A" />
      <circle cx="152" cy="30" r="11" fill="#FFFFFF" opacity="0.8" />
      <circle cx="163" cy="32" r="8" fill="#FFFFFF" opacity="0.8" />
      {/* Two sprites having the conversation most projects are built around. */}
      <g>
        <circle cx="74" cy="66" r="13" fill="#FFAB19" />
        <circle cx="70" cy="63" r="2.6" fill="#1A1A1A" />
        <circle cx="79" cy="63" r="2.6" fill="#1A1A1A" />
        <circle cx="126" cy="70" r="10" fill="#CF63CF" />
        <circle cx="123" cy="68" r="2.2" fill="#1A1A1A" />
        <circle cx="130" cy="68" r="2.2" fill="#1A1A1A" />
      </g>
      {/* Sprite tray. */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={12 + i * 28}
          y="98"
          width="24"
          height="22"
          rx="3"
          fill="#F7F7F7"
          stroke="#E0E0E0"
        />
      ))}
      <line x1="0" y1="126" x2="200" y2="126" stroke="#E0E0E0" strokeWidth="1" />

      {/* Category rail. */}
      <rect y="126" width="28" height="214" fill="#FFFFFF" />
      {BLOCK_COLOURS.map((colour, i) => (
        <g key={colour}>
          <circle cx="14" cy={146 + i * 34} r="7" fill={colour} />
          <rect x="5" y={156 + i * 34} width="18" height="3" rx="1.5" fill="#E4E4E4" />
        </g>
      ))}

      {/* Palette of draggable blocks. */}
      <rect x="28" y="126" width="54" height="214" fill="#FCFCFC" />
      <line x1="82" y1="126" x2="82" y2="340" stroke="#E8E8E8" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="34"
          y={140 + i * 30}
          width={40 - (i % 3) * 5}
          height="17"
          rx="4"
          fill={BLOCK_COLOURS[i % BLOCK_COLOURS.length]}
          opacity="0.9"
        />
      ))}

      {/* Script area, with one stack snapped together. */}
      <g transform="translate(98 144)">
        <path
          d="M0 8 a10 8 0 0 1 20 0 h50 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-66 a4 4 0 0 1 -4 -4 Z"
          fill="#FFBF00"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${30 + i * 24} h10 a3 3 0 0 0 6 0 h${44 - (i % 3) * 9}
                a4 4 0 0 1 4 4 v13 a4 4 0 0 1 -4 4 h-${44 - (i % 3) * 9}
                a3 3 0 0 1 -6 0 h-10 a4 4 0 0 1 -4 -4 v-13 a4 4 0 0 1 4 -4 Z`}
            fill={BLOCK_COLOURS[i % BLOCK_COLOURS.length]}
          />
        ))}
      </g>
    </>
  )
}

function TextEditor() {
  /* Indentation and token widths are fixed, not random: a picture of code
     should look like code, and real code has structure. */
  const lines = [
    [0, [30, 52]],
    [0, [22, 40, 24]],
    [0, []],
    [0, [34, 58]],
    [1, [26, 44, 22]],
    [1, [40, 30]],
    [0, []],
    [0, [24, 38]],
    [1, [32, 50, 26]],
    [2, [40, 24]],
    [2, [28, 46]],
    [1, [34, 22]],
    [0, []],
    [0, [26, 42, 20]],
  ] as const

  return (
    <>
      <rect width="200" height="340" fill="#282C34" />

      {/* Tab bar, so it reads as an editor rather than a terminal. */}
      <rect width="200" height="18" fill="#21252B" />
      <rect width="66" height="18" fill="#282C34" />
      <rect x="10" y="7" width="40" height="4" rx="2" fill="#ABB2BF" opacity="0.8" />

      {/* Gutter. */}
      <rect y="18" width="22" height="242" fill="#21252B" />
      {lines.map((_, i) => (
        <rect key={i} x="11" y={30 + i * 16} width="6" height="3" rx="1.5" fill="#5C6370" />
      ))}

      {lines.map(([indent, tokens], row) => {
        let x = 30 + indent * 12
        return (
          <g key={row}>
            {tokens.map((width, i) => {
              const rect = (
                <rect
                  key={i}
                  x={x}
                  y={28 + row * 16}
                  width={width}
                  height="6"
                  rx="3"
                  fill={SYNTAX[(row + i) % SYNTAX.length]}
                  opacity="0.85"
                />
              )
              x += width + 7
              return rect
            })}
          </g>
        )
      })}

      {/* Cursor, parked at the end of the last line. */}
      <rect x="126" y={28 + 13 * 16} width="1.6" height="8" fill="#FFFFFF" />

      {/* Output pane. */}
      <rect y="260" width="200" height="80" fill="#21252B" />
      <line x1="0" y1="260" x2="200" y2="260" stroke="#181A1F" strokeWidth="2" />
      <rect x="10" y="270" width="34" height="4" rx="2" fill="#ABB2BF" opacity="0.6" />
      {[56, 88, 44, 70].map((width, i) => (
        <rect key={i} x="10" y={286 + i * 13} width={width} height="5" rx="2.5" fill="#98C379" />
      ))}
    </>
  )
}
