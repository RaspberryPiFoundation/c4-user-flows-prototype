// One import for everything you need to build a screen:
//
//   import { Button, TextInput, Placeholder } from '../../kit'
//
// Almost all of this IS the Raspberry Pi Foundation design system, re-exported
// wholesale and unwrapped. Wrapping would hide props and drift from the real
// components; the star export means anything the design system adds is
// available here immediately, with no list to keep up to date and no shared
// file for you to edit.
//
// Only add a component of our own below if every prototype would want it. A
// component only your prototype needs belongs in your prototype folder.
//
// See README.md in this folder for what is available, and the gallery at
// #/kit for what it all looks like.

export * from '@raspberrypifoundation/design-system-react'

// Ours, because the design system has no equivalent.
export { Card } from './Card'
export { Placeholder } from './Placeholder'
