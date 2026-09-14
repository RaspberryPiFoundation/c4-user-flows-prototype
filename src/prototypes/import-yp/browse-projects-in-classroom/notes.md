Logging in and starting a project without leaving Code Classroom — either from
scratch, or from the Code Club Projects catalogue brought inside.

Built to the proposed flow diagram (Natalie, September 2026).

## What question is this answering?

`import-yp` — how a young person gets a project to work on.

Today the answer crosses two products. Projects live on Code Club Projects,
which a club member cannot sign in to: they hold a Code Classroom student
account their mentor made, and the two identity systems are unconnected. So
finding a project means leaving the place their work is kept, browsing as a
stranger, and having nowhere to put what they make.

This asks what happens if both ways of starting come to them instead.

## Why this approach

Betting that the handoff is the problem, not the browsing. If that is right,
offering both routes inside Code Classroom fixes it without any account
bridging, any import step, or any change to Code Club Projects.

**The fork is the point.** "Start from scratch" and "Browse Code Club projects"
sit side by side on one screen. Each answers a different need — one is a club
session where someone has an idea, the other is a club session where they do
not — and Code Classroom currently serves neither.

**What is proposed, and what is real.** Everything from "Add a project" onwards
is proposed; nothing like it exists. Specifically:

- `AddProjectChoices.tsx` — the fork, the project-type modal, and the
  confirmation. Both dialogs share one row component and one shape —
  select, then confirm — so adding a project is one kind of question asked
  twice rather than two screens to learn. The cost is a click: route, confirm,
  language, confirm. Worth watching whether that reads as deliberate or as
  being asked the same thing twice
- `ProjectLibrary.tsx` — the catalogue, inside Code Classroom, laid out as
  tiles to match projects.raspberrypi.org's own project cards (checked against
  the Nature list: 16px radius, hairline border, full-bleed image, then a level
  tag, title, one-line description and an action). If this is going to stand in
  for the catalogue it has to be recognisable as the catalogue — a young person
  who has browsed projects at home should meet the same thing here
- `ClassProjects.tsx` — the class page split into **Assigned to you** and
  **Created by you**, copied from `screens/classroom/YoungPersonClassPage`
  rather than propped, because the shared screen has no notion of where a
  project came from — today it cannot, since everything in a class was put
  there by an adult
- `ClassroomHome.tsx` and `UpdatePassword.tsx` — these exist in the real
  product but have never been built in `screens/`, and **nobody has checked
  them against the real thing.** Treat the details as wrong.

Everything else is a real screen, unchanged: `RoleChooser`, `SchoolCodeEntry`,
`StudentSignIn`, `YoungPersonSchoolHome`, `YoungPersonClassPage`,
`ProjectPage`, `ClassroomProjectEditor`.

Nothing outside this folder was touched.

Deliberately rejected:

- **An import button on Code Club Projects.** The obvious move, and
  `ProjectPage` already takes an `onImport` prop for it. But it only works for
  someone who got to Code Club Projects and signed in, which is the thing a
  club member cannot do. It solves the second half of a journey they cannot
  start.
- **Bridging the two accounts.** A school code screen on Code Club Projects
  would be a real fix and a much bigger one. This is the cheap version — worth
  knowing whether cheap is enough before anyone costs the expensive one.

## Three things the build exposed

Not design opinions — things that fell out of making the flow actually run.

**1. The editor has nowhere to put a from-scratch project.** A Code Classroom
project carries ordered instruction steps, and the editor's left-hand pane
renders them. A project you thought up yourself has none. To make the flow run
at all, a from-scratch project needs a step that is not a step
(`projectTypes.ts`). "Start from scratch" does not fit the screen it lands on,
and that is a real gap, not a prototype shortcut.

**Matching the mentor's own modal.** The type chooser is built to the real
teacher-facing "Create a new project" dialog: same three types in the same
order, the product's own descriptions, the coloured tiles, a project name
field, and Cancel / Create project in the footer. A young person and a mentor
adding a project should be doing recognisably the same thing — if the two
diverge, a mentor cannot help from memory when a child is stuck halfway.

Two deliberate departures. The question drops "for your students", which is the
only copy that could not survive the change of audience. And the browse branch
reuses the same dialog without the name field, because it is choosing a filter
rather than creating anything.

