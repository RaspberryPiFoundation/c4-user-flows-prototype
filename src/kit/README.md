# kit

Everything you need to build a screen, from one import:

```tsx
import { Button, TextInput, Card, Placeholder } from '../../kit'
```

**See them all rendered at [`#/kit`](../../#/kit)** — run `npm run dev` and open
the gallery. It shows every component in its states, with the code next to it.

## Rules

- **Import from here first.** If a component exists, use it — do not generate a
  new one from a Figma frame. That is how you end up with six different buttons.
- **Use tokens, never literals.** `var(--rpf-text)`, not `#212121`.
- **Do not edit this folder.** A component only your prototype needs belongs in
  your prototype folder. If three prototypes end up copying the same thing, that
  is when it earns a place in here.

## What's available

Most of this is re-exported unchanged from
`@raspberrypifoundation/design-system-react`, so the props are the real ones and
nothing is hidden behind a wrapper.

### Actions

| Component | For |
| --- | --- |
| `Button` | `type` primary / secondary / tertiary, `variant="danger"`, `size`, `icon`, `fullWidth`, `href` |
| `Menu`, `MenuButton`, `MenuItem`, `MenuTitle` | Dropdown menus |

### Form inputs

| Component | For |
| --- | --- |
| `TextInput` | Single-line text. Needs `id`, `name`, `label` |
| `PasswordInput` | Password, with show/hide and an optional forgot-password link |
| `TextareaInput` | Multi-line text. Controlled — needs `value` |
| `SelectInput` | Dropdown. `options` is `{ key, value }[]` |
| `SearchInput` | Search box with a button. Needs `onClick` and `onChange` |
| `CheckboxInput` | Single checkbox. Use `checked` + `onChange` — the documented `isChecked` prop leaks to the DOM and warns |
| `RadioInput` | One radio. Group them with `Fieldset` |
| `Switch` | On/off toggle |
| `Fieldset` | Groups related inputs under a legend, with shared error text |
| `InputField`, `InputLabel` | Building blocks for a custom input |

### Feedback

| Component | For |
| --- | --- |
| `Alert` | `type` error / warning / information / success. Optional `actions` |
| `Tag` | Small status label. `variant` default / information / success / warning / error |
| `ProgressBar` | `percent`, optional `text` |
| `Modal` | Dialog. Controlled with `isOpen` and `setIsOpen` |

### Content

| Component | For |
| --- | --- |
| `Accordion` | Collapsible section. Content goes in the `content` prop |
| `Table`, `TableHeaderCell`, `TableBodyCell` | `headerRow` plus `bodyRows` |
| `Card` | *Ours.* A white panel — the standard container for a block of content |
| `Placeholder` | *Ours.* A labelled grey box standing in for imagery we have not designed |

## Why `Placeholder` matters

Base screens are grey-box on purpose. `Placeholder` keeps that honest and
legible — label it with what the real thing would be (`"Project thumbnail"`,
`"Class list"`) so nobody in a review has to guess whether something is missing
or deliberately undesigned.
