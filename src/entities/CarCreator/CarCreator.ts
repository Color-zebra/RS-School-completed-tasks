import Button from '../../shared/elements/Button/Button';
import ColorRange from '../../shared/elements/ColorRange/ColorRange';
import ElemController from '../../shared/utils/ElemController';
import './carcreator.scss';

export default class CarCreator extends ElemController {
  protected classes: Record<string, string>;

  colorRange: ColorRange;

  submitButton: Button;

  nameInput: null | HTMLInputElement;

  constructor() {
    super();

    this.classes = {
      baseClass: 'car-creator',
    };

    this.colorRange = new ColorRange(null);
    this.submitButton = new Button('create car', null);
    this.nameInput = null;

    this.init();
  }

  init() {
    this.nameInput = this.createElem('input', null, null, null, { type: 'text' }) as HTMLInputElement;

    this.elem = this.createElem(
      'div',
      [this.nameInput, this.colorRange.getElem(), this.submitButton.getElem()],
      this.classes.baseClass
    );
  }
}
