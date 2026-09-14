A mentor starts in Code Classroom, goes out to Code Club Projects to browse,
and comes back with a project attached to a class.

Built to Sarah's flow chart, "Option 1: Code Classroom → Code Club Projects"
(Code Club account management discovery, FigJam).

## What question is this answering?

`import-mentor` — how does a mentor get a Code Club project into Code
Classroom?

Specifically: what if they never start on Code Club Projects at all? The bet is
that Code Classroom is where a mentor already is — the hub for their club — so
the journey is Classroom → out to Projects to browse → back into Classroom with
the project in a class.

Cast is **Thabo Mokoena** at Westlands Library Code Club. One club, so "which
club am I in?" stays out of the way, and two existing classes so "new class or
existing class?" is a real choice. The chart's own starting assumption — the
mentor is signed in and has a school — is carried by the cast rather than by a
sign-in step, which is why `ownsSignIn` is not set.

## Why this approach

The bet is about the **starting point**, not the screens. The obvious
alternative is that a mentor starts on Code Club Projects, where they have
always gone for club content, and pushes from there. That is worth its own
prototype; this one deliberately tests the opposite, because if Classroom
really is the hub then a mentor who starts on Projects has already gone the
wrong way round.

**The one thing this flow relies on that the young-person lane cannot.** A
mentor holds a single Raspberry Pi account that signs them in to *both* Code
Club Projects and Code Classroom, so leaving and coming back costs them
nothing. A club member holding only a mentor-made classroom account cannot
follow that route at all. So "out to Projects and back" is available to mentors
precisely because the identity problem is a young person's problem. That
asymmetry is the strongest argument for this flow and it is worth saying out
loud in any writeup.

## What is proposed, and what is real

Real screens, unchanged: `EducatorClassPage`, `EducatorProjectPage`,
`ProjectPage`, `ClassroomProjectEditor`.

Proposed — nothing like these exists:

- `AddProjectChoice.tsx` — **one dialog with two steps**, over the class page.
  Step 1 asks find-or-create. Answer "create your own" and the *same* dialog
  becomes the live **"Create a new project"** dialog — project name, "what kind
  of project do you want to make for your students?", and the Blocks / Python /
  Web rows with the real descriptions and tile colours.

  It started as two dialogs, the fork opening the create dialog on top of it.
  That was worth fixing and not just cosmetically: the stacking was a symptom
  of the fork **wrapping a dialog the product already has**, so the fix was to
  make it the first step *of* that dialog rather than a box in front of it.

  Two things that buys. Step 2 is now the genuine screen rather than a page
  invented to stand in for it, so the branch this prototype tests *against* is
  real. And "Back" means something — it returns to the question instead of
  dismissing one dialog to reveal another.

  Keeping the class visible behind it also means adding a project reads as
  something happening *to* this class rather than a place you go, and "back"
  out of the find branch returns to the class with the dialog open again.

  **Two deliberate departures from the live dialog.** It preselects "Blocks";
  step 1 preselects nothing, because preselecting would answer the question the
  prototype is asking. And because the design system's modal takes no
  `disabled` for its footer buttons, "Continue" with nothing chosen asks for a
  choice rather than doing nothing.

  Kept from the live dialog because it is a nice touch: the project name
  arrives as "Blocks project" and follows the selected type until the mentor
  types their own, after which it is theirs and stops moving.

  Worth knowing that select-then-confirm is not just fidelity — it is the only
  arrangement that does not bias the result. Two footer actions would make one
  option the primary button and the other the secondary, and which option a
  mentor picks is the finding.

  Tiles are flat colour with no glyph, as in `ManageClub`. The live dialog has
  small icons in them; there is no icon component in the kit for arbitrary
  tiles, and grey-boxing keeps a session about the flow rather than the artwork.

  **The alternative worth building as its own prototype:** no fork dialog at
  all. Two buttons in the Projects card header — "Add project" opening the real
  create dialog untouched, and "Find a Code Club project" beside it. That tests
  a different question. Here the import route is hidden behind "Add project", so
  a session shows whether mentors *pick* it once they are looking at it; with
  two buttons it shows whether they *notice* it, which is closer to the
  hypothesis. Rejected for this prototype rather than for good.
