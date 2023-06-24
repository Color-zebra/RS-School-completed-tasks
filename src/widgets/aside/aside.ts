import { gameLevels } from '../../shared/data/gameLevels';
import { Burger } from '../../features/burger/Burger';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private burger: Burger;
  private levelsElem: HTMLElement | null;
  private onLevelClick: (level: number) => void;

  constructor(onLevelClick: (level: number) => void) {
    super();
    this.burger = new Burger();
    this.classes = {
      completed: 'competed',
      incompleted: 'incomplited',
      baseClass: 'aside',
      levels: 'aside__levels',
      level: 'aside__level',
    };
    this.texts = {
      title: 'Levels',
    };
    this.levelsElem = null;
    this.onLevelClick = onLevelClick;

    this.init();
  }

  protected init() {
    const levels = gameLevels.map((_level, index) => this.createLevelStr(index, false));
    this.levelsElem = this.createElem('div', [this.classes.levels], [...levels]);

    this.levelsElem.addEventListener('click', (e) => {
      const tar = e.target as HTMLElement;
      if (tar && tar.closest('.aside__level')) {
        this.onLevelClick(+tar.innerHTML);
      }
    });

    this.elem = this.createElem(
      'div',
      [this.classes.baseClass],
      [this.texts.title, this.levelsElem, this.burger.getElem()]
    );
  }

  private createLevelStr(number: number, isComplete: boolean): HTMLElement {
    const className: string = isComplete ? this.classes.completed : this.classes.incompleted;
    return this.createElem('div', [className, this.classes.level], [`${number}`]);
  }
}
