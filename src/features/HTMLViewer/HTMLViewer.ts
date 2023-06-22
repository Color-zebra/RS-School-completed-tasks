import { ElemController } from '../../shared/utils/elemController';

export class HTMLViewer extends ElemController {
  classes: Record<string, string>;

  constructor() {
    super();
    this.classes = {
      baseClass: 'game__viewer',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.baseClass], ["I'm HTML code viewer"]);
  }
}
