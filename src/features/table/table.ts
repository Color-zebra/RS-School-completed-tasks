import { ElemController } from '../../shared/utils/elemController';

export class Table extends ElemController {
  constructor() {
    super();

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], ["I'm table for HTML tags visualisation"]);
  }
}
