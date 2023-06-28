import { ElemController } from '../utils/elemController';
import './button.scss';

export class Button extends ElemController {
  private classes: Record<string, string>;
  private text: string;

  constructor(text: string, className?: string) {
    super();
    this.text = text;
    this.classes = {
      baseClass: 'btn',
      addClasses: className ? className : '',
    };

    this.init();
  }

  protected init() {
    console.log(this.classes);
    this.elem = this.createElem('button', [this.classes.baseClass, this.classes.addClasses], []);
    this.elem.setAttribute('type', 'button');
    this.setText(this.text);
  }

  private setText(text: string) {
    this.elem?.append(text);
  }
}
