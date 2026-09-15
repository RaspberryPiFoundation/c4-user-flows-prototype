/**
 * A still of the code editor, drawn in SVG.
 *
 * Used for Scratch, where the real editor cannot be embedded, and as the
 * fallback anywhere `EditorEmbed` cannot reach the CDN. Python and HTML get
 * the real editor instead — see `EditorEmbed`.
 *
 * The blocks half is drawn from a screenshot of the live editor (the Neil the
 * Seal starter on Code Club Projects), so the parts a mentor would recognise
 * are the real parts: Scratch's own category colours in the real order, real
 * Motion block labels, the Code/Costumes/Sounds tabs, a stage over a sprite
 * tray, and a snapped-together stack of the blocks the instructions ask for.
 *
 * It still does not pretend to work — nothing here is clickable. The aim is
 * that it reads as THIS editor rather than as some editor, because in a
 * stakeholder review a generic grey rectangle is what gets noticed.
 *
 * Drawn PORTRAIT, because the editor pane in this workbench is portrait
 * (roughly 290x510) — the real editor is wide, but art drawn wide letterboxes
 * into a tall pane and a still with bars down the side reads as a broken
 * image. So it follows the narrow-window layout the real editor uses, with the
 * stage above the palette rather than beside it.
 */

interface Props {
  /** Blocks for Scratch, a text editor for anything else. */
  language: 'Scratch' | 'Python' | 'HTML'
  label: string
}

/* Scratch's own category colours, so a mentor who knows Scratch recognises
   the palette at a glance rather than reading it. */
const MOTION = '#4C97FF'
const LOOKS = '#9966FF'
const SYNTAX = ['#C678DD', '#61AFEF', '#98C379', '#E5C07B', '#56B6C2']

