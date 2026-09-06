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
]

export function project(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id)
}
