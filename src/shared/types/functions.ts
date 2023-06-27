import { gameState } from './types';

export type emitterCallback = (data: gameState | number | null) => void;
