import { gameLevels } from '../../shared/data/gameLevels';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';
import { Button } from '../../shared/elements/Button';
import { gameState, levelState } from '../../shared/types/types';
import { levelStateValues } from '../../shared/types/enums';
import { EventEmitter } from '../../shared/emitter/Emitter';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private levelsElem: HTMLElement | null;
  private levelElems: HTMLElement[] | null;
  private helpButton: Button;
  private resetButton: Button;
  private onLevelClick: (level: number) => void;
  private onHelpClick: () => void;

  private emitter: EventEmitter;

  private currLevel: number;
  private gameState: gameState;

  constructor(currLevel: number, gameState: gameState, onLevelClick: (level: number) => void, onHelpClick: () => void) {
    super();

    this.helpButton = new Button('Help me!', 'aside__button');
    this.resetButton = new Button('Reset game', 'aside__button');

    this.classes = {
      completed: 'completed',
      incompleted: 'incompleted',
      helped: 'helped',
      baseClass: 'aside',
      title: 'aside__title',
      levels: 'aside__levels',
      level: 'aside__level',
      choosenLevel: 'aside__level_choosen',
    };
    this.texts = {
      title: 'Levels',
    };

    this.emitter = new EventEmitter();

    this.currLevel = currLevel;
    this.gameState = gameState;

    this.levelsElem = null;
    this.levelElems = null;

    this.onLevelClick = onLevelClick;
    this.onHelpClick = onHelpClick;

    this.init();
  }

  protected init() {
    this.createLevels();
    if (!this.levelsElem) return;

    this.hydrate();

    this.elem = this.createElem(
      'div',
      [this.classes.baseClass],
      [this.createTitle(), this.levelsElem, this.helpButton.getElem(), this.resetButton.getElem()]
    );
  }

  updateAside() {
    this.levelElems?.forEach((item, index) => {
      item.classList.remove(
        this.classes.choosenLevel,
        this.classes.completed,
        this.classes.incompleted,
        this.classes.helped
      );

      if (index === this.currLevel) {
        item.classList.add(this.classes.choosenLevel);
      }

      item.classList.add(levelStateValues[this.gameState[index]]);
    });
  }

  private hydrate() {
    if (!this.levelsElem) return;

    this.levelsElem.addEventListener('click', (e) => {
      const tar = e.target as HTMLElement;
      if (tar && tar.closest('.aside__level')) {
        this.onLevelClick(+tar.innerHTML);
      }
    });

    this.helpButton.getElem().addEventListener('click', this.onHelpClick);
    this.resetButton.getElem().addEventListener('click', () => {
      console.log(this);
      this.emitter.emit('reset-game', null);
    });
  }

  private createLevelStr(number: number): HTMLElement {
    return this.createElem('div', [this.classes.level], [`${number}`]);
  }

  private createLevels() {
    const levels = gameLevels.map((_level, index) => this.createLevelStr(index));
    this.gameState.forEach((levelState: levelState, index) => {
      switch (levelState) {
        case levelStateValues.completed:
          levels[index].classList.add(this.classes.completed);
          break;
        case levelStateValues.incompleted:
          levels[index].classList.add(this.classes.incompleted);
          break;
        case levelStateValues.helped:
          levels[index].classList.add(this.classes.helped);
          break;
      }
    });
    levels[this.currLevel].classList.add(this.classes.choosenLevel);
    this.levelElems = levels;
    this.levelsElem = this.createElem('div', [this.classes.levels], [...levels]);
  }

  private createTitle() {
    const title = this.createElem('h3', [this.classes.title], [this.texts.title]);
    return title;
  }

  public getChoosenLevel() {
    return this.currLevel;
  }

  public setChoosenLevel(level: number) {
    this.currLevel = level;
  }

  public getGameState() {
    return this.gameState;
  }

  public setGameState(gameState: gameState) {
    this.gameState = gameState;
  }
}
