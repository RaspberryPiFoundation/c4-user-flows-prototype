/**
 * A still of the code editor, drawn in SVG.
 *
 * Used for Scratch, where the real editor cannot be embedded, and as the
 * fallback anywhere `EditorEmbed` cannot reach the CDN. Python and HTML get
 * the real editor instead — see `EditorEmbed`.
 *
 * The blocks half is drawn from a screenshot of the live editor (the Neil the
 * Seal starter on Code Club Projects), so the parts a mentor would recognise
 * are the real parts: Scratch's own nine category colours in the real order
 * with their labels, real Motion block labels, the Code/Costumes/Sounds tabs,
 * the workspace, and a stage over a sprite tray with the selected sprite
 * ringed.
 *
 * It still does not pretend to work — nothing here is clickable. The aim is
 * that it reads as THIS editor rather than as some editor, because in a
 * stakeholder review a generic grey rectangle is what gets noticed.
 *
 * Drawn LANDSCAPE, in the real editor's own arrangement: categories and
 * palette on the left, workspace in the middle, stage and sprites on the
 * right. That follows the pane, which is landscape now the editor takes the
 * whole window. It crops rather than letterboxes if the pane is a different
 * shape.
 */

interface Props {
  /** Blocks for Scratch, a text editor for anything else. */
  language: 'Scratch' | 'Python' | 'HTML'
  label: string
}

/* Scratch's own category colours, so a mentor who knows Scratch recognises the
   palette at a glance rather than reading it. */
const MOTION = '#4C97FF'
const LOOKS = '#9966FF'
const SYNTAX = ['#C678DD', '#61AFEF', '#98C379', '#E5C07B', '#56B6C2']

/* The starter's cast, as the tray shows it. */
const SPRITES = [
  { name: 'Neil', colour: '#7E8C99', round: true },
  { name: 'Ranger', colour: '#E8A33D', round: true },
  { name: 'Sign', colour: '#EC5959', round: false },
  { name: 'Car', colour: '#4C97FF', round: false },
  { name: 'Barrier', colour: '#FF8C1A', round: false },
]

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
      viewBox="0 0 340 290"
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
  const palette = [
    'move 10 steps',
    'turn ↻ 15 degrees',
    'turn ↺ 15 degrees',
    'go to random position',
    'go to x: 55 y: -50',
    'glide 1 secs to x: 55',
    'point in direction 90',
    'point towards mouse-pointer',
    'change x by 10',
    'set x to 55',
    'change y by 10',
  ]

  /* The stack the instructions panel beside this is asking for. */
  const stack: Array<[string, string]> = [
    ['go to x: 0 y: -40', MOTION],
    ['point in direction 90', MOTION],
    ['show', LOOKS],
  ]

  return (
    <>
      <rect width="340" height="290" fill="#F9F9F9" />

      {/* ---- Code / Costumes / Sounds. */}
      <rect width="340" height="15" fill="#E9F0F8" />
      <rect x="4" width="42" height="15" rx="3" fill="#FFFFFF" />
      <text x="12" y="10.5" fill="#575E75" fontSize="6.4" fontWeight="700">
        Code
      </text>
      <text x="54" y="10.5" fill="#8A8F9E" fontSize="6.4">
        Costumes
      </text>
      <text x="100" y="10.5" fill="#8A8F9E" fontSize="6.4">
        Sounds
      </text>

      {/* ---- Category rail. */}
      <rect y="15" width="28" height="275" fill="#FFFFFF" />
      {CATEGORIES.map(([name, colour], i) => (
        <g key={name}>
          <circle cx="14" cy={30 + i * 29} r="5" fill={colour} />
          <text x="14" y={42 + i * 29} fill="#575E75" fontSize="4.4" textAnchor="middle">
            {name}
          </text>
        </g>
      ))}

      {/* ---- Palette. */}
      <rect x="28" y="15" width="94" height="275" fill="#FCFCFC" />
      <line x1="122" y1="15" x2="122" y2="290" stroke="#E8E8E8" strokeWidth="1" />
      <text x="33" y="27" fill="#575E75" fontSize="6" fontWeight="700">
        Motion
      </text>
      {palette.map((label, i) => (
        <g key={label}>
          <rect x="33" y={32 + i * 23} width="83" height="15" rx="4" fill={MOTION} />
          <text x="38" y={42.5 + i * 23} fill="#FFFFFF" fontSize="5.2">
            {label}
          </text>
        </g>
      ))}

      {/* ---- Workspace. */}
      <rect x="122" y="15" width="100" height="275" fill="#F9F9F9" />
      <g transform="translate(140 40)">
        <path
          d="M0 9 a10 8 0 0 1 20 0 h38 a4 4 0 0 1 4 4 v11 a4 4 0 0 1 -4 4 h-58 a4 4 0 0 1 -4 -4 Z"
          fill="#FFBF00"
        />
        <text x="7" y="22" fill="#FFFFFF" fontSize="5.6">
          when ⚑ clicked
        </text>
        {stack.map(([label, colour], i) => (
          <g key={label}>
            <path
              d={`M0 ${32 + i * 22} h10 a3 3 0 0 0 6 0 h${46 - i * 3}
                  a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-${46 - i * 3}
                  a3 3 0 0 1 -6 0 h-10 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4 Z`}
              fill={colour}
            />
            <text x="6" y={44 + i * 22} fill="#FFFFFF" fontSize="5.4">
              {label}
            </text>
          </g>
        ))}
      </g>
      {/* Zoom controls, bottom right of the workspace as in the real editor. */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="210" cy={246 + i * 15} r="5" fill="#E9E9E9" />
      ))}

      {/* ---- Stage and sprites. */}
      <rect x="222" y="15" width="118" height="275" fill="#FFFFFF" />
      <line x1="222" y1="15" x2="222" y2="290" stroke="#E8E8E8" strokeWidth="1" />
      {/* Green flag, stop, and the layout toggles. */}
      <polygon points="230,22 230,32 238,27" fill="#45993D" />
      <circle cx="247" cy="27" r="5" fill="#EC5959" />
      <rect x="310" y="22" width="10" height="10" rx="2" fill="#E6E6E6" />
      <rect x="324" y="22" width="10" height="10" rx="2" fill="#E6E6E6" />

      {/* The stage: a road scene under a title card, which is what a Code Club
          Scratch starter almost always looks like. */}
      <rect x="230" y="38" width="104" height="78" rx="3" fill="#8CCBEA" />
      <rect x="230" y="38" width="104" height="12" fill="#1C2E8A" />
      <rect x="262" y="41" width="40" height="5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
      <rect x="230" y="68" width="104" height="30" fill="#9E9E9E" />
      <rect x="230" y="82" width="104" height="2.5" fill="#F5D33F" />
      <rect x="230" y="98" width="104" height="18" fill="#7FB84E" />
      <ellipse cx="266" cy="76" rx="11" ry="6" fill="#7E8C99" />
      <circle cx="258" cy="74" r="1.8" fill="#1A1A1A" />
      <rect x="300" y="62" width="8" height="14" rx="3" fill="#E8A33D" />
      <circle cx="304" cy="58" r="4.6" fill="#F2C48D" />

      {/* Selected sprite's x and y, which the real panel shows under the stage. */}
      <rect x="230" y="122" width="104" height="14" rx="3" fill="#F7F7F7" />
      <text x="235" y="132" fill="#575E75" fontSize="5">
        Neil
      </text>
      <text x="278" y="132" fill="#8A8F9E" fontSize="5">
        x 55
      </text>
      <text x="304" y="132" fill="#8A8F9E" fontSize="5">
        y -50
      </text>

      {/* Sprite tray. The first is selected, so it carries the ring. Named and
          drawn rather than left as empty tiles — a Scratch starter always
          arrives with its cast already in place, and blank squares read as a
          project nobody has set up. */}
      <rect x="230" y="142" width="104" height="112" rx="3" fill="#F2F2F2" />
      {SPRITES.map(({ name, colour, round }, i) => {
        const x = 236 + (i % 3) * 33
        const y = 148 + Math.floor(i / 3) * 34
        return (
          <g key={name}>
            <rect
              x={x}
              y={y}
              width="28"
              height="28"
              rx="3"
              fill="#FFFFFF"
              stroke={i === 0 ? MOTION : '#E4E4E4'}
              strokeWidth={i === 0 ? 2 : 1}
            />
            {round ? (
              <circle cx={x + 14} cy={y + 11} r="6" fill={colour} />
            ) : (
              <rect x={x + 8} y={y + 5} width="12" height="12" rx="2" fill={colour} />
            )}
            <text x={x + 14} y={y + 25} fill="#575E75" fontSize="4" textAnchor="middle">
              {name}
            </text>
          </g>
        )
      })}
      {/* Add sprite / add backdrop. */}
      <circle cx="322" cy="222" r="8" fill="#855CD6" />
      <circle cx="322" cy="242" r="8" fill="#855CD6" />
    </>
  )
}

