import ElemController from '../../shared/utils/ElemController';
import './garage.scss';

export default class Garage extends ElemController {
  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.elem = this.createElem('h1', ["I'm garage page"], null);
  }
}
