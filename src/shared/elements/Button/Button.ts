import ElemController from '../../utils/ElemController';
import './button.scss';

export default class Button extends ElemController {
  protected elem: HTMLElement | null;

  protected text: string;

  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  callBack: (() => void) | undefined;

  constructor(text: string | null, addClasses: [string] | null, callBack?: () => void) {
    super();
    this.elem = null;
    this.text = text || '';
    this.classes = {
      baseClass: 'btn',
    };
    this.addClasses = addClasses || [];
    this.callBack = callBack;

    this.init();
  }

  protected init() {
    this.elem = this.createElem('button', [this.text], [this.classes.baseClass, ...this.addClasses]);
    this.hydrate();
  }

  private hydrate() {
    if (this.elem && this.callBack) {
      const CB = this.callBack;
      this.elem.addEventListener('click', CB);
    }
  }
}
