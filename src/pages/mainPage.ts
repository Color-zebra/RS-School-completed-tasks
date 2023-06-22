import { ElemController } from '../shared/utils/elemController';
import { Aside } from '../widgets/aside/aside';
import { Header } from '../widgets/header/Header';

export class MainPage extends ElemController {
  private aside: Aside;
  private header: Header;

  constructor() {
    super();
    this.aside = new Aside();
    this.header = new Header();
  }

  public init() {
    this.elem = this.factory.createElem('div', [], [this.header.getElem(), this.aside.getElem()]);
  }
}