- `ProjectsCatalogue.tsx` — the filtered catalogue, built to match the live
  Code Club Projects category pages (`/en/technology/scratch`): green hero
  panel with a Back pill, big category title and a line of description, then a
  results count, a filter rail and a grid of cards — image band, "language -
  Level n" eyebrow, linked title, description.

  **The category itself is the proposal, and it is a different kind of category
  from the ones on the live site.** "Scratch" and "Python" describe what a
  project teaches. "Code Classroom compatible" describes what a mentor can
  *do* with it. Nothing on Code Club Projects is organised that way today, and
  it is worth asking whether it should be: a category that exists because of a
  technical constraint in another product is a strange thing to put in front of
  people who are browsing for something to teach.

  The live page's "Start a path" strip is deliberately left out — paths are a
  young person's route through a subject over weeks, not what a mentor is doing
  here, and the fixtures have no paths. The filter rail keeps only difficulty
  level, the one filter the fixtures can honour; interest and hardware are on
  the real page and are not faked here.
- `AddToClass.tsx` — picking the class, and the success card. Built to follow
  the equivalent screens in **Experience CS**, the other product that
  integrates with Code Classroom and so the nearest thing to a precedent for
  how a content product hands work to a class: one small centred card, a
  sentence on what a class is for before asking which one, the class as a
  single select labelled "School class" rather than a button per class, one
  primary action, and a success card of the same shape with a tick and one
  sentence naming what went where.

  Changed rather than copied: "unit" is Experience CS's word for a group of
  lessons, so this says project; Experience CS offers no way to create a class
  here and the chart's diamond does, so "Create a new class instead" sits under
  the select as a link rather than competing with the primary button; and
  Experience CS's mint page is its own brand colour, so these sit on Code Club
  Projects' own page colour instead of importing another product's — the card
  is told apart by its border rather than by a tint.
- all of `NewClass.tsx`.
- `ShowToStudents.tsx` — and it contradicts the live product. See finding 2.
- `ProjectPage`'s "Add to a class" button — the shared screen takes an
  `onImport` prop for exactly this, and passing it is a proposal.

`MentorSchoolHome` exists in the real product but has never been built in
`screens/` and **nobody has checked it against the real educator view.** Treat
the details as wrong.

Every screen above lives in this folder. **One change does not**: page width.
`--surface-measure` in `src/surfaces/tokens.css` and the rules using it in
`src/styles/global.css` cap a product page at 1100px, because screens read
badly stretched across a large monitor. Divya asked for it and it applies to
every prototype in the repo, not just this one — so it wants reviewing and
merging separately from this prototype rather than riding along with it.

## A design system constraint worth knowing

`.rpf-input-checkbox` carries a hardcoded `min-width: 240px`. The shared
`.cc-columns` layout fixes its rail at 260px, which leaves 212px inside a
card's padding — so **any filter rail built with `cc-columns` and checkboxes
overflows its own card.** The catalogue's rail here used to, by 6px. It now
uses a flex rail with a 19rem basis instead, which also still stacks on a
narrow window. The sibling prototype hit the same thing. Worth raising
upstream, or worth a wider rail variant in the shared CSS.

## Five things the build exposed

Not design opinions — things that fell out of making the chart actually run.

**1. "View project code" comes before there is anything to view.** The chart
orders the create branch: name it → project page → view project code → add
instructions. So at "view project code" the project has no instructions, and
the Code Classroom editor renders `project.steps[stepIndex]` with no empty
state — a project with no steps crashes it. The prototype puts a "No
instructions yet" step in rather than a fake first step, so the gap is visible
on screen. Either the chart's two boxes want swapping, or creating a project
needs to ask for instructions up front — and now that naming happens in the
live "Create a new project" dialog, that dialog is where such a question would
have to go. Which makes it a change to a shipped screen, not a new one.

**2. "Show to students" inverts the live product.** The chart ends both
branches at `[Show to students]`, with the sticky asking whether mentors
understand a project is hidden by default. But the real project page offers
**"Hide from students"** — which means a project is visible the moment it
exists. One of the two has to give. Both defaults are defensible: hidden-by-
default lets a mentor set up a session in advance; visible-by-default is one
less step to forget. Worth deciding before this is engineered, because it is a
behaviour change to a shipped product, not a new screen.

The prototype implements the chart's version (hidden by default) so the sticky's
question can actually be tested. Note the trap it creates: after importing, the
project page still only offers "Hide from students" — a mentor looking for
"show to students" will not find it where they landed.

