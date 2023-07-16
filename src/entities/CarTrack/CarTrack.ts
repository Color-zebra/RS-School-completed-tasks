import Button from '../../shared/elements/Button/Button';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import './cartrack.scss';

export default class CarTrack extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string>;

  protected startButton: Button;

  protected stopButton: Button;

  protected changeButton: Button;

  protected deleteButton: Button;

  private carName: string;

  private carColor: string;

  private carId: number;

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
    this.changeButton = new Button('change', null, () => this.changeCar());
    this.deleteButton = new Button('delete', null, () => this.deleteCar());

    this.carName = car.name;
    this.carColor = car.color;
    this.carId = car.id;

    this.init();
  }

  init() {
    const controls = this.createElem(
      'div',
      [this.startButton.getElem(), this.stopButton.getElem(), this.changeButton.getElem(), this.deleteButton.getElem()],
      this.classes.controlsClass
    );

    const track = this.createElem('div', null, this.classes.trackClass);

    this.elem = this.createElem('div', [controls, track], this.classes.baseClass);
  }

  startCar() {
    console.log('starting', this.carId);
  }

  stopCar() {
    console.log('stopping', this.carId);
  }

  changeCar() {
    console.log('changing', this.carId);
  }

  deleteCar() {
    console.log('deleting', this.carId);
  }
}
