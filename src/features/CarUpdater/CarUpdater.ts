import Button from '../../shared/elements/Button/Button';
import ColorRange from '../../shared/elements/ColorRange/ColorRange';
import { CustomEvents } from '../../shared/types/enums';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
import './carupdater.scss';

export default class CarUpdater extends ElemController {
  classes: Record<string, string>;

  colorRange: ColorRange;

  submitButton: Button;

  nameInput: HTMLInputElement;

  updatedCarId: null | number;

  serverAPI: ServerAPI;

  baseColor: string;

  constructor() {
    super();

    this.classes = {
      baseClass: 'car-updater',
    };

    this.colorRange = new ColorRange(null);
    this.submitButton = new Button('update car', null, () => this.finishCarUpdate());
    this.nameInput = this.createElem('input', null, null, null, { type: 'text' }) as HTMLInputElement;
    this.updatedCarId = null;
    this.baseColor = '#000000';

    this.serverAPI = ServerAPI.getInstance();

    this.init();
  }

  init() {
    this.elem = this.createElem(
      'div',
      [this.nameInput, this.colorRange.getElem(), this.submitButton.getElem()],
      this.classes.baseClass
    );

    this.submitButton.disable();
  }

  initCarUpdate(car: Car) {
    this.updatedCarId = car.id;
    this.colorRange.setColor(car.color);
    this.nameInput.value = car.name;
    this.submitButton.enable();
  }

  async finishCarUpdate() {
    if (this.updatedCarId === null) return;

    const updatedCar: Car = {
      name: this.nameInput.value,
      color: this.colorRange.getColor(),
      id: this.updatedCarId,
    };

    await this.serverAPI.updateCar(updatedCar);

    const event = new CustomEvent(CustomEvents.updateEnd, {
      bubbles: true,
      detail: {
        car: updatedCar,
      },
    });

    this.elem?.dispatchEvent(event);

    this.clear();
  }

  clear() {
    this.colorRange.setColor(this.baseColor);
    this.nameInput.value = '';
    this.updatedCarId = null;
    this.submitButton.disable();
  }
}
