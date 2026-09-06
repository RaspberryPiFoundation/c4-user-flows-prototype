/**
 * What we know about a base screen, so nobody downstream has to guess.
 *
 * `existsToday` is the important one. Once prototypes contain screens no
 * product has, an engineering handoff needs to distinguish "wire up the
 * existing screen" from "this is net new". It is never shown in the UI — a
 * tester seeing a "proposed" badge would react to the badge.
 */
import type { SurfaceId } from '../surfaces'

export interface ScreenMeta {
  /** Which product this screen belongs to. */
  surface: SurfaceId
  /** Extra branding on the chrome, where one product's page is badged another. */
  badge?: string
  layout?: 'app' | 'centred'
  /** Does this screen exist in the live product today? */
  existsToday: boolean
  /**
   * Has someone actually looked at the real thing, or is this built from a
   * description? Unverified screens are probably wrong in the details.
   */
  verified: boolean
  /** What it is for, and anything worth knowing about it. */
  note: string
}
