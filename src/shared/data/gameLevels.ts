import { gameLevel, levels } from '../types/types';

/* const first: gameLevel = [
  {
    tag: 'plate',
    className: ['big-red-plate'],
    children: [
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    className: ['some-class'],
    id: 'some-id',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
  {
    tag: 'napkin',
    children: [
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
]; */

const first: gameLevel = [
  {
    tag: 'plate',
    children: null,
  },
  {
    tag: 'bento',
    children: null,
  },
  {
    tag: 'napkin',
    children: null,
  },
];

const second: gameLevel = [
  {
    tag: 'plate',
    children: null,
  },
  {
    tag: 'plate',
    children: null,
    className: ['small'],
  },
  {
    tag: 'plate',
    children: null,
  },
];

const third: gameLevel = [
  {
    tag: 'bento',
    children: null,
  },
  {
    tag: 'plate',
    children: null,
  },
  {
    tag: 'bento',
    children: null,
    id: 'right-bento',
  },
];

const fourth: gameLevel = [
  {
    tag: 'plate',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
  {
    tag: 'napkin',
    children: [
      {
        tag: 'orange',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
];

const fifth: gameLevel = [
  {
    tag: 'orange',
    className: ['big'],
    children: null,
  },
  {
    tag: 'bento',
    children: null,
    className: ['small'],
  },
  {
    tag: 'bento',
    children: null,
  },
];

const sixth: gameLevel = [
  {
    tag: 'apple',
    className: ['big'],
    children: null,
  },
  {
    tag: 'orange',
    className: ['big'],
    children: null,
  },
  {
    tag: 'apple',
    className: ['big'],
    children: null,
  },
];

const seventh: gameLevel = [
  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        id: 'one-more-id',
        children: null,
      },
    ],
  },
  {
    tag: 'plate',
    children: [
      {
        tag: 'orange',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
        className: ['some-class'],
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
  {
    tag: 'napkin',
    children: [
      {
        tag: 'apple',
        id: 'id',
        children: null,
      },
      {
        tag: 'apple',
        id: 'another-id',
        children: null,
      },
    ],
  },
];

const eighth: gameLevel = [
  {
    tag: 'orange',
    children: null,
  },
  {
    tag: 'orange',
    className: ['dont-touch', 'small'],
    children: null,
  },
  {
    tag: 'napkin',
    children: [
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
  {
    tag: 'napkin',
    className: ['dont-touch'],
    children: [
      {
        tag: 'orange',
        children: null,
      },
      {
        tag: 'orange',
        className: ['dont-touch'],
        children: null,
      },
    ],
  },
];

const ninth: gameLevel = [
  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    className: ['dont-touch'],
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
];

const tenth: gameLevel = [
  {
    tag: 'bento',
    id: 'very-important',
    children: [
      {
        tag: 'apple',
        className: ['nice-apple'],
        children: null,
      },
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        className: ['nice-apple'],
        children: null,
      },
    ],
  },

  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        id: 'catch-me',
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    children: [
      {
        tag: 'apple',
        className: ['nice-apple'],
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
];

const eleventh: gameLevel = [
  {
    tag: 'napkin',
    id: 'napkin-id',
    className: ['just-napkin'],
    children: [
      {
        tag: 'apple',
        children: null,
      },
      {
        tag: 'apple',
        id: 'cool-apple',
        children: null,
      },
      {
        tag: 'apple',
        className: ['just-apple'],
        children: null,
      },
    ],
  },
  {
    tag: 'bento',
    className: ['small'],
    children: null,
  },
  {
    tag: 'bento',
    id: 'bento-id',
    children: [
      {
        tag: 'apple',
        className: ['nice-apple'],
        children: null,
      },
      {
        tag: 'orange',
        children: null,
      },
    ],
  },
];

export const gameLevels: levels = [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh];
