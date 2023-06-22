import { GameTag } from './interfaces';

export type appendArg = HTMLElement | string;

export type tags = 'my-square' | 'my-rhombus' | 'my-circle';

export type levels = Array<gameLevel>;

export type gameLevel = Array<GameTag>;
