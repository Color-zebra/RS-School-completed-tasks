import { ElemController } from '../shared/utils/elemController';
import { Aside } from '../widgets/aside/aside';

export class MainPage extends ElemController {
  private aside: Aside;

  constructor() {
    super();
    this.aside = new Aside();
  }

  public init() {
    this.aside.init();
    this.elem = this.factory.createElem('div', [], [this.aside.getElem()]);
  }
}
