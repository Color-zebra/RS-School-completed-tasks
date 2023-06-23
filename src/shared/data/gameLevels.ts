import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
  {
    tag: 'square',
    children: null,
  },
  {
    tag: 'square',
    children: [
      {
        tag: 'rhombus',
        children: null,
      },
    ],
  },
  {
    tag: 'square',
    children: [
      {
        tag: 'circle',
        children: [
          {
            tag: 'rhombus',
            children: null,
          },
        ],
      },
    ],
  },
];

export const gameLevels: levels = [first];