function TextEditor() {
  /* Indentation and token widths are fixed, not random: a picture of code
     should look like code, and real code has structure. */
  const lines = [
    [0, [34, 58]],
    [0, [24, 44, 26]],
    [0, []],
    [0, [38, 62]],
    [1, [28, 48, 24]],
    [1, [44, 32]],
    [0, []],
    [0, [26, 42]],
    [1, [36, 54, 28]],
    [2, [44, 26]],
    [2, [30, 50]],
    [1, [38, 24]],
    [0, []],
    [0, [28, 46, 22]],
  ] as const

  return (
    <>
      <rect width="340" height="290" fill="#282C34" />

      {/* Tab bar, so it reads as an editor rather than a terminal. */}
      <rect width="340" height="17" fill="#21252B" />
      <rect width="62" height="17" fill="#282C34" />
      <rect x="10" y="7" width="38" height="4" rx="2" fill="#ABB2BF" opacity="0.8" />

      {/* Gutter and code. */}
      <rect y="17" width="20" height="273" fill="#21252B" />
      {lines.map((_, i) => (
        <rect key={i} x="9" y={30 + i * 17} width="6" height="3" rx="1.5" fill="#5C6370" />
      ))}
      {lines.map(([indent, tokens], row) => {
        let x = 28 + indent * 13
        return (
          <g key={row}>
            {tokens.map((width, i) => {
              const rect = (
                <rect
                  key={i}
                  x={x}
                  y={28 + row * 17}
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
      <rect x="132" y={28 + 13 * 17} width="1.6" height="8" fill="#FFFFFF" />

      {/* Output beside the code, which is where it sits at this width. */}
      <rect x="216" y="17" width="124" height="273" fill="#21252B" />
      <line x1="216" y1="17" x2="216" y2="290" stroke="#181A1F" strokeWidth="2" />
      <rect x="226" y="28" width="40" height="4" rx="2" fill="#ABB2BF" opacity="0.6" />
      {[64, 92, 48, 78, 56].map((width, i) => (
        <rect key={i} x="226" y={44 + i * 14} width={width} height="5" rx="2.5" fill="#98C379" />
      ))}
    </>
  )
}
