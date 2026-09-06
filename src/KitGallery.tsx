import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Accordion,
  Alert,
  Button,
  Card,
  CheckboxInput,
  Fieldset,
  Menu,
  MenuButton,
  MenuItem,
  MenuTitle,
  Modal,
  PasswordInput,
  Placeholder,
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
} from './kit'

/** One component and every state worth seeing. */
function Demo({
  name,
  note,
  stacked,
  children,
}: {
  name: string
  note?: string
  /** For components that are full width in real use, like alerts. */
  stacked?: boolean
  children: ReactNode
}) {
  return (
    <section className="demo" aria-labelledby={`demo-${name}`}>
      <div className="demo-head">
        <h3 className="title-sm" id={`demo-${name}`}>
          {name}
        </h3>
        {note && <p className="body muted">{note}</p>}
      </div>
      <div className={stacked ? 'demo-stage demo-stage-stacked' : 'demo-stage'}>{children}</div>
    </section>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="theme" aria-labelledby={`group-${title}`}>
      <h2 className="title-md theme-head" id={`group-${title}`}>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function KitGallery() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState('')
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(true)
  const [switched, setSwitched] = useState(false)
  const [radio, setRadio] = useState('mentor')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="card">
      <div className="intro">
        <h1 className="title-lg">Component gallery</h1>
        <p className="body muted">
          Everything in <code>src/kit</code>, which is what prototypes build from. Import all of it
          from one place: <code>import {'{'} Button {'}'} from '../../kit'</code>. See{' '}
          <a href="https://github.com/RaspberryPiFoundation/c4-user-flows-prototype/blob/main/src/kit/README.md">
            kit/README.md
          </a>{' '}
          for what each one is for.
        </p>
        <p className="body muted">
          <Link to="/">← All prototypes</Link>
        </p>
      </div>

      <Alert type="information" title="Use these before generating anything new">
        <p className="body">
          If a component exists here, import it. Generating a fresh one from a Figma frame is how
          six slightly different buttons end up on the same site.
        </p>
      </Alert>

      <div className="theme-list">
        <Group title="Actions">
          <Demo name="Button" note="type: primary, secondary, tertiary. Plus danger, sizes, icons.">
            <Button type="primary" text="Primary" onClick={() => {}} />
            <Button type="secondary" text="Secondary" onClick={() => {}} />
            <Button type="tertiary" text="Tertiary" onClick={() => {}} />
            <Button type="primary" variant="danger" text="Danger" onClick={() => {}} />
            <Button type="primary" size="small" text="Small" onClick={() => {}} />
            <Button type="primary" text="Disabled" disabled onClick={() => {}} />
            <Button type="primary" text="With icon" icon="arrow_forward" iconPosition="right" onClick={() => {}} />
            <Button type="secondary" text="As a link" href="#/kit" />
          </Demo>

          <Demo name="Menu" note="Dropdown. MenuButton opens it; MenuItem rows go inside.">
            <Menu>
              <MenuButton buttonText="Class options" />
              <MenuTitle text="This class" />
              <MenuItem text="Rename" onClick={() => {}} />
              <MenuItem text="Add young people" onClick={() => {}} />
              <MenuItem text="Delete class" danger onClick={() => {}} />
            </Menu>
          </Demo>
        </Group>

        <Group title="Form inputs">
          <Demo name="TextInput" note="Default, with hint, and in an error state.">
            <TextInput
              id="demo-text"
              name="demo-text"
              label="Club name"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <TextInput
              id="demo-text-hint"
              name="demo-text-hint"
              label="School code"
              hint="Your mentor will give you this"
            />
            <TextInput
              id="demo-text-error"
              name="demo-text-error"
              label="Username"
              error="That username is already taken"
            />
          </Demo>

          <Demo name="PasswordInput" note="Show/hide is built in. Forgot-password link is optional.">
            <PasswordInput id="demo-password" label="Password" />
            <PasswordInput
              id="demo-password-forgot"
              label="Password"
              forgotPasswordHref="#/kit"
              error="Incorrect password"
            />
          </Demo>

          <Demo name="SelectInput" note="options is an array of { key, value }.">
            <SelectInput
              id="demo-select"
              name="demo-select"
              label="Year group"
              placeholder="Choose a year group"
              options={[
                { key: 'y5', value: 'Year 5' },
                { key: 'y6', value: 'Year 6' },
                { key: 'y7', value: 'Year 7' },
              ]}
            />
          </Demo>

          <Demo name="TextareaInput" note="Controlled — value is required.">
            <TextareaInput
              id="demo-textarea"
              name="demo-textarea"
              label="Notes for the club"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Demo>

          <Demo name="SearchInput" note="Needs both onClick and onChange.">
            <SearchInput
              inputFieldId="demo-search"
              label="Find a project"
              placeholder="Search projects"
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => {}}
            />
            <p className="body muted">Typed: {search || '—'}</p>
          </Demo>

          <Demo name="CheckboxInput">
            <CheckboxInput
              id="demo-checkbox"
              name="demo-checkbox"
              label="Send me club updates"
              checked={checked}
              onChange={() => setChecked((c) => !c)}
            />
            <CheckboxInput
              id="demo-checkbox-error"
              name="demo-checkbox-error"
              label="I confirm I am over 18"
              error="You need to confirm this to continue"
            />
          </Demo>

          <Demo name="RadioInput + Fieldset" note="Fieldset groups radios under a legend.">
            <Fieldset legendText="Who are you?" legendHintText="Pick one">
              <RadioInput
                id="demo-radio-mentor"
                name="demo-radio"
                label="A mentor"
                checked={radio === 'mentor'}
                onChange={() => setRadio('mentor')}
              />
              <RadioInput
                id="demo-radio-yp"
                name="demo-radio"
                label="A young person"
                checked={radio === 'yp'}
                onChange={() => setRadio('yp')}
              />
            </Fieldset>
          </Demo>

          <Demo name="Switch">
            <Switch
              id="demo-switch"
              name="demo-switch"
              label="Let young people see each other's projects"
              hint="They can always see their own"
              checked={switched}
              onChange={() => setSwitched((s) => !s)}
            />
          </Demo>
        </Group>

        <Group title="Feedback">
          <Demo name="Alert" stacked note="type: information, success, warning, error. Actions optional.">
            <Alert type="information" title="Heads up" text="This is an informational alert." />
            <Alert type="success" title="Class created" text="Your class is ready." />
            <Alert type="warning" title="Check this" text="Two young people have the same name." />
            <Alert
              type="error"
              title="We could not sign you in"
              text="Check the school code and try again."
              actions={[{ label: 'Try again', onClick: () => {} }]}
            />
          </Demo>

          <Demo name="Tag" note="Small status label.">
            <Tag text="Default" />
            <Tag text="Information" variant="information" />
            <Tag text="Success" variant="success" />
            <Tag text="Warning" variant="warning" />
            <Tag text="Error" variant="error" />
            <Tag text="Secondary" variant="information" secondary />
          </Demo>

          <Demo name="ProgressBar" stacked>
            <ProgressBar text="Step 2 of 5" percent={40} />
            <ProgressBar text="All steps done" percent={100} complete />
          </Demo>

          <Demo name="Modal" note="Controlled with isOpen and setIsOpen.">
            <Button type="primary" text="Open the modal" onClick={() => setModalOpen(true)} />
            <Modal
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              heading="Delete this class?"
              primaryButtonText="Delete"
              onClickPrimaryButton={() => setModalOpen(false)}
              secondaryButtonText="Cancel"
              onClickSecondaryButton={() => setModalOpen(false)}
            >
              <p className="body">
                The young people in it will keep their accounts, but they will lose access to the
                projects you assigned.
              </p>
            </Modal>
          </Demo>
        </Group>

        <Group title="Content">
          <Demo name="Accordion" note="Content goes in the content prop, not children.">
            <Accordion
              id="demo-accordion"
              className=""
              title="How do young people join?"
              content={
                <p className="body">
                  You give them the school code, or share a direct link to your class.
                </p>
              }
            />
          </Demo>

          <Demo name="Table" note="headerRow plus an array of bodyRows.">
            <Table
              fullWidth
              headerRow={
                <>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Projects</TableHeaderCell>
                </>
              }
              bodyRows={[
                <>
                  <TableBodyCell>Amara</TableBodyCell>
                  <TableBodyCell>amara.k</TableBodyCell>
                  <TableBodyCell>3</TableBodyCell>
                </>,
                <>
                  <TableBodyCell>Ravi</TableBodyCell>
                  <TableBodyCell>ravi.p</TableBodyCell>
                  <TableBodyCell>1</TableBodyCell>
                </>,
              ]}
            />
          </Demo>

          <Demo name="Card" note="Ours. A white panel for a block of content inside a screen.">
            <Card>
              <h4 className="title-sm">Space Talk</h4>
              <p className="body muted">Scratch · 6 steps</p>
            </Card>
          </Demo>

          <Demo
            name="Placeholder"
            note="Ours. A labelled grey box for anything we have deliberately not designed."
          >
            <Placeholder label="Project thumbnail" height={120} />
            <Placeholder label="Class list" height={64} />
          </Demo>
        </Group>
      </div>
    </div>
  )
}
