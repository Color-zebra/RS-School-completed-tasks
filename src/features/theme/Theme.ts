import { ElemController } from '../../shared/utils/elemController';
import './theme.scss';

export class Theme extends ElemController {
  private classes: Record<string, string>;

  constructor(className?: string) {
    super();

    this.classes = {
      baseClass: 'theme-switcher',
      addClasses: className ? className : '',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.baseClass, this.classes.addClasses], []);

    this.elem.addEventListener('click', () => {
      this.toggle();
    });
  }

  private toggle() {
    if (document.body.dataset.theme === 'dark') {
      document.body.dataset.theme = 'light';
    } else {
      document.body.dataset.theme = 'dark';
    }
  }
}
