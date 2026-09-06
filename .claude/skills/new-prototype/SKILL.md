---
name: new-prototype
description: Scaffold a new prototype in this repo. Use when someone wants to add a prototype, try an approach, or explore one of the flow questions in src/lanes.ts.
---

# Add a prototype

Scaffold a new prototype folder, then help the person build their flow.

## 1. Ask what you need

Ask these together, in one message. Offer the lanes as a list — do not make
them guess the ids.

- **Which lane?** `onboarding-mentor`, `onboarding-yp`, `import-mentor`,
  `import-yp`. Read `src/lanes.ts` for the question each one asks.
- **What are you trying?** One sentence. Turn it into a short slug.
- **Your name**, for `owner`.
- **What do you believe?** Their hypothesis. Push gently for something a
  testing session could disprove — "mentors will look on the dashboard first"
  rather than "improve onboarding". If they cannot answer, that is worth
  saying out loud; it usually means the idea is not ready to build.

## 2. Create the folder

Copy `src/prototypes/_template/` to `src/prototypes/<lane>/<slug>/` and fill in
`meta.ts` and the first section of `notes.md`. Leave `status` as `'sketch'` —
it is not shown anywhere, it is only there for pulling a testing shortlist
together later.

**Touch nothing else.** The registry discovers the folder on its own. If you
find yourself editing a file outside the new folder, stop — that is the one
rule this repo has.

## 3. Set the cast

Who the prototype is about goes in `meta.ts`, and everything else follows from
it. This is the decision that matters most, so make it explicitly.

```ts
cast: { piAccount: 'pi-mentor-jo' },        // a mentor
cast: { classroomStudent: 'cs-amara' },     // a young person in Code Classroom
```

- **Mentor flows:** unambiguous — a mentor holds a Pi account.
- **Young person flows:** ask. A club member usually has a Code Classroom
  student account and **no** Pi account. If the flow starts before they have
  signed in — which is the whole question in `onboarding-yp` — add
  `ownsSignIn: true` and the flow starts signed out, with autofill still
  knowing who they are.
- The two identities are independent. Being signed in to one says nothing about
  the other; Code Club Projects and Code Classroom do not share accounts.

**In the flow, derive everything from the cast. Never hardcode a club.**

```ts
const STUDENT = CLASSROOM_STUDENTS.find((s) => s.id === meta.cast?.classroomStudent)!
const CLUB = school(STUDENT.schoolId)!
```

Get this wrong and changing the cast produces a flow that fills in one club's
code and then rejects that club's usernames. See
`onboarding-yp/reference-school-code-join` for the pattern.

See `#/debug` for everyone available.

## 4. Build the flow

- Import screens from `../../../screens` and components from `../../../kit`.
  Check `src/screens/README.md` first — do **not** generate a screen that
  already exists.
- Wrap each screen in its `<Surface>`. A flow that crosses products should look
  like it crosses products.
- Wire steps with plain `useState`, as in `_template`. There is no flow engine
  and there is not going to be one.
- Use design tokens (`var(--rpf-...)`), never literal colours.
- Do not add npm dependencies.
- If a screen does not exist in the real product, that is fine — it is a
  proposal. Say so in `notes.md`, and mark it in the UI where the person can
  see it is not real.

## 5. Show them

Run `npm run dev`, open `#/p/<lane>/<slug>`, and tell them the URL. Mention
that `?full=1&autofill=0` is the version to send someone for a testing session. Point out
that it is already on the landing page in its lane, and that no shared file
changed.

Remind them to keep `notes.md` up to date — it is shown on the prototype's own
page, and it is what makes the repo worth having in six months.

## Ground rules to restate if relevant

- No real names, accounts, passwords, or anything about a real young person —
  including in screenshots shared for feedback.
- Nothing here is a commitment to build.