**3. The category really is shorter than the catalogue, and the sticky's
question is testable.** "CCP page filtered by embedded editor projects" is now
read from `usableInClassroom` on each project rather than guessed from its
language — two earlier versions of this got it wrong in opposite directions,
first dropping Scratch and then excluding nothing at all.

The field and two physical computing projects (`rain-or-shine`,
`door-watcher`) were added to `src/fixtures` for exactly this. They need a
Raspberry Pi and something plugged into it, so a young person cannot open them
inside a class however well they suit a club session — which is what Sarah's
pink sticky, *"can we connect projects that aren't editor projects?"*, is
about. The catalogue says on screen that two are missing and why.

So a session can now watch the thing that matters: **what a mentor does when
the project they wanted is not there.** That was impossible while the filter
excluded nothing.

**4. The product boundary moved, and the chart is now wrong about where it
sits.** The chart puts "choose new or existing class" and everything after it
in the Code Classroom lane, so clicking "Add to a class" on Code Club Projects
carried the mentor across a product boundary mid-task, before they had
finished. Experience CS — the other product that feeds Code Classroom — does
the whole interaction on **its own side** and crosses only at "View your
class".

**Divya's call, September 2026: follow Experience CS.** So the whole
add-to-class interaction now happens on Code Club Projects — choosing the
class, creating one, and the success card — and the single crossing into Code
Classroom is the "View your class" button, which the mentor has to press. The
flow therefore has exactly one product change in it, and it is one they asked
for. **Sarah's chart still shows the old boundary and wants updating to
match.**

Two things this buys, and one it costs. It means a mentor never loses the
catalogue they were browsing, so "Find another project" is a cheap loop rather
than a return trip. It also means the chrome never changes underneath them —
which is why these steps do NOT use the Surface's own `layout="centred"`: that
mode suppresses the product's navigation, and Code Club Projects' nav
disappearing halfway through would make it look like they had left after all.

What it costs: creating a class from here is now a **write into another
product** from inside Code Club Projects. Picking an existing class is only a
read. That is a much bigger ask of engineering than the rest of this flow, and
it is the one part of the new boundary worth pushing on before anyone commits.

**5. "Success" succeeds at less than it says.** On the new-class branch the
project lands in a class with nobody in it. The mentor still has to go and add
young people, and the flow never mentions it. The screen says so rather than
claiming victory.

Two smaller ones:

- The chart says the button is **"add to my club"**; the shared screen says
  **"Add to a class"**. Code Club's word and Code Classroom's, on either side of
  one click. Worth picking one.
- The board has two overlapping **"View project code"** boxes (the second has
  no connectors attached, so it reads as a leftover), and the **"How do you want
  to create your class"** diamond has only one branch drawn. The prototype keeps
  the diamond as a single-option step rather than inventing a second answer —
  five minutes with Sarah would settle it.

## What I'd want to watch in testing

- **Where a mentor goes first, before anything is on screen.** Ask them to find
  a project for next week and watch which product they open. That is the
  hypothesis, and it is answered before they touch a prototype screen.
- **Whether "Find a project" wins because mentors want it or because it is
  first.** Neither option is preselected and neither is the primary button, so
  reading order is the only bias left. If it wins every time, swap the two rows
  round in a later session before believing the result.
- **Whether "Add to a class" survives "Start project".** The Code Club Projects
  landing page drives at "Start project", repeated top and bottom. Watch whether
  a mentor who came to import ends up starting the project instead.
- **The one crossing, and whether they take it.** Everything up to and
  including "added to Thursday Scratch group" now happens on Code Club
  Projects; "View your class" is the only button that leaves. Watch whether
  anyone presses it at all, or whether "Find another project" wins and they
  never go and look at what they built. If nobody ever crosses, the class page
  is not where a mentor checks their work.
- **What they think the category means.** Everything in the fixtures qualifies,
  so nothing on screen explains why this category exists. Ask at the end: "what
  would you expect to find in a category called Code Classroom compatible, and
  what would you expect to be missing?" If a mentor cannot answer, the category
  is doing no work for them.
- **Whether they leave "Show to students" without pressing it** — then ask what
  a young person can see right now. Do not ask whether they understood.
- **Whether the loop gets used.** "Find another project" is the only cheap way
  to set up a term of sessions in one sitting.

## What we learned

Not tested yet.
