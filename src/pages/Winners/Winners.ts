import ElemController from '../../shared/utils/ElemController';
import './winners.scss';

export default class Winners extends ElemController {
  protected classes: Record<string, string>;

  constructor() {
    super();

    this.classes = {
      baseClass: 'winners',
    };

    this.init();
  }

  protected init() {
    this.elem = this.createElem('h1', ["i'm winners page"], this.classes.baseClass);
  }
}
