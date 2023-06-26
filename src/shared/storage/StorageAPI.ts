import { gameState } from '../types/types';

export class StorageAPI {
  private static instance: StorageAPI;
  fields: { gameState: string };
  constructor() {
    this.fields = {
      gameState: 'CSS-Game-State',
    };

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
    if (!string) return;
    return JSON.parse(string);
  }
}
