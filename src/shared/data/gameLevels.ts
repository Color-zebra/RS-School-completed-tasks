import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
  {
    tag: 'circle',
    children: [
      {
        tag: 'square',
        children: null,
      },
    ],
  },
  {
    tag: 'square',
    children: [
      {
        tag: 'rhombus',
        children: null,
      },
      {
        tag: 'rhombus',
        children: null,
      },
      {
        tag: 'rhombus',
        children: null,
      },
    ],
  },
  {
    tag: 'rhombus',
    children: [
      {
        tag: 'square',
        children: [
          {
            tag: 'circle',
            children: null,
          },
          {
            tag: 'circle',
            children: null,
          },
          {
            tag: 'circle',
            children: null,
          },
        ],
      },
    ],
  },
];

export const gameLevels: levels = [first];
