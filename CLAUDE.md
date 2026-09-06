# Working in this repo

Prototypes exploring how Code Clubs could use Code Classroom. Nothing here
ships. Read `src/prototypes/README.md` before writing any prototype code.

## The one rule

**Never modify anything outside the prototype folder you are working in.** Not
`kit/`, not `screens/`, not `surfaces/`, not another prototype. If a shared
screen does not do what is needed, pass a prop — or copy it into the prototype
folder and change it there.

Duplication is cheap here. Coupling silently changes someone else's work, and
several people build in this repo at once.

## Before you generate anything

- **Check `src/screens/README.md` and `src/kit/README.md` first.** If a screen
  or component exists, import it. Generating a new sign-in page from a Figma
  frame is how a site ends up with six different buttons.
- Use design tokens — `var(--rpf-...)` — never a literal colour or px font size.
- Do not add npm dependencies.
- Wrap each screen in its `<Surface>`, so a flow crossing products looks like
  it crosses products.
- Wire steps with plain `useState`. There is no flow engine and there is not
  going to be one.

## Deriving from the cast

A prototype says who it is about in `meta.ts` (`cast`). Everything else follows
from that — never hardcode a club:

```ts
const STUDENT = CLASSROOM_STUDENTS.find((s) => s.id === meta.cast?.classroomStudent)!
const CLUB = school(STUDENT.schoolId)!
```

Get this wrong and changing the cast produces a flow that fills in one club's
code and then rejects that club's usernames.

## Two identities, not one

Code Club Projects uses a standalone Pi account. Code Classroom uses a
mentor-created student account. **They are unconnected.** A young person in a
club usually has a classroom account and no Pi account, and being signed in to
one says nothing about the other. Any flow that assumes a bridge between the
two products is modelling something that does not exist.

## Copy

Screens use the real products' wording — "teacher", "student", "school code" —
even where it fits a volunteer-run club badly. That mismatch is a finding to
test, not a bug to fix. The one exception is documented in
`src/screens/README.md`.

## Never

- Real names, accounts, passwords, or anything about a real young person —
  including in screenshots shared for feedback.
- Real API calls. Fake latency with `setTimeout` where it matters.
- Presenting a proposed screen as though it exists. Say so in `notes.md`.

## Checks

`npm run build` type-checks and builds. It must pass before a pull request
merges. There are no unit tests and there should not be.
