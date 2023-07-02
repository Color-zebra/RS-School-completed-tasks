import { ElemController } from '../utils/elemController';
import { Button } from './Button';
import './popup.scss';

export class Popup extends ElemController {
  private classes: Record<string, string>;
  private text: string;
  private button: Button;

  constructor() {
    super();

    this.button = new Button('Close', 'popup__button');

    this.classes = {
      baseClass: 'popup',
      content: 'popup__content',
      image: 'popup__image',
      text: 'popup__text',
      shown: 'popup-shown',
    };

    this.text = 'Hooray! You have passed the final level!';
    this.init();
  }

  protected init() {
    const img = this.createElem('div', [this.classes.image], []);
    const text = this.createElem('div', [this.classes.text], [this.text]);

    const content = this.createElem('div', [this.classes.content], [img, text, this.button.getElem()]);
    this.elem = this.createElem('div', [this.classes.baseClass], [content]);
  }

  public showPopup() {
    this.elem?.classList.add(this.classes.shown);
    this.button.getElem().addEventListener(
      'click',
      () => {
        this.closePopup();
      },
      { once: true }
    );
  }

  private closePopup() {
    this.elem?.classList.remove(this.classes.shown);
  }
}
