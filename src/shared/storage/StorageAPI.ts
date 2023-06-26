import { gameLevels } from '../data/gameLevels';
import { levelStateValues } from '../types/enums';
import { gameState } from '../types/types';

export class StorageAPI {
  private static instance: StorageAPI;
  private fields: Record<string, string>;
  emptyGame: gameState;
  constructor() {
    this.fields = {
      gameState: 'CSS-Game-State',
      gameLevel: 'CSS-Game-Level',
    };
    this.emptyGame = gameLevels.map(() => levelStateValues.incompleted);

    if (typeof StorageAPI.instance === 'object') {
      return StorageAPI.instance;
    } else {
      StorageAPI.instance = this;
      return this;
    }
  }

  saveGameState(gameState: gameState) {
    const string = JSON.stringify(gameState);
    localStorage.setItem(this.fields.gameState, string);
  }

  loadGameState() {
    const string = localStorage.getItem(this.fields.gameState);
    if (!string) return this.emptyGame;
    return JSON.parse(string);
  }

  saveCurrLevel(currLevel: number) {
    const string = JSON.stringify(currLevel);
    localStorage.setItem(this.fields.gameLevel, string);
  }

  loadGameLevel() {
    const string = localStorage.getItem(this.fields.gameLevel);
    if (!string) return 0;
    return JSON.parse(string);
  }
}
