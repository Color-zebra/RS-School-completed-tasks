import ElemController from '../../shared/utils/ElemController';
import './winners.scss';

export default class Winners extends ElemController {
  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.elem = this.createElem('h1', ["i'm winners page"], null);
  }
}
