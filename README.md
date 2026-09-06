# Code Club × Code Classroom — user flow prototypes

A shared space for exploring how Code Clubs could use Code Classroom, so the
team's thinking is visible, comparable, and shareable for user testing.

**Live site:** https://raspberrypifoundation.github.io/c4-user-flows-prototype/

Scope comes from
[digital-code-club#1205](https://github.com/RaspberryPiFoundation/digital-code-club/issues/1205).

## How it is organised

The landing page is grouped by theme, with one "lane" per question:

| Theme | Lane | On the page |
| --- | --- | --- |
| Onboarding | `onboarding-mentor` | For mentors |
| Onboarding | `onboarding-yp` | For young people |
| Importing projects | `import-mentor` | For mentors |
| Importing projects | `import-yp` | For young people |

The lanes are defined in [`src/lanes.ts`](src/lanes.ts) — the single place to
add, rename, or reorder them. Labels are deliberately short; the framing and
context for each question belongs in the story and in each prototype's own
notes, not on this page.

## Adding a prototype

In Claude Code, run:

```
/new-prototype
```

It asks which lane, what you are trying and what you believe, then scaffolds
the folder and opens it. Or copy `src/prototypes/_template/` by hand.

Either way the prototype is discovered automatically and appears on the landing
page in its lane — **no shared file needs to change**, which is what lets
several people build at once without conflicting.

Two worked examples to copy from, one per audience:

- `onboarding-mentor/reference-manage-club-route`
- `onboarding-yp/reference-school-code-join`

Both are real click-throughs. See [`src/prototypes/README.md`](src/prototypes/README.md).

The lane and slug come from the folder path, so they can never disagree with
where the file actually lives.

### The one rule

**Prototypes never modify shared code.** If a shared screen does not do what
you need, pass a prop — or copy it into your own folder and change it there.
Duplication is cheap here; coupling means your change silently alters someone
else's prototype.

## URLs

| URL | What |
| --- | --- |
| `#/` | Landing page, listing every prototype by lane |
| `#/kit` | Component gallery — everything you can build from |
| `#/screens` | Base screens from the real products, with their error states |
| `#/debug` | All the fake data |
| `#/p/<lane>/<slug>` | One prototype, linkable and shareable |
| `#/p/<lane>/<slug>?full=1` | The same prototype with no workbench chrome |
| `#/p/<lane>/<slug>?full=1&autofill=0` | Ready for a testing session: no chrome, nothing pre-typed |

Routing is hash-based so deep links work on GitHub Pages with no server config.

## Ground rules

- Nothing here is saved, and nothing here is a commitment to build.
- No real account details or passwords, and no real information about a young
  person — including in screenshots shared for feedback.
- All accounts, classes, projects, and names are made up.
- Copy and labels are unreviewed placeholders.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

New to this? [`SETUP.md`](SETUP.md) walks through it from installing Node, and
assumes no previous experience of running code.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages. No secrets or API
keys are needed.

One-time repo setup: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

The site is shared by link, not meant to be found by search, so `index.html`
carries a `noindex, nofollow` robots tag. A `robots.txt` would not work here —
GitHub Pages only serves one at the domain root, which this project site does
not control — so keep the meta tag in place.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/lanes.ts` | The flow questions — themes and lanes |
| `src/prototypes/` | One folder per prototype. **This is where you work** |
| `src/prototypes/_template/` | Copy this to start. A working two-screen journey |
| `.claude/skills/new-prototype/` | The `/new-prototype` skill |
| `SETUP.md` | Getting set up, from scratch |
| `CLAUDE.md` | The rules, for anyone's Claude |
| `DESIGNS.md` | Where each screen's design came from |
| `src/prototypes/registry.ts` | Auto-discovers prototypes. Nothing to edit |
| `src/kit/` | Everything you build screens from — see its own README |
| `src/screens/` | Reusable screens from the real products — see its own README |
| `src/surfaces/` | Product chrome and per-product design tokens for the four products |
| `src/fixtures/` | Fake clubs, schools, classes, people and projects |
| `src/session/` | The fake two-identity sign-in state |
| `src/Home.tsx` | The landing page |
| `src/KitGallery.tsx` | The `#/kit` component gallery |
| `src/PrototypeHost.tsx` | Renders one prototype, with an error boundary |
| `src/App.tsx` | Routes |
| `src/components/Layout.tsx` | Neutral page chrome (header and footer) |
| `src/styles/tokens.css` | Design tokens from the Code Club design system |
| `src/styles/global.css` | Shell, typography, and hub page styles |
