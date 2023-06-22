import { ElemController } from '../../shared/utils/elemController';

export class CSSEditor extends ElemController {
  classes: Record<string, string>;
  constructor() {
    super();

    this.classes = {
      baseClass: 'game__editor',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.baseClass], ["I'm css selector input"]);
  }
}
