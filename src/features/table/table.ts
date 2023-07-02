import { GameTag } from '../../shared/types/interfaces';
import { appendArg, gameLevel } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';
import './table.scss';

export class Table extends ElemController {
  classes: Record<string, string>;
  private gameElements: HTMLElement[];

  constructor() {
    super();

    this.classes = {
      baseClass: 'game__table',
      mainClass: 'table',
    };
    this.gameElements = [];

    this.init();
  }

  protected init() {
    this.elem = this.createElem('div', [this.classes.baseClass, this.classes.mainClass], []);
  }

  public initLevel(level: gameLevel) {
    if (!this.elem) return;
    this.elem.innerHTML = '';
    level.forEach((tag: GameTag) => {
      this.elem?.append(this.createGameElem(tag));
    });
  }

  getGameElements() {
    return this.gameElements;
  }

  private createGameElem(elem: GameTag) {
    const currElem = this.createElem(`${elem.tag}`, elem.className ? elem.className : [], []);
    // const currElem = document.createElement(`${elem.tag}`);
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
