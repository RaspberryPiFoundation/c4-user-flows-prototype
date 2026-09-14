A mentor starts on Code Club Projects' own project selector, filters to what
will work in a class, and imports. The mirror of its sibling,
`out-to-projects-and-back`, which starts in Code Classroom.

Built to Sarah's flow chart, "Option 2: Code Club Projects → Code Classroom"
(Code Club account management discovery, FigJam).

## What question is this answering?

`import-mentor` — how does a mentor get a Code Club project into Code
Classroom?

Both prototypes in this lane answer that. They disagree about one thing, and
only one thing: **where a mentor starts.** Option 1 bets that Code Classroom is
the hub for a club, so the route begins there and goes out. This one bets that
Code Club Projects is the site a mentor already knows, so the route begins in
the catalogue and ends in a class.

That is the point of having two. Everything else is held identical on purpose
— same mentor (**Thabo Mokoena** at Westlands Library Code Club), same club,
same two classes, same add-to-class cards, same boundary between the products.
If a session reacts to something, it should be the starting point and not the
furniture.

**One thing is deliberately NOT the same, and it is a consequence of the
starting point.** This flow begins **signed out**. A mentor who opens Code Club
Projects to browse has usually not logged in — there has never been a reason
to, because browsing needs no account. Its sibling starts inside Code
Classroom, which you cannot reach without logging in, so it can assume an
identity from the first screen. This one cannot, and that changes what the site
is allowed to know.

## Why this approach

**The first screen is the live project selector**
(`projects.raspberrypi.org/en/projects`), and using the real page settled two
things a mocked-up home page had got wrong.

**It collapses three of the chart's boxes into one screen, and that is the
chart read correctly rather than a shortcut.** "Code Club Projects", then
"Scratch", then "Filter by 'can be used in my code classroom'" are not three
pages. On the real site Scratch is a checkbox in the **Technology** group of
the selector's filter rail — right next to where the new filter would go. A
mentor arrives, ticks Scratch, ticks the Code Classroom filter, and is looking
at their shortlist, all in one place.

**It makes Sarah's own testing assumption answerable.** Her sticky says
*"mentors will find a project based on technology over interest"*. The live
rail puts Interest and Technology side by side, so you can watch which group a
mentor reaches for first. An earlier version of this prototype sent them to a
Scratch category page, which quietly assumed the answer — you cannot observe a
choice that has already been made for you.

**A filter beats a category, and building both made that obvious.** The
sibling prototype gives compatibility a category of its own, "Code Classroom
compatible". A category defined by a constraint in another product sits oddly
beside categories defined by what they teach, and if nearly everything
qualifies it is a category doing no work. As a filter it is exactly what
filters are for: narrowing a list you already chose to browse.

**Both of Sarah's "explore in design" stickies are built, not just noted.**

- *"Wording TBD. We could also have a tag design or a way to differentiate
  which cards are compatible with Code Classroom"* — **built, then removed.**
  See below; the idea is right but the version on the card is not.
- *"If a user finds themselves on a project page and has a club connected to
  their account, can we/should we call out the ability to get started with Code
  Classroom"* — the project landing page carries a banner naming their club. It
  is the only thing in the flow connecting a mentor's club to the project in
  front of them, and it is worth asking whether it earns its place on a page
  whose whole design drives at "Start project".

## What is proposed, and what is real

Real screens, unchanged: `ProjectPage`, `EducatorClassPage`,
`EducatorProjectPage`.

Proposed — nothing like these exists:

- **One checkbox** in `ProjectSelector.tsx`. Everything else on that screen is
  the live page: the green "Find a project" band with its search box, the
  filter rail, "Showing N projects", the card grid. Cards carry an interest tag
  like the live ones, and "In a class" once a project has been added.
- The **club banner** on the project landing page, and the **"already in a
  class"** header that replaces it once the project has been added. Both only
  appear when signed in.
- Offering **"Add to a class" while signed out**, with the log-in coming after
  the intent rather than before it.
- `ProjectPage`'s "Add to a class" button — the shared screen takes an
  `onImport` prop for exactly this, and passing it is a proposal.
- `AddToClass.tsx` and `NewClass.tsx` — copied from the sibling prototype
  rather than shared, which is what this repo asks for. They follow Experience
  CS's equivalent screens.
- `ShowToStudents.tsx` — and it contradicts the live product. Same open
  question as the sibling: the real project page only offers "Hide from
  students", so a project is visible the moment it exists.

Only filter groups the fixtures can honour are in the rail. The live page also
has **PDF only** and **Hardware**; faking them would put controls in a testing
session that do nothing.

Nothing outside this folder was touched.

## Starting signed out is the most interesting thing here

It was a one-line change to `meta.ts` and it produced the sharpest findings in
either prototype.

**Signed out, Code Club Projects cannot call out a club it does not know
about.** Sarah's green sticky asks whether we should surface Code Classroom "if
a user has a club connected to their account" — and the answer is that there is
no account to connect to until they log in. So the project page says nothing
about their club on first visit. The call-out she is asking for is only
possible *after* the step most likely to lose them.

