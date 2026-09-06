# prototypes

**This is where you work.** Everything else in `src/` is shared.

## Adding one

```
/new-prototype
```

in Claude Code. It asks which lane, what you are trying, and who you are, then
scaffolds the folder and opens it.

Or by hand: copy `_template/` to `<lane>/<your-slug>/` and edit the three files.
Lane must be one of `onboarding-mentor`, `onboarding-yp`, `import-mentor`,
`import-yp` — see [`src/lanes.ts`](../lanes.ts).

## The one rule

**Never modify anything outside your own folder.** Not `kit/`, not `screens/`,
not another prototype. If a shared screen does not do what you need, pass a
prop — or copy it into your folder and change it there.

Duplication is cheap in a prototype repo. Coupling means your change silently
alters someone else's work, and four people building at once turns that into a
daily problem.

## What goes in a folder

| File | What for |
| --- | --- |
| `meta.ts` | Title, owner, hypothesis, status. Discovered automatically |
| `prototype.tsx` | Your flow. Default export, no props |
| `notes.md` | Your thinking. Shown on the prototype's own page |

`notes.md` is the part that makes this repo worth having in six months. A
prototype without notes is a screenshot.

## Showing a prototype to someone

Hit **Full screen** in the banner. The workbench chrome disappears and only the
prototype is left, filling the window. `Esc` or the button in the corner brings
it back.

Everything about how a prototype is shown lives in the URL, so a link is all
you need to send:

| | |
| --- | --- |
| `?full=1` | Hide the workbench chrome. Just the prototype, full window |
| `?autofill=0` | Do not fill in sign-in screens |

For a testing session, both:

```
#/p/onboarding-yp/reference-school-code-join?full=1&autofill=0
```

That opens clean, with nothing pre-typed — so you can watch someone read a
six-digit code off a board and type it, which is usually the thing you are
there to see.

## Who your prototype is about

Set `cast` in your `meta.ts`:

```ts
cast: { classroomStudent: 'cs-siobhan' },   // a young person
cast: { piAccount: 'pi-mentor-jo' },        // a mentor
```

The workbench signs them in before your flow renders, and fills their school
code, username and password into any sign-in screen you show — so a demo does
not start with retyping six digits.

If your flow does the signing in itself, add `ownsSignIn: true`. It then starts
signed out, but the autofill still knows who your cast is.

**Derive everything else from the cast. Do not hardcode a club.**

```ts
const STUDENT = CLASSROOM_STUDENTS.find((s) => s.id === meta.cast?.classroomStudent)!
const CLUB = school(STUDENT.schoolId)!
```

Then changing one line in `meta.ts` moves the whole story to a different young
person at a different club. The first version of this repo let a viewer pick the
person from a bar at the top, and every author would have had to write a flow
that coped with eleven students across three clubs. The first one written did
not. Hence: the author decides, in one place.

**Turn autofill off before a real testing session** with `?autofill=0`.
Watching a young person type a six-digit code off a board is often the thing you
are there to see.

## Wiring screens together

Plain `useState`, as in `_template`. There is no flow engine and there is not
going to be one — five small switches you can read beat one clever thing five
people work around. If it turns out every prototype writes the same wiring,
that is when a helper earns its place.

## Worth reading first

- `#/screens` — the eleven base screens, with their error and empty states
- `#/kit` — everything you build from
- `#/debug` — the fake clubs, classes, people and projects
- [`src/screens/README.md`](../screens/README.md) — what the screens assume, and
  where the real products fight against Code Club
