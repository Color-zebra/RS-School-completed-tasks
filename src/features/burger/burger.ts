import { ElemController } from '../../shared/utils/elemController';
import './burger.scss';

export class Burger extends ElemController {
  private classes: Record<string, string>;

  constructor() {
    super();
    this.classes = {
      burger: 'burger',
      line: 'burger__line',
    };
  }

  init() {
    const childrens = new Array(3);

    for (let i = 0; i < childrens.length; i++) {
      childrens[i] = this.factory.createElem('span', [this.classes.line]);
    }

    console.log(childrens);

    this.elem = this.factory.createElem('div', [this.classes.burger], childrens);
  }
}
