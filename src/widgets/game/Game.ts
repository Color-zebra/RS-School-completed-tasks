import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/Table';
import { gameLevels } from '../../shared/data/gameLevels';
import { rightAnswers } from '../../shared/data/rightAnswers';
import { EventEmitter } from '../../shared/emitter/Emitter';
import { StorageAPI } from '../../shared/storage/StorageAPI';
import { levelStateValues } from '../../shared/types/enums';
import { gameState, levels } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';
import './game.scss';

export class Game extends ElemController {
  private classes: Record<string, string>;

  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;
  private storageAPI: StorageAPI;
  private emitter: EventEmitter;

  private strElemMap: Map<HTMLElement, HTMLElement>;
  private elemStrMap: Map<HTMLElement, HTMLElement>;

  private levels: levels;
  private rightElements: NodeList | null;
  private answers: string[];
  private currLevel: number;
  public gameState: gameState;

  constructor(level: number) {
    super();

    this.classes = {
      baseClass: 'game',
    };

    this.table = new Table();
    this.cssEditor = new CSSEditor(this.checkAnswer.bind(this));
    this.htmlViewer = new HTMLViewer();
    this.storageAPI = new StorageAPI();
    this.emitter = new EventEmitter();

    this.strElemMap = new Map();
    this.elemStrMap = new Map();

    this.levels = gameLevels;
    this.answers = rightAnswers;
    this.currLevel = level;
    this.rightElements = null;
    this.gameState = this.storageAPI.loadGameState();

    this.init();
    this.hydrate();
  }

  protected init() {
    this.elem = this.createElem(
      'main',
      [this.classes.baseClass],
      [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]
    );

    this.initLevel(this.currLevel);
    console.log(this.gameState);
  }

  private hydrate() {
    this.table.getElem().addEventListener('mouseover', (e) => {
      if (e.target !== this.table.getElem()) {
        (e.target as HTMLElement).classList.add('light');
        this.elemStrMap.get(e.target as HTMLElement)?.classList.add('light');
      }
      if (e.relatedTarget) {
        (e.relatedTarget as HTMLElement).classList.remove('light');
        this.elemStrMap.get(e.relatedTarget as HTMLElement)?.classList.remove('light');
      }
    });

    this.htmlViewer.getElem().addEventListener('mouseover', (e) => {
      if (e.target !== this.htmlViewer.getElem()) {
        (e.target as HTMLElement).classList.add('light');
        this.strElemMap.get(e.target as HTMLElement)?.classList.add('light');
      }
      if (e.relatedTarget) {
        (e.relatedTarget as HTMLElement).classList.remove('light');
        this.strElemMap.get(e.relatedTarget as HTMLElement)?.classList.remove('light');
      }
    });
  }

  public initLevel(levelNumber: number) {
    const level = gameLevels[levelNumber];
    this.currLevel = levelNumber;
    this.table.initLevel(level);
    this.htmlViewer.initLevel(level);
    this.cssEditor.clearInput();

    const gameElements = this.table.getGameElements();
    const gameStrings = this.htmlViewer.getGameStrings();

    gameElements.forEach((_item, index) => {
      this.elemStrMap.set(gameElements[index], gameStrings[index]);
      this.strElemMap.set(gameStrings[index], gameElements[index]);
    });

    this.getRightElements(levelNumber);
  }

  private getRightElements(level: number) {
    this.rightElements = this.table.getElem().querySelectorAll(this.answers[level]);
  }

  public checkAnswer(withHelp = false) {
    const ans = this.cssEditor.getAnswer();
    if (!ans) return;

    const choosenElements = this.table.getElem().querySelectorAll(ans);
    if (this.rightElements) {
      for (let i = 0; i < this.rightElements.length; i += 1) {
        if (this.rightElements[i] !== choosenElements[i]) {
          this.handleWrongAnswer();
          return;
        }
      }
      this.handleRightAnswer(withHelp);
      return;
    }
  }

  public help() {
    this.cssEditor.giveAnswer(this.currLevel, this.checkAnswer.bind(this, true));
  }

  private handleRightAnswer(withHelp: boolean) {
    this.gameState[this.currLevel] = withHelp ? levelStateValues.helped : levelStateValues.completed;
    this.storageAPI.setCurrGameState(this.gameState);
    const nextLevel = this.currLevel + 1;
    if (this.levels[nextLevel]) {
      console.log('Right!');
      this.currLevel = nextLevel;
      this.initLevel(nextLevel);
    } else {
      alert('You finish the GAME!');
    }

    console.log(this);
    this.emitter.emit('state-change', this.gameState);
    this.emitter.emit('level-change', this.currLevel);
  }

  private handleWrongAnswer() {
    console.log('Wrong!');
  }

  public setGameState(gameState: gameState) {
    this.gameState = gameState;
  }
}
