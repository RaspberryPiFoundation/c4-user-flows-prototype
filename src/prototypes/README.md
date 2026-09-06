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

It lives in the URL, so you can send someone a link that opens clean:

```
#/p/onboarding-yp/reference-school-code-join?full=1
```

Worth doing before any testing session, along with turning autofill off. Nobody
being tested should be looking at a bar saying "prototype workbench" or a
dropdown of invented people.

## Who you are, and autofill

The bar at the top does two things: signs someone in, and **fills their details
into any sign-in screen you meet**, so a demo does not start with retyping a
six-digit code.

Picking someone and being signed in are separate on purpose:

- **picked** — who you told the workbench you are. Survives signing out.
- **signed in** — who the fiction currently has signed in.

A flow that signs people in itself calls `startSignedOut()` on mount: the
fiction starts empty, but the autofill still knows who you picked. Set
`ownsSignIn: true` in your `meta.ts` and the bar says so rather than looking
like it is in charge when it is not.

Read `autofill` from `useSession()` and seed your fields from it — see
`onboarding-yp/reference-school-code-join`.

**Turn autofill off before a real testing session.** Watching a young person
type a six-digit code off a board is often the thing you are there to see.

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
