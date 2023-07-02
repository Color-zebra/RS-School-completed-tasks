import { gameLevel, levels } from '../types/types';

const first: gameLevel = [
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
];

const second: gameLevel = [
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

const third: gameLevel = [
  {
    tag: 'apple',
    children: null,
    className: ['big'],
  },
  {
    tag: 'bento',
    children: null,
  },
  {
    tag: 'orange',
    children: null,
    className: ['big'],
  },
];

export const gameLevels: levels = [first, second, third];