**"Add to a class" is offered anyway, and the log-in comes after the intent.**
Asking someone to log in before they have said what they want is how you lose
them, so the button is visible signed out and the sign-in is triggered by
pressing it. Whether an offer to add to a class means anything to someone the
site has not identified is a real question for a session.

**It adds a third product to the crossing.** Signing in is a Pi Accounts page,
so a mentor who started on Code Club Projects passes through Pi Accounts on the
way to Code Classroom. Three products, two of which they did not ask for. The
sign-in screen is `screens/MentorSignIn`, which is **not verified** — it is
behind a login, so it was built from the pattern and its details are probably
wrong.

**The log-in wall is now the most expensive step in the flow**, and the thing
most worth watching. It also makes the return path matter: signing in returns
them to choosing a class for the project they were looking at, not to the
catalogue. Any other behaviour here would be infuriating, and it is the kind of
detail that gets lost between a flow chart and a build.

## Why there is no "Works with Code Classroom" tag

Sarah's sticky floated it, it was built, and Divya asked whether it was
necessary. It is not, and the reasons are worth keeping:

- **It would sit on nearly every card.** A badge on the majority carries no
  information. If anything is worth marking it is the exceptions.
- **This page is shared with young people.** The selector has no idea who is
  looking, and "Works with Code Classroom" means nothing to a nine-year-old
  browsing for something to make. A mentor-only concern does not belong in a
  catalogue everyone uses.
- **It broke the cards.** The tag rendered 245px wide; at the grid's narrowest
  column a card has 192px inside its padding, so the tag dragged the card's own
  text out past its edges.

The mentor who never opens the filter rail is still covered — the project page
carries a banner naming their club, once they are signed in.

**"In a class" is not on the cards either**, for the same reason and one more.
Whether a project is already in one of *your* classes is a fact about one
mentor, and the catalogue is shared with young people; it also only matters
once you are looking at the project rather than scanning a grid. It lives on
the project page's header instead, which is where a mentor is deciding.

**The inverted version is probably the right idea**, and it is not built: say
nothing on the cards, and tell a mentor "this will not work in a class" at the
moment they try to add it. Mark the exception, at the point of action, to the
person it concerns. Worth designing if the filter survives testing.

## A design system constraint worth knowing

`.rpf-input-checkbox` carries a hardcoded `min-width: 240px`. The shared
`.cc-columns` layout fixes its rail at 260px, which leaves 212px inside a
card's padding — so **any filter rail built with `cc-columns` and checkboxes
overflows its own card.** Both prototypes in this lane hit it. Both now use a
flex rail with a 19rem basis instead, which also still stacks on a narrow
window. Worth raising upstream, or worth a wider rail variant in the shared
CSS.

## The thing to fix before this is tested properly

**`facets.ts` invents two project properties, and one of them matters.**

**Compatibility, which matters.** Sarah's sticky is clear about why the filter
should exist — *"should we only allow them to add embedded editor projects?
Think yes, we know that having separate tabs is pain for younger users"* — and
that is a per-**project** property, not a per-language one. A Scratch project
that drives a Raspberry Pi, or one that only ships as a PDF, will not run in a
class however Scratch it is.

`src/fixtures` has no such field, and fixtures are shared. So this prototype
marks one Scratch project (Rock Band) as incompatible purely so the filter and
the tag have visible work to do. **Nothing about the real Rock Band says it
would not import.** Without that invention every fixture qualifies, the filter
removes nothing, and the central mechanic of this flow cannot be tested.

The honest fix is a `usableInClassroom` field in the fixtures plus a project or
two that genuinely is not — a shared change, and a small one. Worth doing
before this goes in front of a mentor, because a filter that visibly lies is
worse than no filter.

**Interest, which does not matter much.** The fixtures carry no interest
either, so the Interest group is populated from the live page's own list with
one guess per project. Nothing in the flow branches on it; it is there so the
technology-versus-interest question can be watched at all. Being wrong here
costs nothing.

## What I'd want to watch in testing

- **Which product they open, before any screen is on offer.** Ask a mentor to
  find something for next week and watch what they reach for. That is the
  hypothesis, and it is answered before they touch either prototype.
- **Which filter group they reach for first.** Interest and Technology are side
  by side. This is Sarah's assumption, and this screen is where it gets tested.
- **Whether they open the rail at all.** Many people search instead, or just
  scroll. If the tag on the cards is doing all the work, the filter is a
  designer's answer to a problem the tag already solved.
- **Whether anything on that page says Code Classroom exists.** One checkbox,
  in a rail, on a page whose job is finding a project — in front of a mentor
  who may not know the two products connect at all.
- **Whether the club banner earns its place** on the project page, or reads as
  being told what you run when you came here to find something.
- **Whether "Add to a class" survives "Start project"**, which the page repeats
  top and bottom.
- **Whether the log-in wall loses them.** It arrives mid-browse, after they
  have found something they want. Watch for hesitation, and ask afterwards
  whether they would have bothered.
- **Whether they ever press "View your class".** It is the only button that
  leaves Code Club Projects. If nobody does, the class page is not where a
  mentor checks their work — and the crossed-out eye nobody sees is a problem.

## What we learned

Not tested yet.
