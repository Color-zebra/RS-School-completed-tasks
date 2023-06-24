import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
  {
    tag: 'circle',
    children: null,
  },
  {
    tag: 'square',
    children: null,
  },
  {
    tag: 'rhombus',
    children: null,
  },
];

const second: gameLevel = [
  {
    tag: 'circle',
    children: null,
  },
  {
    tag: 'square',
    children: null,
  },
  {
    tag: 'rhombus',
    children: [
      {
        tag: 'square',
        children: null,
      },
    ],
  },
];

export const gameLevels: levels = [first, second];
