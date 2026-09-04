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

Prototypes are **not wired up yet**. Every lane currently shows an empty state,
which doubles as a visible to-do list. When prototypes are added, each will
declare its lane and appear inside it.

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

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages. No secrets or API
keys are needed.

One-time repo setup: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/lanes.ts` | The flow questions — themes, lanes, audiences |
| `src/Home.tsx` | The landing page |
| `src/components/Layout.tsx` | Neutral page chrome (header and footer) |
| `src/components/Alert.tsx` | Wrapper over the design system Alert |
| `src/styles/tokens.css` | Design tokens from the Code Club design system |
| `src/styles/global.css` | Shell, typography, and lane card styles |