const CATEGORIES: Array<[string, string]> = [
  ['Motion', MOTION],
  ['Looks', LOOKS],
  ['Sound', '#CF63CF'],
  ['Events', '#FFBF00'],
  ['Control', '#FFAB19'],
  ['Sensing', '#5CB1D6'],
  ['Operators', '#40BF4A'],
  ['Variables', '#FF8C1A'],
  ['My Blocks', '#FF6680'],
]

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
  /* The Motion palette, in the order the real editor lists it. Real labels
     rather than grey bars: at a glance the difference between "a picture of an
     editor" and "a picture of THE editor" is mostly the words. */
  const palette: Array<[string, string]> = [
    ['move 10 steps', MOTION],
    ['turn ↻ 15 degrees', MOTION],
    ['turn ↺ 15 degrees', MOTION],
    ['go to random position', MOTION],
    ['go to x: 55 y: -50', MOTION],
    ['glide 1 secs to x: 55', MOTION],
    ['point in direction 90', MOTION],
    ['change x by 10', MOTION],
    ['set x to 55', MOTION],
  ]

  return (
    <>
      <rect width="200" height="340" fill="#F2F2F2" />

      {/* ---- Stage, on top, as the editor lays out when the window is narrow. */}
      <rect width="200" height="150" fill="#FFFFFF" />
      {/* Green flag and stop, and the layout controls beside them. */}
      <polygon points="9,8 9,18 17,13" fill="#45993D" />
      <circle cx="26" cy="13" r="5" fill="#EC5959" />
      <rect x="168" y="8" width="10" height="10" rx="2" fill="#E6E6E6" />
      <rect x="182" y="8" width="10" height="10" rx="2" fill="#E6E6E6" />

      {/* The stage itself: a road scene with a title card, which is what a
          Code Club Scratch starter almost always looks like. */}
      <rect x="8" y="24" width="184" height="86" rx="3" fill="#8CCBEA" />
      <rect x="8" y="58" width="184" height="34" fill="#9E9E9E" />
      <rect x="8" y="73" width="184" height="3" fill="#F5D33F" />
      <rect x="8" y="92" width="184" height="18" fill="#7FB84E" />
      <rect x="8" y="24" width="184" height="13" fill="#1C2E8A" />
      <rect x="66" y="28" width="68" height="5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
      {/* Two sprites on the road. */}
      <ellipse cx="72" cy="66" rx="12" ry="7" fill="#7E8C99" />
      <circle cx="63" cy="64" r="2" fill="#1A1A1A" />
      <rect x="126" y="52" width="9" height="15" rx="3" fill="#E8A33D" />
      <circle cx="130.5" cy="48" r="5" fill="#F2C48D" />

      {/* Sprite tray. Neil is selected, so his tile carries the ring. */}
      <rect x="8" y="116" width="128" height="28" rx="3" fill="#FFFFFF" stroke="#E0E0E0" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={12 + i * 31}
          y="120"
          width="24"
          height="20"
          rx="3"
          fill="#F7F7F7"
          stroke={i === 0 ? '#4C97FF' : '#E8E8E8'}
          strokeWidth={i === 0 ? 2 : 1}
        />
      ))}
      {/* Stage / Backdrops column. */}
      <rect x="142" y="116" width="50" height="28" rx="3" fill="#FFFFFF" stroke="#E0E0E0" />
      <rect x="150" y="121" width="34" height="11" rx="2" fill="#8CCBEA" />
      <rect x="150" y="135" width="20" height="3" rx="1.5" fill="#D9D9D9" />

      {/* ---- Code / Costumes / Sounds. */}
      <rect y="150" width="200" height="16" fill="#E9F0F8" />
      <rect x="6" y="150" width="46" height="16" rx="3" fill="#FFFFFF" />
      <text x="15" y="161" fill="#575E75" fontSize="7" fontWeight="700">
        Code
      </text>
      <text x="60" y="161" fill="#8A8F9E" fontSize="7">
        Costumes
      </text>
      <text x="108" y="161" fill="#8A8F9E" fontSize="7">
        Sounds
      </text>

      {/* ---- Category rail: the nine block groups, in the real order. */}
      <rect y="166" width="30" height="174" fill="#FFFFFF" />
      {/* Nine categories have to fit 174 units without "My Blocks" dropping off
          the bottom or "Operators" spilling out of a 30-wide rail. */}
      {CATEGORIES.map(([name, colour], i) => (
        <g key={name}>
          <circle cx="15" cy={175 + i * 18} r="4.6" fill={colour} />
          <text x="15" y={186 + i * 18} fill="#575E75" fontSize="4" textAnchor="middle">
            {name}
          </text>
        </g>
      ))}

      {/* ---- Palette. */}
      <rect x="30" y="166" width="86" height="174" fill="#FCFCFC" />
      <line x1="116" y1="166" x2="116" y2="340" stroke="#E8E8E8" strokeWidth="1" />
      <text x="35" y="176" fill="#575E75" fontSize="6" fontWeight="700">
        Motion
      </text>
      {palette.map(([label, colour], i) => (
        <g key={label}>
          <rect x="35" y={181 + i * 17} width="76" height="13" rx="4" fill={colour} />
          <text x="40" y={190 + i * 17} fill="#FFFFFF" fontSize="5.4">
            {label}
          </text>
        </g>
      ))}

      {/* ---- Workspace, with one stack snapped together. The blocks are the
             ones the instructions panel is asking for. */}
      <rect x="116" y="166" width="84" height="174" fill="#F9F9F9" />
      <g transform="translate(126 180)">
        <path
          d="M0 8 a9 7 0 0 1 18 0 h32 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-50 a4 4 0 0 1 -4 -4 Z"
          fill="#FFBF00"
        />
        <text x="6" y="20" fill="#FFFFFF" fontSize="5.4">
          when ⚑ clicked
        </text>
        {[
          ['go to x: 0 y: -40', MOTION],
          ['point in direction 90', MOTION],
          ['show', LOOKS],
        ].map(([label, colour], i) => (
          <g key={label}>
            <path
              d={`M0 ${28 + i * 19} h9 a3 3 0 0 0 6 0 h${39 - i * 2}
                  a4 4 0 0 1 4 4 v11 a4 4 0 0 1 -4 4 h-${39 - i * 2}
                  a3 3 0 0 1 -6 0 h-9 a4 4 0 0 1 -4 -4 v-11 a4 4 0 0 1 4 -4 Z`}
              fill={colour}
            />
            <text x="5" y={39 + i * 19} fill="#FFFFFF" fontSize="5.2">
              {label}
            </text>
          </g>
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
