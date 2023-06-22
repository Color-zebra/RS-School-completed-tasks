import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
  {
    tag: 'my-square',
    children: [
      {
        tag: 'my-rhombus',
        children: null,
      },
    ],
  },
  {
    tag: 'my-square',
    children: [
      {
        tag: 'my-rhombus',
        children: null,
      },
    ],
  },
  {
    tag: 'my-square',
    children: [
      {
        tag: 'my-circle',
        children: [
          {
            tag: 'my-rhombus',
            children: null,
          },
        ],
      },
    ],
  },
];

export const gameLevels: levels = [first];
