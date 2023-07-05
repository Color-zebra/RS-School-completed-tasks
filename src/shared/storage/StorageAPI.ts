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

  private init() {
    window.addEventListener('beforeunload', () => {
      this.saveCurrLevel(this.choosenLevel);
      this.saveGameState(this.gameState);
    });
  }

  private saveGameState(gameState: gameState) {
    const string = JSON.stringify(gameState);
    localStorage.setItem(this.fields.gameState, string);
  }

  private saveCurrLevel(currLevel: number) {
    const string = JSON.stringify(currLevel);
    localStorage.setItem(this.fields.gameLevel, string);
  }

  public setCurrLevel(level: number) {
    this.choosenLevel = level;
  }

  public setCurrGameState(gameState: gameState) {
    this.gameState = [...gameState];
  }

  public loadGameState() {
    const string = localStorage.getItem(this.fields.gameState);
    if (!string) return [...this.emptyGame];
    return JSON.parse(string);
  }

  public loadGameLevel() {
    const string = localStorage.getItem(this.fields.gameLevel);
    if (!string) return 0;
    return JSON.parse(string);
  }

  public reset() {
    this.choosenLevel = 0;
    this.gameState = [...this.emptyGame];
    return [...this.emptyGame];
  }
}
