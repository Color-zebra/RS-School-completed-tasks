import { ElemController } from '../../shared/utils/elemController';

export class Footer extends ElemController {
  constructor() {
    super();

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], ["I'm footer"]);
  }
}
