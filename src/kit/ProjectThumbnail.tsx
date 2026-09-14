/**
 * Illustrative artwork for a project, drawn in SVG.
 *
 * The live Projects site gives every project a bespoke illustration. We cannot
 * ship those — our projects are invented, so real artwork would attach a real
 * project's picture to a made-up title — and a grey box reads as unfinished in
 * a stakeholder review. So each project gets generated artwork instead:
 * language-themed, deterministic from its id, and obviously drawn rather than
 * photographic, which keeps it honest about being a stand-in.
 *
 * Deterministic matters. The same project must look the same everywhere it
 * appears, or a catalogue and a class page will disagree about which project
 * is which.
 */

/* Illustration colours, deliberately NOT --rpf-* tokens. These are Scratch's
   and Python's own brand colours plus scene colours for the artwork; they are
   not UI colours and there are no design tokens for them. Same reasoning as
   the literal hues in surfaces/tokens.css. */
const PALETTES = {
  Scratch: {
    sky: '#E8F4FF',
    ground: '#9BD35A',
    ink: '#4C97FF',
    accents: ['#4C97FF', '#9966FF', '#CF63CF', '#FFAB19'],
  },
  Python: {
    sky: '#1B2A57',
    ground: '#2B4171',
    ink: '#FFD43B',
    accents: ['#4B8BBE', '#FFD43B', '#646464', '#306998'],
  },
  HTML: {
    sky: '#FFF1E8',
    ground: '#F2734C',
    ink: '#E44D26',
    accents: ['#E44D26', '#F06529', '#EBEBEB', '#264DE4'],
  },
} as const

export type ThumbnailLanguage = keyof typeof PALETTES

/** Small stable hash, so one project always gets the same arrangement. */
function seedOf(key: string) {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

interface Props {
  /** Project id — the seed. Two projects with the same id look identical. */
  seed: string
  language: ThumbnailLanguage
  /** CSS height. A number is pixels. Defaults to filling its container. */
  height?: number | string
  /** Decorative by default. Pass a title if the image carries meaning alone. */
  label?: string
}

export function ProjectThumbnail({ seed, language, height = '100%', label }: Props) {
  const palette = PALETTES[language] ?? PALETTES.Scratch
  const n = seedOf(seed)

  /* Three motifs, picked by seed, so a catalogue of six projects does not look
     like the same picture six times. */
  const motif = n % 3

  return (
    <svg
      className="project-thumb"
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ height, width: '100%' }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="160" height="100" fill={palette.sky} />

      {/* Rolling ground, offset by seed so the horizon is not always level. */}
      <path
        d={`M0 ${74 + (n % 7)} Q 40 ${66 + (n % 11)} 80 ${72 + (n % 5)} T 160 ${70 + (n % 9)} V100 H0 Z`}
        fill={palette.ground}
        opacity="0.9"
      />

      {/* Soft shapes in the background, placed by seed. */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={18 + ((n >> (i * 3)) % 130)}
          cy={14 + ((n >> (i * 2)) % 34)}
          r={5 + ((n >> i) % 9)}
          fill={palette.accents[(n + i) % palette.accents.length]}
          opacity="0.35"
        />
      ))}

      {motif === 0 && <StackedBlocks palette={palette} seed={n} />}
      {motif === 1 && <Window palette={palette} seed={n} />}
      {motif === 2 && <Sprite palette={palette} seed={n} />}
    </svg>
  )
}

type Palette = (typeof PALETTES)[ThumbnailLanguage]

/** Three snapped-together code blocks, notches and all. */
function StackedBlocks({ palette, seed }: { palette: Palette; seed: number }) {
  return (
    <g transform="translate(44 26)">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0 ${i * 17} h12 a3 3 0 0 0 6 0 h${46 - (seed >> i) % 14}
              a3 3 0 0 1 3 3 v9 a3 3 0 0 1 -3 3 h-${46 - (seed >> i) % 14}
              a3 3 0 0 1 -6 0 h-12 a3 3 0 0 1 -3 -3 v-9 a3 3 0 0 1 3 -3 Z`}
          fill={palette.accents[(seed + i) % palette.accents.length]}
        />
      ))}
    </g>
  )
}

/** A little app window — stands in for a running project. */
function Window({ palette, seed }: { palette: Palette; seed: number }) {
  return (
    <g transform="translate(38 22)">
      <rect width="84" height="58" rx="5" fill="#FFFFFF" opacity="0.95" />
      <rect width="84" height="12" rx="5" fill={palette.ink} />
      <rect y="7" width="84" height="5" fill={palette.ink} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={8 + i * 8} cy={6} r="2" fill="#FFFFFF" opacity="0.85" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="9"
          y={20 + i * 9}
          width={26 + ((seed >> i) % 44)}
          height="5"
          rx="2.5"
          fill={palette.accents[(seed + i) % palette.accents.length]}
          opacity="0.75"
        />
      ))}
    </g>
  )
}

/** A character on the stage — the Scratch mental model, roughly. */
function Sprite({ palette, seed }: { palette: Palette; seed: number }) {
  const body = palette.accents[seed % palette.accents.length]
  return (
    <g transform="translate(58 24)">
      {/* Speech bubble — projects are nearly always something talking. */}
      <path
        d="M30 0 h34 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-20 l-7 7 v-7 h-7 a6 6 0 0 1 -6 -6 v-16 a6 6 0 0 1 6 -6 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      {[0, 1].map((i) => (
        <rect
          key={i}
          x="36"
          y={8 + i * 8}
          width={16 + ((seed >> i) % 22)}
          height="4"
          rx="2"
          fill={palette.ink}
          opacity="0.6"
        />
      ))}
      {/* The character. */}
      <ellipse cx="16" cy="46" rx="17" ry="14" fill={body} />
      <circle cx="16" cy="26" r="13" fill={body} />
      <circle cx="11" cy="24" r="3.4" fill="#FFFFFF" />
      <circle cx="21" cy="24" r="3.4" fill="#FFFFFF" />
      <circle cx="11.8" cy="24.6" r="1.6" fill="#1A1A1A" />
      <circle cx="21.8" cy="24.6" r="1.6" fill="#1A1A1A" />
    </g>
  )
}
