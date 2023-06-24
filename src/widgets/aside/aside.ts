import { gameLevels } from '../../shared/data/gameLevels';
import { ElemController } from '../../shared/utils/elemController';
import './aside.scss';
import { Button } from '../../shared/elements/Button';

export class Aside extends ElemController {
  private classes: Record<string, string>;
  private texts: Record<string, string>;
  private levelsElem: HTMLElement | null;
  private helpButton: Button;
  private onLevelClick: (level: number) => void;
  private onHelpClick: () => void;

  constructor(onLevelClick: (level: number) => void, onHelpClick: () => void) {
    super();

    this.helpButton = new Button();

    this.classes = {
      completed: 'competed',
      incompleted: 'incompleted',
      baseClass: 'aside',
      title: 'aside__title',
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
      [this.createTitle(), this.levelsElem, this.helpButton.getElem()]
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

  private createTitle() {
    const title = this.createElem('h3', [this.classes.title], [this.texts.title]);
    return title;
  }
}
