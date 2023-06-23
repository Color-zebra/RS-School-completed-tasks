import { GameTag } from '../../shared/types/interfaces';
import { appendArg, gameLevel } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';

export class Table extends ElemController {
  classes: Record<string, string>;
  private gameElements: HTMLElement[];

  constructor() {
    super();

    this.classes = {
      baseClass: 'game__table',
    };
    this.gameElements = [];

    this.init();
  }

  protected init() {
    this.elem = this.createElem('div', [this.classes.baseClass], ["I'm table for HTML tags visualisation"]);
  }

  public initLevel(level: gameLevel) {
    level.forEach((tag: GameTag) => {
      this.elem?.append(this.createGameElem(tag));
    });
  }

  getGameElements() {
    return this.gameElements;
  }

  private createGameElem(elem: GameTag) {
    const currElem = document.createElement(`${elem.tag}`);
    if (elem.children) {
      const children: appendArg[] = [];
      elem.children.forEach((tag: GameTag) => {
        children.push(this.createGameElem(tag));
      });
      currElem.append(...children);
    }
    this.gameElements.push(currElem);
    return currElem;
  }
}
