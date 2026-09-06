# kit

Everything you need to build a screen, from one import:

```tsx
import { Button, TextInput, Card, Placeholder } from '../../kit'
```

**See them all rendered at `#/kit`** — run `npm run dev` and open the gallery. It shows every component in its states, with the code next to it.

## Rules

- **Import from here first.** If a component exists, use it — do not generate a
  new one from a Figma frame. That is how you end up with six different buttons.
- **Use tokens, never literals.** `var(--rpf-text)`, not `#212121`.
- **Do not edit this folder.** You should never need to: the design system is
  star-exported, so there is no list to add to. A component only your prototype
  needs belongs in your prototype folder. If three prototypes end up copying the
  same thing, that is when it earns a place in here.

## What's available

**Everything in `@raspberrypifoundation/design-system-react`**, re-exported
wholesale and unwrapped, so the props are the real ones and nothing is hidden.
If the design system has it, you can import it from here — even if it is not in
the table below. Check its own types for props.

The table is the shortlist you will actually reach for.

### Actions

| Component | For |
| --- | --- |
| `Button` | `type` primary / secondary / tertiary, `variant="danger"`, `size`, `icon`, `fullWidth`, `href` |
| `Menu`, `MenuButton`, `MenuItem`, `MenuTitle` | Dropdown menus |

### Form inputs

| Component | For |
| --- | --- |
| `TextInput` | Single-line text. Needs `id`, `name`, `label` |
| `PasswordInput` | Password, with show/hide and an optional forgot-password link. Pass `fullWidth` inside a card, or it stays 240px |
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

## Known design system issues

- **`PasswordInput` right border** (design system 2.10.4). The input and the
  "Show" button are drawn as two halves of one control, but the bundle's
  generic `.rpf-button:before` rule comes after the password button's own rule
  at equal specificity and blanks the border, so the field looks sliced off.
  `global.css` carries a scoped override. Worth reporting upstream — remove the
  override when it is fixed.
- **`CheckboxInput`** forwards its documented `isChecked` prop to the DOM and
  warns. Use `checked` + `onChange`.

## Why `Placeholder` matters

Base screens are grey-box on purpose. `Placeholder` keeps that honest and
legible — label it with what the real thing would be (`"Project thumbnail"`,
`"Class list"`) so nobody in a review has to guess whether something is missing
or deliberately undesigned.
