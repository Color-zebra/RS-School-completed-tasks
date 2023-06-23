import { GameTag } from './interfaces';

export type appendArg = HTMLElement | string;

export type tags = 'square' | 'rhombus' | 'circle';

export type levels = Array<gameLevel>;

export type gameLevel = Array<GameTag>;
