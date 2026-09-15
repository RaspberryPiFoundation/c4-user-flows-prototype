# Where the designs live

The screens in `src/screens/` were built from these. Recorded so nobody has to
hunt, and so it is clear what is real and what is inferred.

You need a Figma seat with Dev Mode access to open the Figma links.

| Product | Source | Used for |
| --- | --- | --- |
| Code Club | [Code Club — Dashboard](https://www.figma.com/design/DDWBZM3jcxyWKqq1uk32g2/Code-Club---Dashboard?node-id=12985-33836) | `MentorDashboard` |
| Code Club | [Manage Club](https://www.figma.com/design/DDWBZM3jcxyWKqq1uk32g2/Code-Club---Dashboard?node-id=12985-34452) | `ManageClub` |
| Code Club Projects | [Projects site — Designs](https://www.figma.com/design/2XzRDyXtthyzeNMZtdChTQ/Projects-site---Designs?node-id=11981-5649) | `ProjectPage` |
| Code Club Projects | [Live blocks editor](https://projects.raspberrypi.org/en/projects/editor-neil-the-seal/editor) | `ProjectEditor` |
| Code Classroom | [Young people creating their own projects (FigJam)](https://www.figma.com/board/EuQrBiiwuk5wTc5NJ0ip7q/Young-people-students-can-create-their-own-projects-in-Code-Classroom?node-id=67-49) | `EducatorClassPage`, `EducatorProjectPage`, `YoungPersonSchoolHome`, `YoungPersonClassPage`, `ClassroomProjectEditor` |
| Code Classroom | [Code Editor — Designs, student user flow](https://www.figma.com/design/SrINjD1MCT6VWYf1Yc9fV1/Code-Editor---Designs?node-id=19655-360604) | Background on the Google SSO join route |
| Code Classroom | [Code Editor — Designs, "Individual class"](https://www.figma.com/design/SrINjD1MCT6VWYf1Yc9fV1/Code-Editor---Designs?node-id=7355-37981) | `EducatorClassPage`, and the Code Classroom page furniture — title band, breadcrumb, footer |
| Code Classroom | [Code Editor — Designs, "Dashboard Owner"](https://www.figma.com/design/SrINjD1MCT6VWYf1Yc9fV1/Code-Editor---Designs?node-id=6759-78797) | `EducatorSchoolHome` |
| Pi Accounts | Live: classroom.raspberrypi.org/login | `RoleChooser`, `SchoolCodeEntry`, `StudentSignIn` |

## Notes for anyone pulling from these

- **The Code Classroom student login is served by my.raspberrypi.org**, badged
  "Code Classroom". Even signing in crosses a product boundary.
- **The documented Google SSO join flow is largely a dead end for clubs.** It
  needs a school Google account, which a club member will not have.
- **The FigJam images are screenshots, not components.** Screenshot the node
  rather than trying to extract text.
- **The blocks editor is in a shadow DOM**, so page-text extraction will not
  reach it. Screenshot it.
- **The real editor cannot load Scratch from here, and the blocker is not in
  this repo.** `editor-ui` embeds fine as a web component and Python runs
  locally through Pyodide, but Scratch loads in an iframe keyed to a project
  the editor API holds, and `editor-api.raspberrypi.org` answers with
  `Access-Control-Allow-Origin: https://projects.raspberrypi.org`. So the
  project fetch is refused from localhost and from wherever this deploys. It
  would need the editor team to allow this prototype's origin. Until then the
  blocks editor is `EditorCanvas`, drawn from a screenshot of the Neil the Seal
  starter.
- **`MentorSignIn` is not verified** — it is behind a login and was built from
  the pattern. Correct it if you can see the real thing.
- **The Code Classroom pages are two bands.** A white block carrying the
  breadcrumb, title, description and page actions, then the content on
  `#fbf9f6` below. Both values come from the Code Editor file
  (`editor-color-layer-accent`, `editor-color-theme`) and replace what were
  guesses in `surfaces/tokens.css`.
- **The topbar logo is still the words "Raspberry Pi Foundation".** The designs
  use the colour wordmark. Nothing in this repo ships an image asset yet, so
  this is the one piece of that chrome not reproduced.
