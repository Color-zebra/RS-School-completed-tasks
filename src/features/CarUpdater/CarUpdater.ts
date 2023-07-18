import Button from '../../shared/elements/Button/Button';
import ColorRange from '../../shared/elements/ColorRange/ColorRange';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import './carupdater.scss';

export default class CarUpdater extends ElemController {
  classes: Record<string, string>;

  colorRange: ColorRange;

  submitButton: Button;

  nameInput: HTMLInputElement;

  updatedCarId: null | number;

  constructor() {
    super();

    this.classes = {
      baseClass: 'car-updater',
    };

    this.colorRange = new ColorRange(null);
    this.submitButton = new Button('update car', null, () => this.finishCarUpdate());
    this.nameInput = this.createElem('input', null, null, null, { type: 'text' }) as HTMLInputElement;
    this.updatedCarId = null;

    this.init();
  }

  init() {
    this.elem = this.createElem(
      'div',
      [this.nameInput, this.colorRange.getElem(), this.submitButton.getElem()],
      this.classes.baseClass
    );
  }

  initCarUpdate(car: Car) {
    this.updatedCarId = car.id;
    this.colorRange.setColor(car.color);
    this.nameInput.value = car.name;
  }

  finishCarUpdate() {
    if (this.updatedCarId === null) return;

    const updatedCar: Car = {
      name: this.nameInput.value,
      color: this.colorRange.getColor(),
      id: this.updatedCarId,
    };

    console.log(updatedCar);

    const event = new CustomEvent('car-updating-finish', {
      bubbles: true,
      detail: {
        car: updatedCar,
      },
    });

    this.elem?.dispatchEvent(event);
  }
}
