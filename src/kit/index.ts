// One import for everything you need to build a screen:
//
//   import { Button, TextInput, Card } from '../../kit'
//
// Most of this is re-exported straight from the Raspberry Pi Foundation design
// system. It is deliberately NOT wrapped — wrappers drift from the real
// components and hide props. If you need something the design system provides,
// add it to the re-export list rather than building your own.
//
// Only add a component of our own here if every prototype would want it. A
// component only your prototype needs belongs in your prototype folder.
//
// See README.md in this folder for what each component is for, and the
// gallery at #/kit for what they all look like.

export {
  Accordion,
  Alert,
  Button,
  CheckboxInput,
  Fieldset,
  InputField,
  InputLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuTitle,
  Modal,
  PasswordInput,
  ProgressBar,
  RadioInput,
  SearchInput,
  SelectInput,
  Switch,
  Table,
  TableBodyCell,
  TableHeaderCell,
  Tag,
  TextareaInput,
  TextInput,
} from '@raspberrypifoundation/design-system-react'

export type {
  AlertProps,
  ButtonProps,
  CheckboxInputProps,
  FieldSetProps,
  InputFieldProps,
  InputLabelProps,
  MenuItemProps,
  MenuProps,
  ProgressBarProps,
  RadioInputProps,
  SearchInputProps,
  SelectInputProps,
  SwitchProps,
  TableProps,
  TagProps,
  TextareaInputProps,
  TextInputProps,
} from '@raspberrypifoundation/design-system-react'

// Ours, because the design system has no equivalent.
export { Card } from './Card'
export { Placeholder } from './Placeholder'
