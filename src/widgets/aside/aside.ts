import { gameLevels } from '../../shared/data/gameLevels';
import { Burger } from '../../features/burger/Burger';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private burger: Burger;

  constructor() {
    super();
    this.burger = new Burger();
    this.classes = {
      completed: 'competed',
      incompleted: 'incomplited',
      baseClass: 'aside',
    };
    this.texts = {
      title: 'Levels',
    };

    this.init();
  }

  protected init() {
    const levels = gameLevels.map((_level, index) => this.createLevelStr(index, false));

    this.elem = this.factory.createElem(
      'div',
      [this.classes.baseClass],
      [this.texts.title, ...levels, this.burger.getElem()]
    );
  }

  private createLevelStr(number: number, isComplete: boolean): HTMLElement {
    const className: string = isComplete ? this.classes.completed : this.classes.incompleted;
    return this.factory.createElem('div', [className], [`${number}`]);
  }
}
