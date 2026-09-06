# Setting up

You need this once. After that, adding a prototype takes minutes.

No previous experience of running code is assumed. If a step does not do what
it says here, that is worth reporting — it means the instructions are wrong,
not you.

## 1. Install Node

Node is the thing that runs this site on your own machine.

Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating), then in a
terminal:

```bash
nvm install
```

Run from inside this folder, that reads `.nvmrc` and installs the right
version. If you already have Node, `node -v` should print `v20` or higher.

## 2. Get the code

```bash
git clone https://github.com/RaspberryPiFoundation/c4-user-flows-prototype.git
cd c4-user-flows-prototype
npm install
```

`npm install` takes a minute or two the first time and prints a lot. Warnings
are normal; errors are not.

## 3. Run it

```bash
npm run dev
```

Open the address it prints — usually http://localhost:5173. You should see the
prototype landing page. Leave this running while you work; the page updates as
you save.

Press `Ctrl+C` in the terminal to stop it.

## 4. Add a prototype

Open this folder in Claude Code and run:

```
/new-prototype
```

It asks which lane you are working in, what you are trying, and what you
believe. Then it makes the folder and opens it, and you can describe what you
want built.

Have a look at [`src/prototypes/README.md`](src/prototypes/README.md) first —
it is short, and the one rule in it matters.

## Showing someone your prototype

Send them a link with `?full=1&autofill=0` on the end:

```
#/p/onboarding-yp/reference-school-code-join?full=1&autofill=0
```

That hides everything belonging to the workbench and leaves the sign-in fields
empty, so you can watch someone actually type — usually the thing you are
there to see.

Once your work is on `main` it is on the live site, so the same link works for
anyone.

## When it breaks

**Something fails during `npm install`, or the site will not start.**

```bash
rm -rf node_modules
npm install
```

That fixes most of it.

**The page is blank, or shows an error.** Open the browser console
(`Cmd+Option+J` on a Mac) and look at the first red line. If it names a file in
your prototype folder, that is where to look. One prototype crashing shows a
contained error rather than breaking the site for everyone.

**Still stuck.** Ask in the team channel with what you ran and what it printed.
Nobody here will mind, and a step that trips one person will trip the next.