**The status vocabulary has no word for your own work.** Splitting the list
made this obvious. A project's status is "Ready for you", "Sent for feedback"
or "Complete" — and "Ready for you" means *an adult set this up and you have
not started it*, which is nonsense on something you made yourself thirty
seconds ago. Rather than show something wrong, a freshly created project
carries no tag at all. Whether it should have one, and what it would say, is a
real question this raises and does not answer.

**Every step needs a way out, and two did not have one.** The confirmation
screen offered "Open the project" and "Add another project" and nothing else,
and the project details page offered only "Start project" and "Add to a class" —
so a young person who changed their mind at either point was stuck. The
breadcrumbs look like an escape and are not; they are chrome. Both are fixed:
the confirmation is a dialog that closes back to the class, and details has a
Back. Worth remembering when adding a step — the fiction has no browser Back.

**The confirmation is deliberately celebratory.** Adding a project of your own
is the one thing in this flow a young person cannot do today, and landing it on
a quiet left-aligned panel would waste the only moment in the journey that is
genuinely theirs — so it is centred, with the project's thumbnail so the thing
they made is a thing rather than a line of text. Watch whether it reads as a
reward or as a speed bump between them and the editor.

A from-scratch project has no thumbnail, because there is nothing in it yet.
The placeholder says so rather than pretending otherwise, which makes the same
gap visible here as in the editor.

**Where the action lives.** Starting a project of your own sits inside
"Created by you", not beside the class — top right of the panel when there is
a list, mirroring the mentor's own "Add project" button, and inside the empty
state as an invitation when there is not. One action, in the section it
belongs to.

The cost is real and worth watching: a young person sitting on "Assigned to
you" is not offered it at all. Whether that loses more in discoverability than
it gains in tidiness is exactly the sort of thing a session answers and an
argument does not.

**Which section opens first.** Someone who has just made a project and lands on
"Assigned to you" cannot see the thing they made; the count going up is not
much of a clue. So the page opens on "Created by you" when there is anything in
it. That works here because anything created was created moments ago — a real
product would need to key this off recency, or a young person returning next
week would land away from newly assigned work.

**2. "Blocks, Python or Web" and the catalogue disagree.** The chooser uses
Code Classroom's words; the catalogue is labelled Scratch, Python and HTML.
Someone who picks Blocks lands on a list of things called Scratch and has to
work out that those are the same thing. Mapped in `projectTypes.ts`, where the
mismatch is visible rather than smoothed over.

**3. "Web" leads nowhere.** There is no HTML project in the fixtures, so
picking Web gives an empty list — a promise the catalogue cannot keep, after
the choice has already been made. Left in rather than designed away.

Also worth deciding before this is real: on the project details screen,
"Start project" and "Add to a class" now sit together meaning the same thing.
Two buttons, one outcome.

## What I'd want to watch in testing

- **Does anyone go looking for Code Club Projects?** The hypothesis fails if
  they do — it would mean the catalogue is not what they associate with finding
  a project, and moving it is not enough.
- **Which side of the fork they take, and whether the two read as equals.**
  If "browse" wins every time, "from scratch" may be a designer's idea of what
  a young person wants rather than a young person's.
- **The from-scratch editor.** Watch the moment someone lands in it with no
  instructions and nothing to follow. That is where the first finding shows up
  on a face.
- **Whether "my class" means anything to them.** The copy is Code Classroom's
  own — class, teacher, school — for a Saturday club in a community centre.
  Adding a project to "my class" may read as homework.
- **Which section they look at first, and whether "Created by you" is where
  they expect their own work.** Also whether the split makes the class feel
  like two places rather than one.
- **Whether a mentor would want this.** Young people adding their own projects
  changes what the mentor sees, and "Ready for review" starts meaning something
  different. This prototype does not resolve that — it makes it visible.

## Walking the other branches

The flow diagram has three decision points whose "No" branch a session would
never reach by accident: first login, not yet in a class, mentor has not set up
a project. The **Starting conditions** panel at the top of the first screen
switches them. Workbench only — it is hidden in `?full=1`, so nobody being
tested sees it.

## What we learned

Not tested yet.
