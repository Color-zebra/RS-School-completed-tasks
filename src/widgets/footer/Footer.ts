import { ElemController } from '../../shared/utils/elemController';

export class Footer extends ElemController {
  classes: Record<string, string>;

  constructor() {
    super();

    this.classes = {
      baseClass: 'footer',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem('footer', [this.classes.baseClass], ["I'm footer"]);
  }
}
