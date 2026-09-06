// Auto-discovers every prototype in this folder. Nothing here needs editing
// when a prototype is added — dropping in a folder with a `meta.ts` and a
// `prototype.tsx` is enough, which is what keeps four people building in
// parallel from constantly conflicting in one shared list.
//
// Folders starting with `_` are ignored, so `_template` never shows up as a
// real prototype.

import type { ComponentType } from 'react'
import type { PrototypeMeta } from './types'
import { THEMES } from '../lanes'

export interface Prototype {
  /** Lane id, taken from the folder name — always matches lanes.ts. */
  lane: string
  /** Folder name, used in the URL. */
  slug: string
  meta: PrototypeMeta
  /** Lazily imported so one prototype's code isn't loaded to view another. */
  load: () => Promise<{ default: ComponentType }>
}

const metaModules = import.meta.glob<{ meta: PrototypeMeta }>('./*/*/meta.ts', {
  eager: true,
})
const componentLoaders = import.meta.glob<{ default: ComponentType }>('./*/*/prototype.tsx')

const KNOWN_LANES = new Set(THEMES.flatMap((theme) => theme.lanes.map((lane) => lane.id)))

function parsePath(path: string) {
  // './onboarding-mentor/demo/meta.ts' -> ['onboarding-mentor', 'demo']
  const [, lane, slug] = path.split('/')
  return { lane, slug }
}

export const PROTOTYPES: Prototype[] = Object.entries(metaModules)
  .map(([path, module]) => {
    const { lane, slug } = parsePath(path)
    const load = componentLoaders[`./${lane}/${slug}/prototype.tsx`]
    return { path, lane, slug, meta: module.meta, load }
  })
  .filter(({ path, lane, slug, meta, load }) => {
    if (lane.startsWith('_') || slug.startsWith('_')) return false
    if (!load) {
      console.warn(`[registry] ${path} has a meta.ts but no prototype.tsx next to it — skipping.`)
      return false
    }
    if (!meta) {
      console.warn(`[registry] ${path} does not export \`meta\` — skipping.`)
      return false
    }
    if (!KNOWN_LANES.has(lane)) {
      // Still reachable by URL, just not shown on the landing page, because
      // there is no lane to show it under.
      console.warn(
        `[registry] "${lane}" is not a lane in lanes.ts, so ${slug} will not appear on the landing page.`,
      )
    }
    return true
  })
  .map(({ lane, slug, meta, load }) => ({ lane, slug, meta, load: load! }))
  .sort((a, b) => a.meta.title.localeCompare(b.meta.title))

export function prototypesInLane(laneId: string): Prototype[] {
  return PROTOTYPES.filter((prototype) => prototype.lane === laneId)
}

export function findPrototype(lane: string, slug: string): Prototype | undefined {
  return PROTOTYPES.find((p) => p.lane === lane && p.slug === slug)
}
