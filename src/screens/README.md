# screens

The parts of the real products a prototype can reuse, so nobody rebuilds a
sign-in page from scratch.

```tsx
import { StudentSignIn } from '../../screens'
```

**See them all at `#/screens`**, with their error states, in their product
chrome.

## Rules

- **Screens are dumb.** Props in, callbacks out. No screen decides what comes
  next — your prototype owns the sequencing. That is what lets two variants
  disagree about the order while sharing the same screens.
- **A screen that does not exist in any product is not a base screen.** It is a
  decision point, and it belongs in your prototype folder. If three prototypes
  converge on the same invention, that is when it earns a place here.
- **The copy is the real copy.** Nothing is softened for Code Club. See below.
- **Do not edit this folder.** Pass a prop, or copy the screen into your
  prototype and change it there.

## What's here

| Screen | Surface | Exists today | Verified |
| --- | --- | --- | --- |
| `MentorDashboard` | Code Club | Yes | Yes |
| `ManageClub` | Code Club | Yes | Yes |
| `RoleChooser` | Code Classroom | Yes | Yes |
| `SchoolCodeEntry` | Pi Accounts, badged Code Classroom | Yes | Yes |
| `StudentSignIn` | Pi Accounts, badged Code Classroom | Yes | Yes |
| `MentorSignIn` | Pi Accounts | Yes | **No** — built from the pattern |
| `EducatorClassPage` | Code Classroom | Yes | Yes |
| `EducatorProjectPage` | Code Classroom | Yes | Yes |
| `YoungPersonSchoolHome` | Code Classroom | Yes | Yes |
| `YoungPersonClassPage` | Code Classroom | Yes | Yes |
| `ProjectPage` | Code Club Projects | Yes | Yes |
| `ProjectEditor` | Code Club Projects | Yes | Yes |
| `ClassroomProjectEditor` | Code Classroom | Yes | Yes |

"Verified" means someone has looked at the real screen. `MentorSignIn` is
behind a login, so its details are probably wrong; correct it if you know
better.

## Error states

Errors use the design system `Alert`, wrapped in `role="alert"` so they are
announced. The screens do not also mark the individual field — if a variant
wants that, pass a short message to the input's own `error` prop as well as
showing the alert.

## Code Classroom has no navigation

You move around Code Classroom entirely by breadcrumb — "Your school /
Divya's test class / Python test project". There is no nav bar, so
`<Surface id="classroom" breadcrumbs={[...]} />` is how a screen says where it
is. Get the breadcrumb wrong and a young person has no way to tell where they
are.

Two structural facts worth designing around:

- **Projects are created by the adult.** "Projects are shared with students and
  contain starter code created by a teacher." A young person cannot start one
  of their own — which is a different model from Code Club Projects, where they
  browse and pick, and it is exactly what the Code Classroom FigJam is asking
  about.
- **A mentor only sees work that has been SAVED.** "Only students who have
  saved their project will appear here." Walking round a room, a mentor cannot
  tell who has started and got stuck from who has not started at all.

## Where mentor onboarding actually starts

`MentorDashboard` and `ManageClub` are the codeclub.org screens a mentor
already uses, so they are the realistic places to surface Code Classroom.

`ManageClub` takes `items` with **no default**, so a prototype has to say what
the menu contains rather than inherit an assumption. `liveManageClubItems()`
gives you the six rows that exist today — start from those and add, and mark
anything you add as `proposed`.

Before adding a row, notice what it would sit among: Events, Volunteers Lists,
Pending volunteers, Subscriber Lists, and two profile options. All club
administration, none of it teaching, and two clicks deep from the dashboard.
Cheapest is not automatically best.

## One place we deliberately do not match the live product

The live Code Club dashboard says **"View Dojo Profile"** and **"Edit Dojo
Profile"** — CoderDojo's word inside Code Club's own product. These screens say
**"Club"** instead.

This is the one intentional departure from the "copy is the real copy" rule,
and the distinction matters. "Teacher", "student" and "school code" are Code
Classroom's real language creating a real tension for clubs, so we keep them
and let testing show what happens. "Dojo" is just wrong, it is Code Club's own
product to fix, and leaving it in would only collect feedback nobody needs.

If you are comparing a prototype against the live site and spot the difference,
that is why.

## The same editor, two different products

`ProjectEditor` (Code Club Projects) and `ClassroomProjectEditor` (Code
Classroom) share a layout and differ in the ways that matter:

| | Code Club Projects | Code Classroom |
| --- | --- | --- |
| Saving | Blocked behind "log in to save" | Just works |
| Finishing | Nothing happens | "Ready for review" hands it to the mentor |
| Getting work out | Download the files | Mentor sees it, gives feedback |

Put them side by side in a testing session and the identity problem is visible
without anyone explaining it: the same child in the same session can keep their
work in one place and not the other.

They are two screens rather than one screen with a mode, because those
differences are the finding and collapsing them into a prop would bury it.

## Saving is where the two identity systems collide

`ProjectEditor`'s save panel is the most important screen in this folder for
the import lane, and it is the real copy from the live editor:

> Log in to save your progress. With a Raspberry Pi Account you can save your
> code and project steps progress.

A young person in a club holding only a Code Classroom student account **cannot
save here**. Their options are to self-register a standalone Pi account their
mentor cannot see, or to download the files and carry them somewhere else.
Pass `signedIn={false}` to show it — that is the default state for a club
member, not an edge case.

`ProjectPage` takes an optional `onImport`. Nothing like it exists on the live
site or in the Projects site designs, so a prototype showing it is
**proposing** something. Say so in your notes.

Worth noticing before you add anything to that page: the whole design drives at
one action, "Start project", repeated top and bottom. And there is no mention
of a class, a school or a mentor anywhere on it — a young person arriving here
has no idea Code Classroom exists.

## Why the copy is not softened

These screens say "teacher", "student", "your school" and "school code". A
volunteer mentor is not a teacher, a club member is not a student, and a
library is not a school. Rewriting that would hide the problem — and watching
someone hesitate at it in a testing session is the finding.

Three things worth knowing before you design around them:

- **The student sign-in is a Pi Accounts page**, badged Code Classroom. Even
  the sign-in crosses a product boundary.
- **It offers a school Google account as well as a username.** A club member
  will not have one, so half that screen is a question they cannot answer.
- **Password recovery runs entirely through the mentor** — "ask your teacher to
  reset it for you". No email, no self-service. In a volunteer-run club with
  rotating mentors, that is a way to lose a young person for a whole session.
