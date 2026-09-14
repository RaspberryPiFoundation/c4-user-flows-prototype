import type { Project } from './types'

// Code Club Projects, shaped the way importing actually works: an ordered set
// of markdown instruction steps PLUS a starter code template. A prototype that
// treats an import as "copy a link" is modelling the wrong thing.
//
// Titles are invented. Step text is short but real markdown, so a screen that
// renders it has something honest to lay out — headings, lists, inline code.

export const PROJECTS: Project[] = [
  {
    id: 'space-talk',
    title: 'Space Talk',
    language: 'Scratch',
    ages: '7–11',
    level: 1,
    intro: [
      "Create a space scene with characters that 'emote' to share their thoughts or feelings.",
      '',
      'In Scratch, characters and objects are called **sprites**, and they appear on the **Stage**.',
      '',
      'You will:',
      '',
      '- Add sprites and a **backdrop** to set up your project',
      '- Click on sprites to make them communicate using `Looks` and `Sound` code blocks',
      '- Use the **Paint editor** to change a **costume**',
    ].join('\n'),
    landingTask: {
      title: 'Play',
      body: [
        'Click on each sprite to see what they do.',
        '',
        'What happens if you click on one sprite and then quickly click on another sprite?',
      ].join('\n'),
    },
    steps: [
      {
        title: 'What you will make',
        body: [
          'You are going to make an **animated conversation** between two aliens.',
          '',
          'You will learn how to:',
          '',
          '- Add characters, called *sprites*',
          '- Make them speak to each other',
          '- Change the background',
        ].join('\n'),
      },
      {
        title: 'Add your first alien',
        body: [
          'Click **Choose a Sprite** and pick any alien you like.',
          '',
          'Drag your alien to where you want it to start.',
        ].join('\n'),
      },
      {
        title: 'Make them talk',
        body: [
          'Add a `say` block to your alien, and change the words to whatever you want them to say.',
          '',
          'Click the green flag to try it out.',
        ].join('\n'),
      },
    ],
    starterCode: '// Scratch starter project — 2 sprites, 1 backdrop\n',
  },
  {
    id: 'rock-band',
    title: 'Rock Band',
    language: 'Scratch',
    ages: '7–11',
    level: 1,
    intro: [
      'Build a set of **instruments** you can play with your keyboard.',
      '',
      'You will:',
      '',
      '- Add instrument **sprites** to the Stage',
      '- Use `Sound` blocks to play a note when a key is pressed',
    ].join('\n'),
    landingTask: {
      title: 'Play',
      body: 'Press some keys. Which ones already make a sound?',
    },
    steps: [
      {
        title: 'What you will make',
        body: 'Build a set of **instruments** you can play with your keyboard.',
      },
      {
        title: 'Play a drum',
        body: 'Use the `play drum` block so that pressing the space bar plays a sound.',
      },
    ],
    starterCode: '// Scratch starter project — instrument sprites\n',
  },
  {
    id: 'chatbot',
    title: 'Chatbot',
    language: 'Python',
    ages: '9–13',
    level: 2,
    intro: [
      'Write a program that **asks questions and replies** based on the answers.',
      '',
      'You will:',
      '',
      '- Use `input()` to collect an answer',
      '- Use `if` to decide what to say back',
    ].join('\n'),
    landingTask: {
      title: 'Try it',
      body: 'Run the starter program. What does it ask you?',
    },
    steps: [
      {
        title: 'What you will make',
        body: [
          'Write a program that **asks questions and replies** based on the answers.',
          '',
          'You will use `input()` to collect an answer and `if` to decide what to say back.',
        ].join('\n'),
      },
      {
        title: 'Ask for a name',
        body: 'Use `input()` to ask the person their name, then greet them with it.',
      },
      {
        title: 'Reply differently',
        body: 'Add an `if` statement so your chatbot answers differently depending on what it is told.',
      },
    ],
    starterCode: [
      '# Chatbot',
      '# Ask a question, then reply based on the answer.',
      '',
      'name = input("What is your name? ")',
      'print("Hello, " + name)',
      '',
    ].join('\n'),
  },
  {
    id: 'find-the-bug',
    title: 'Find the Bug',
    language: 'Python',
    ages: '10–14',
    level: 2,
    intro: [
      'This program is **meant** to count down from 5. It does not.',
      '',
      'You will:',
      '',
      '- Read code that does not work yet',
      '- Find the missing line and fix it',
    ].join('\n'),
    steps: [
      {
        title: 'What you will do',
        body: 'This program is **meant** to count down from 5. It does not. Find out why.',
      },
      {
        title: 'Run it and watch',
        body: 'Run the program. Note what it actually does before you change anything.',
      },
    ],
    starterCode: [
      '# This should count down from 5 to 1.',
      'count = 5',
      'while count > 0:',
      '    print(count)',
      '    # something is missing here',
      '',
    ].join('\n'),
  },
  // The two below exist so an import flow can be tested against a project
  // that CANNOT be imported. Everything above runs in an editor Code Classroom
  // can embed; these need a Raspberry Pi and something plugged into it, so a
  // young person cannot open them inside a class however well they suit a
  // club session. One Scratch and one Python, so a filter has visible work to
  // do in either technology.
  //
  // Physical computing is a real and sizeable part of the live catalogue, and
  // it is exactly what the "should we only allow embedded editor projects?"
  // question on the Code Classroom FigJam is about.
  {
    id: 'rain-or-shine',
    title: 'Rain or Shine',
    language: 'Scratch',
    ages: '9–13',
    level: 2,
    usableInClassroom: false,
    intro: [
      'Build a weather station that records rainfall and shows it on screen.',
      '',
      'You will need a **Raspberry Pi** and a rain sensor connected to its pins.',
      '',
      'You will:',
      '',
      '- Wire a sensor to the `GPIO` pins',
      '- Read the sensor from Scratch',
      '- Draw a chart of what you collect',
    ].join('\n'),
    steps: [
      {
        title: 'What you will make',
        body: [
          'A **weather station** that notices when it is raining and keeps a record.',
          '',
          'This project needs hardware: a Raspberry Pi and a rain sensor.',
        ].join('\n'),
      },
      {
        title: 'Wire up the sensor',
        body: 'Connect the sensor to the `GPIO` pins, following the diagram.',
      },
    ],
    starterCode: '// Scratch starter project — GPIO sensor blocks\n',
  },
  {
    id: 'door-watcher',
    title: 'Door Watcher',
    language: 'Python',
    ages: '10–14',
    level: 3,
    usableInClassroom: false,
    intro: [
      'Make an alarm that tells you when someone opens a door.',
      '',
      'You will need a **Raspberry Pi** and a motion sensor.',
      '',
      'You will:',
      '',
      '- Read a sensor with `gpiozero`',
      '- Play a sound when it triggers',
    ].join('\n'),
    steps: [
      {
        title: 'What you will make',
        body: [
          'A **door alarm**, built from a Raspberry Pi and a motion sensor.',
          '',
          'The code runs on the Pi itself, not in a browser.',
        ].join('\n'),
      },
      {
        title: 'Read the sensor',
        body: 'Use `gpiozero` to tell when the sensor has been triggered.',
      },
    ],
    starterCode: [
      '# Door Watcher',
      '# Runs on a Raspberry Pi with a motion sensor attached.',
      '',
      'from gpiozero import MotionSensor',
      '',
      'sensor = MotionSensor(4)',
      '',
    ].join('\n'),
  },
]

export function project(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id)
}
