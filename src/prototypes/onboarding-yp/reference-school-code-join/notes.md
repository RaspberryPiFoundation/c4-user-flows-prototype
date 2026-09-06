A reference prototype: built to show the pattern, not because this is the
answer. Copy it, argue with it, delete it.

## What question is this answering?

*How do we support young people accessing Code Classroom for the first time in
a Code Club?* — walked through exactly as it works today, with nothing
improved, so we can see what the baseline actually costs.

## Why this approach

Before designing anything, it is worth watching the real route end to end. Every
screen here exists today. If it turns out to be fine, several proposed variants
become unnecessary.

What I expect to go wrong, in order:

1. **"Are you a teacher or a student?"** — a club member is neither. In a
   library on a Saturday, "student" may not obviously mean them.
2. **The school code is six digits.** `48-21-06` read off a board and typed by a
   nine-year-old, with hyphens they may or may not include. Not memorable, not
   guessable, and a single transposition sends them to an error.
3. **The sign-in screen shows the code, not the club name.** "School code:
   48-21-06" does not tell a young person they are in the right place.
4. **Google sign-in sits on the same screen.** A club member has no school
   Google account, so half the screen is a question they cannot answer.

## What I'd want to watch in testing

Hand a young person a card with the code on it and say nothing else. Time it.
Count how many times they look up for help. The mentor is the real interface
here, and how often they are needed is the measure.

Also: what happens with a typo. That path matters more than the happy one.

## What we learned

Not yet tested.
