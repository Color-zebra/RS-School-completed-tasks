import { ElemController } from '../utils/elemController';
import './button.scss';

export class Button extends ElemController {
  private classes: Record<string, string>;

  constructor() {
    super();
    this.classes = {
      baseClass: 'btn',
    };

    this.init();
  }

  protected init() {
    this.elem = this.createElem('button', [this.classes.baseClass], ['Help me!']);
    this.elem.setAttribute('type', 'button');
  }
}
