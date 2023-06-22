import { ElemController } from '../../shared/utils/elemController';

export class CSSEditor extends ElemController {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], ["I'm css selector input"]);
  }
}
