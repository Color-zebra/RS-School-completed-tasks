import { ElemController } from '../../shared/utils/elemController';

export class Game extends ElemController {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], ['Game field']);
  }
}
