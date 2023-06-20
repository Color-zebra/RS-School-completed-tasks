import { ElemFactory } from './elemFactory';

export abstract class ElemController extends ElemFactory {
  abstract init(): void;
  protected elem: null | HTMLElement;
  protected factory: ElemFactory;

  constructor() {
    super();
    this.elem = null;
    this.factory = new ElemFactory();
  }

  public getElem() {
    return this.elem || this.factory.createElem('div');
  }
}
