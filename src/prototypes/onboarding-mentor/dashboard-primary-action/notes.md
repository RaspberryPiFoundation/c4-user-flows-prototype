Code Classroom as the primary button on the club card, and a setup that asks
one question and no more before dropping the mentor into Code Classroom itself.

## What question is this answering?

*How do we support mentors to set up Code Classroom for their clubs?* — the
opposite end of the range from `reference-manage-club-route`. That one adds a
row to a menu two clicks deep. This one puts Code Classroom on the surface a
mentor already lands on, and takes the configuration away.

Two claims stacked on top of each other, deliberately, so a session can pull
them apart:

1. **Placement.** Primary button on the club card, not a row in Manage Club.
2. **One question, no form.** The mentor is asked whether to go ahead, and
   asked nothing else — no naming a school, no choosing whether the club is a
   school or a class, no class names. Code Club already knows the club name,
   the venue and the session time, so Code Classroom is built from those.

They then land in **Code Classroom as it is today**: the real class page, in the
empty state a mentor who has just been set up would find. No proposed home page
in between. Code Classroom has no educator home to land on — you arrive at a
class and move by breadcrumb — and this version tests the setup rather than
inventing somewhere nicer to arrive.

**Why a confirmation and not a silent one-click setup.** The first version of
this went straight from the dashboard into creating things. That is faster, and
it is the wrong trade: "Code Classroom" is a product name rather than a
description, so a mentor pressing that button does not yet know what they are
agreeing to, and creating a school and a code in their name without asking is
not a small thing to do to someone. The confirmation is where the explaining
happens — and it is a fair place to watch whether the explanation lands, since
a mentor who reads it and says "not now" has told us something.

## Why this approach

Manage Club is club administration: events, volunteer lists, subscriber lists,
profile editing. A mentor thinking "what are we doing on Thursday?" is not in
that menu. The club card is where they already are, and it already answers
"which club?" — Jo manages two, and pressing a button on a card says which one
without a chooser.

**What this costs, and it is a real cost:** "Create an event" is off the club
card entirely — not demoted, removed. Events are how a club fills its sessions
and how Code Club counts activity, and this variant takes the card's top slot
for Code Classroom instead of sharing it. Deliberately the strong version: a
card with both buttons on it hedges, and hedging is harder to react to in a
session. If a mentor reaches for events and cannot find them, that is the
finding.

**What I deliberately rejected:**

- *A form.* Naming a school, choosing whether the club is a school or a class,
  picking class names — every one of those questions is answerable from data
  Code Club already holds, and each one is a place to drop out.
- *Explaining Code Classroom on the dashboard.* The club card says only "Set up
  Code Classroom". All the explaining is on the confirmation, one press later,
  so the dashboard stays a dashboard — and so we can still see whether the bare
  label is enough to get a mentor to press it.
- *Setting up all of a mentor's clubs at once.* Jo's two clubs are in different
  countries and run differently. One at a time.
- *A "don't ask me again" or a skip.* The confirmation is the only place a
  mentor is told what this is. Letting them past it faster would optimise the
  second run at the cost of the first.

## What the setup cannot do, and why that matters most

Setting up creates the school, the club code and one class. It does **not**
create accounts for the young people — nothing on codeclub.org knows who they
are. In Code Classroom, the adult creates every student account by hand, with
no email and no self-signup, and password resets come back through the mentor.

So this route makes the first click fast and leaves the actual work untouched.
The success screen says so in one line, and after that a mentor lands on an
empty class page with no young people in it and nothing telling them that
creating the accounts is now their job.

That is the real product, and it is the least comfortable part of this flow.
An earlier version of this prototype invented a Code Classroom home page that
led with "Nobody can join yet" to soften the landing; it has been taken out, so
what a session sees is the drop as it actually is. Whether a mentor needs
something there is the question the next version should answer — with evidence
from watching this one, rather than by guessing as I did.

If the finding from testing is "the setup was easy and then I got stuck", that
is this prototype doing its job.

## What is real and what is not

**No screen in this flow is labelled as a proposal.** Nothing says "this screen
does not exist". Every page reads as if it shipped, so a mentor in a session
reacts to a product rather than to a prototype — which is the only way to find
out whether the primary button gets pressed unprompted, or whether the
confirmation is enough to say yes to.

**That makes this table the only record of what is invented. It has to be
right, and it has to be read out before anyone is shown this.** Nobody should
leave a session, or a review, believing any of the middle three rows exists.

| | |
| --- | --- |
| The dashboard, minus the club card buttons | Real |
| Code Classroom on the club card | **Proposed** |
| "Create an event" missing from the card | **Proposed** — it is on the live card |
| The confirmation, the loading screen and "your account has been created" | **Proposed** — nothing like them exists, and no such setup exists to run |
| The Code Classroom class page you land on | Real, in its empty state |

**One piece of copy to argue about:** "Your Code Classroom account has been
created". A mentor does not get a new account — Code Classroom uses the same
Raspberry Pi account they already sign in to Code Club with, and what is
actually created is a school, a code and a class. The success screen says the
line and then says that underneath, because "account" is the word a mentor is
likely to use and this repo exists partly to find out where the products'
language and mentors' language part company. If a mentor comes away thinking
they now have a second login, that is worth catching here.

`DashboardWithClassroom.tsx` is a copy of the shared `MentorDashboard` with the
card actions reordered. Copied rather than propped, because reordering the
actions *is* the hypothesis — the shared screen stays as the live product.

## Known cheats

- **One class.** Setup names one class from the club's session day
  ("Thursday club"), and that is the class the mentor lands in. Westlands
  actually runs a Scratch group and a Python group, so for that club the setup
  is already wrong on day one, and there is nowhere in this flow to fix it.
- **A club that is a school.** The cast is Jo, who runs two community clubs, so
  the club maps cleanly onto a Code Classroom "school". Nadia at St Aidan's
  already has a Code Classroom account for timetabled lessons, and for her the
  club is a *class* inside an existing school. Setup as built here would
  cheerfully create her a second school. Not modelled — change the cast to
  `pi-mentor-nadia` and the flow will confidently do the wrong thing, which is
  the next version of this prototype.
- **"School".** The confirmation tells a library club it is getting "a school
  called Westlands Library Code Club", and the breadcrumb says "Your school".
  Kept, per the repo's copy rule. Watch for the double-take.

## What I'd want to watch in testing

- Given the dashboard and no instructions, does a mentor press the primary
  button? "Code Classroom" is a product name — do they expect something
  irreversible?
- **Do they read the confirmation, and can they say what Code Classroom is
  afterwards?** Ask them to explain it back before they press yes. If the
  explanation does not survive being repeated, the copy is the problem, not the
  placement.
- Does anyone say "not now"? Why — and what would have made it a yes?
- Do they notice the club code on the confirmation, or scroll past it? It is
  shown twice before they arrive and nowhere afterwards, and it is the thing
  they have to read out loud in the room.
- **What do they do first on the class page?** They land on an empty class with
  no young people and no projects. Do they go looking for how to add people, or
  wait to be told, or assume something went wrong?
- At what point do they realise they have to create an account for every young
  person? Compare against how long they think setup took.
- Ask a mentor to create an event, at the end. The card no longer offers it —
  do they find it in Manage Club, or do they conclude it is gone? If nobody
  misses it, that is worth knowing too.
- Run it against `reference-manage-club-route` with different mentors and ask
  where they looked first, before showing them either.

## What we learned

Not yet tested.
