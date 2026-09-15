A copy of **Code Classroom as the club card action** (Divya Mahadevan) with one
screen restyled. The route, the fixtures, the fake latency and every other step
are unchanged, on purpose — if more than the presentation varied, a session
could not tell which change caused the reaction.

## What question is this answering?

The `onboarding-mentor` lane, but not the part about where the entry point
lives. The prototype this copies already bets on that: Code Classroom as the
primary button on the club card. This one takes that bet as settled and asks
the next question down.

**Does a mentor know what they have agreed to?**

The confirm screen is the only place a mentor is told what Code Classroom is.
They arrive from a button on a dashboard, having possibly never heard the
product name, and one press later they have a school, a club code and a class.
If that screen gets skimmed, the route succeeds on the measure it set itself —
one click to a working Code Classroom — while leaving a mentor who cannot say
what they now own.

## Why this approach

Two dense cards of prose, stacked full width, is a layout people scroll past.
So the confirm screen is rebuilt as a single centred explainer, modelled on the
Experience CS → Code Classroom interstitial that already exists in the real
products:

- **One card, not two.** Title inside it, narrow measure, floating on the page
  green. It reads as a thing to be read rather than a form to get past.
- **Three green panels instead of bullets.** One claim each, an icon, a short
  line. A bullet list invites skimming to the end; separated panels are harder
  to skip without noticing you skipped them.
- **Primary action last, bottom right.** Matching the reference. It also puts
  the button after the explanation rather than beside it.

**Rejected:** a "Learn more" link out to a marketing page, as the reference has.
It solves the comprehension problem by moving it somewhere a mentor in a club
session will not go. If the explanation cannot fit on the screen that asks for
consent, the ask is in the wrong place.

**Rejected:** a second confirm step. The one-press claim is the whole point of
the route being copied; adding a step would test a different thing.

## What is not real

- **The confirm screen does not exist in either product.** The entire thing is
  a proposal. Nothing in Code Club today offers to create a Code Classroom
  school for you.
- **There is no illustration.** The reference card carries a diagram of the two
  products handing off, between the list and the buttons. Left out for now —
  what it should show has not been designed, and an invented one would get
  reacted to in a session as though it had been. Worth deciding before this
  goes in front of anyone: the card currently explains Code Classroom in words
  only.
- Automatic setup infers **one** class from the club's session time. Westlands
  really runs a Scratch group and a Python group — the same honest limit as the
  prototype this copies.

## What I'd want to watch in testing

- **At the moment they press yes:** ask them to say what Code Classroom is
  without looking. That is the whole hypothesis, and it is the only question
  here that the original prototype does not already answer.
- **Whether the green panels get read or counted.** Three panels may just be a
  bulleted list with more furniture. If people's eyes go straight to the
  button, the restyle has not earned its keep and the finding is worth as much
  as a positive one.
- **"Creators".** The confirm card now says creators throughout — it is the
  word Code Club uses. Two places still do not: the created screen says "an
  account for each young person at your club", and Code Classroom itself will
  say students the moment a mentor arrives in it. So the handover is where the
  word changes, which is exactly where a mentor is least able to absorb it.
  Worth watching whether anyone notices they have become a teacher with
  students.
- **The word "school"**, still. A volunteer at a library is told they are
  getting a school. The card no longer glosses it — the earlier draft said
  "Code Classroom's word, not ours", which was the prototype apologising for
  the product. Without the aside the screen is a fairer test of whether the
  word actually lands, but it also means nobody is warned. This is the sharpest
  edge on the screen.

## What we learned

Not tested yet.
