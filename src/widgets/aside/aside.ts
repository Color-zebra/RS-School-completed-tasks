import { gameLevels } from '../../shared/data/gameLevels';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';
import { Button } from '../../shared/elements/Button';
import { gameState, levelState } from '../../shared/types/types';
import { levelStateValues } from '../../shared/types/enums';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private levelsElem: HTMLElement | null;
  private levelElems: HTMLElement[] | null;
  private helpButton: Button;
  private onLevelClick: (level: number) => void;
  private onHelpClick: () => void;

  private currLevel: number;
  private gameState: gameState;

  constructor(currLevel: number, gameState: gameState, onLevelClick: (level: number) => void, onHelpClick: () => void) {
    super();

    this.helpButton = new Button();

    this.classes = {
      completed: 'competed',
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
      [this.createTitle(), this.levelsElem, this.helpButton.getElem()]
    );
  }

  updateChoosenLevel(level: number) {
    this.currLevel = level;
    this.levelElems?.forEach((item, index) => {
      item.classList.remove(this.classes.choosenLevel);
      if (index === this.currLevel) {
        item.classList.add(this.classes.choosenLevel);
      }
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
  }

  private createLevelStr(number: number, isComplete: boolean): HTMLElement {
    const className: string = isComplete ? this.classes.completed : this.classes.incompleted;
    return this.createElem('div', [className, this.classes.level], [`${number}`]);
  }

  private createLevels() {
    const levels = gameLevels.map((_level, index) => this.createLevelStr(index, false));
    this.gameState.forEach((levelState: levelState, index) => {
      switch (levelState) {
        case levelStateValues.completed:
          levels[index].classList.add(this.classes.competed);
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
}
