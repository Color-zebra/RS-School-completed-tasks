import Button from '../../shared/elements/Button/Button';
import ColorRange from '../../shared/elements/ColorRange/ColorRange';
import ElemController from '../../shared/utils/ElemController';
import './carupdater.scss';

export default class CarUpdater extends ElemController {
  classes: Record<string, string>;

  colorRange: ColorRange;

  submitButton: Button;

  nameInput: null | HTMLInputElement;

  constructor() {
    super();

    this.classes = {
      baseClass: 'car-updater',
    };

    this.colorRange = new ColorRange(null);
    this.submitButton = new Button('update car', null);
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
