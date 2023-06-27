import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
  {
    tag: 'circle',
    className: ['big-red-circle'],
    children: [
      {
        tag: 'circle',
        children: null,
      },
    ],
  },
  {
    tag: 'square',
    className: ['some-class'],
    id: 'some-id',
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
      {
        tag: 'square',
        children: null,
      },
    ],
  },
];

export const gameLevels: levels = [first, second];
