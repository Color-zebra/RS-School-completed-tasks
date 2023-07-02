import { levelStateValues } from './enums';
import { GameTag } from './interfaces';

export type appendArg = HTMLElement | string;

export type tags = 'bento' | 'napkin' | 'plate' | 'orange' | 'pickle' | 'apple';

export type levels = Array<gameLevel>;

export type gameLevel = Array<GameTag>;

export type levelState = keyof typeof levelStateValues;

export type gameState = levelState[];
