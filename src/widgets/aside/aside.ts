import { gameLevels } from '../../shared/data/gameLevels';
import { Burger } from '../../features/burger/Burger';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';
import { Button } from '../../shared/elements/Button';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private burger: Burger;
  private levelsElem: HTMLElement | null;
  private helpButton: Button;
  private onLevelClick: (level: number) => void;
  private onHelpClick: () => void;

  constructor(onLevelClick: (level: number) => void, onHelpClick: () => void) {
    super();

    this.burger = new Burger();
    this.helpButton = new Button();

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
      [this.texts.title, this.levelsElem, this.helpButton.getElem(), this.burger.getElem()]
    );
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
    this.levelsElem = this.createElem('div', [this.classes.levels], [...levels]);
  }
}
