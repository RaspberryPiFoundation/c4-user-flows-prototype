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
| `RoleChooser` | Code Classroom | Yes | Yes |
| `SchoolCodeEntry` | Pi Accounts, badged Code Classroom | Yes | Yes |
| `StudentSignIn` | Pi Accounts, badged Code Classroom | Yes | Yes |
| `MentorSignIn` | Pi Accounts | Yes | **No** — built from the pattern |

"Verified" means someone has looked at the real screen. `MentorSignIn` is
behind a login, so its details are probably wrong; correct it if you know
better.

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
