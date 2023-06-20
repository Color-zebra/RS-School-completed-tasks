import { Burger } from '../../features/burger/burger';
import { gameLevels } from '../../shared/data/gameLevels';
import { ElemController } from '../../shared/utils/elemController';

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
    };
    this.texts = {
      title: 'Levels',
    };
  }

  public init() {
    this.burger.init();
    const levels = gameLevels.map((_level, index) => this.createLevelStr(index, false));
    this.elem = this.factory.createElem('div', ['aside'], [this.texts.title, ...levels, this.burger.getElem()]);
  }

  private createLevelStr(number: number, isComplete: boolean): HTMLElement {
    const className: string = isComplete ? this.classes.completed : this.classes.incompleted;
    return this.factory.createElem('div', [className], [`${number}`]);
  }
}
