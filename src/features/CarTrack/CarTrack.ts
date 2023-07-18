import Button from '../../shared/elements/Button/Button';
import CarIcon from '../../shared/elements/CarIcon/CarIcon';
import { CustomEvents } from '../../shared/types/enums';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import './cartrack.scss';

export default class CarTrack extends ElemController {
  protected classes: Record<string, string>;

  private addClasses: Array<string>;

  private startButton: Button;

  private stopButton: Button;

  private changeButton: Button;

  private deleteButton: Button;

  private nameElem: null | HTMLElement;

  private carName: string;

  private carColor: string;

  public readonly carId: number;

  private icon: CarIcon;

  constructor(addClasses: [string] | null, car: Car) {
    super();

    this.classes = {
      baseClass: 'car-track',
      controlsClass: 'car-track__controls',
      trackClass: 'car-track__track',
    };
    this.addClasses = addClasses || [];

    this.startButton = new Button('start', null, () => this.startCar());
    this.stopButton = new Button('stop', null, () => this.stopCar());
    this.changeButton = new Button('change', null, () => this.initCarChanging());
    this.deleteButton = new Button('delete', null, () => this.deleteCar());

    this.icon = new CarIcon(car);
    this.nameElem = null;

    this.carName = car.name;
    this.carColor = car.color;
    this.carId = car.id;

    this.init();
  }

  init() {
    this.nameElem = this.createElem('span', [this.carName], null);

    const controls = this.createElem(
      'div',
      [
        this.nameElem,
        this.startButton.getElem(),
        this.stopButton.getElem(),
        this.changeButton.getElem(),
        this.deleteButton.getElem(),
      ],
      this.classes.controlsClass
    );

    const track = this.createElem('div', [this.icon.getElem()], this.classes.trackClass);

    this.elem = this.createElem('div', [controls, track], this.classes.baseClass);
  }

  startCar() {
    console.log('starting', this.carId);
  }

  stopCar() {
    console.log('stopping', this.carId);
  }

  changeCar(newColor: string, newName: string) {
    this.carColor = newColor;
    this.carName = newName;

    if (!this.nameElem) return;
    this.nameElem.innerText = this.carName;
    this.icon.changeColor(newColor);
  }

  initCarChanging() {
    const car = {
      name: this.carName,
      color: this.carColor,
      id: this.carId,
    };

    const event = new CustomEvent(CustomEvents.updateStart, {
      bubbles: true,
      detail: {
        car,
      },
    });

    this.elem?.dispatchEvent(event);
  }

  deleteCar() {
    const event = new CustomEvent(CustomEvents.delete, {
      bubbles: true,
      detail: {
        carId: this.carId,
      },
    });

    this.elem?.dispatchEvent(event);
  }
}
