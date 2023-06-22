import { ElemController } from '../../shared/utils/elemController';
import './header.scss';

export class Header extends ElemController {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.elem = this.createElem('div', [], ["I'm header"]);
  }
}
