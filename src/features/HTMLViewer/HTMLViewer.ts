import { ElemController } from '../../shared/utils/elemController';

export class HTMLViewer extends ElemController {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], ["I'm HTML code viewer"]);
  }
}
