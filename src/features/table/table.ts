import { ElemController } from '../../shared/utils/elemController';

export class Table extends ElemController {
  classes: Record<string, string>;
  constructor() {
    super();

    this.classes = {
      baseClass: 'game__table',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.baseClass], ["I'm table for HTML tags visualisation"]);
  }
}
