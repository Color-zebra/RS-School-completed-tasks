import { ElemController } from '../../shared/utils/elemController';
import './header.scss';

export class Header extends ElemController {
  classes: Record<string, string>;
  constructor() {
    super();

    this.classes = {
      baseClass: 'header',
    };

    this.init();
  }

  protected init() {
    this.elem = this.createElem('header', [this.classes.baseClass], ["I'm header"]);
  }
}
