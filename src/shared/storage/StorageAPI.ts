import { gameLevels } from '../data/gameLevels';
import { levelStateValues } from '../types/enums';
import { gameState } from '../types/types';

export class StorageAPI {
  private static instance: StorageAPI;
  private fields: Record<string, string>;
  private emptyGame: gameState;
  public gameState: gameState;
  public choosenLevel: number;
  constructor() {
    this.fields = {
      gameState: 'CSS-Game-State',
      gameLevel: 'CSS-Game-Level',
    };
    this.emptyGame = gameLevels.map(() => levelStateValues.incompleted);

    this.gameState = this.loadGameState();
    this.choosenLevel = this.loadGameLevel();

    if (typeof StorageAPI.instance === 'object') {
      return StorageAPI.instance;
    } else {
      StorageAPI.instance = this;
      this.init();
      return this;
    }
  }

  private saveGameState(gameState: gameState) {
    const string = JSON.stringify(gameState);
    localStorage.setItem(this.fields.gameState, string);
  }

  private saveCurrLevel(currLevel: number) {
    const string = JSON.stringify(currLevel);
    localStorage.setItem(this.fields.gameLevel, string);
  }

  setCurrLevel(level: number) {
    this.choosenLevel = level;
  }

  setCurrGameState(gameState: gameState) {
    this.gameState = gameState;
  }

  public loadGameState() {
    const string = localStorage.getItem(this.fields.gameState);
    if (!string) return this.emptyGame;
    return JSON.parse(string);
  }

  public loadGameLevel() {
    const string = localStorage.getItem(this.fields.gameLevel);
    if (!string) return 0;
    return JSON.parse(string);
  }

  private init() {
    window.addEventListener('beforeunload', () => {
      console.log(this.choosenLevel, this.gameState);
      alert('ЪУЪ!');
      this.saveCurrLevel(this.choosenLevel);
      this.saveGameState(this.gameState);
    });
  }
}
