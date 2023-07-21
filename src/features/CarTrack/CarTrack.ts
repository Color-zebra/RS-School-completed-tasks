import { brandTransformer, modelTransformer } from '../../shared/data/carName';
import Button from '../../shared/elements/Button/Button';
import CarIcon from '../../shared/elements/CarIcon/CarIcon';
import { CustomEvents, ModeNames } from '../../shared/types/enums';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
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

  serverAPI: ServerAPI;

  finishOffset: number;

  trackLength: number;

  isEngineWork: boolean;

  currDistance: number;

  speed: number;

  startTime: number;

  totalTime: number;

  constructor(addClasses: [string] | null, car: Car) {
    super();

    this.classes = {
      baseClass: 'car-track',
      controlsClass: 'car-track__controls',
      trackClass: 'car-track__track',
    };
    this.addClasses = addClasses || [];

    this.startButton = new Button('start', null, async () => {
      await this.startEngine();
      this.startCar();
    });
    this.stopButton = new Button('stop', null, () => this.stopCar());
    this.changeButton = new Button('change', null, () => this.initCarChanging());
    this.deleteButton = new Button('delete', null, () => this.deleteCar());
    this.icon = new CarIcon(car);
    this.nameElem = null;

    this.finishOffset = 110;
    this.trackLength = window.innerWidth - this.finishOffset;
    this.isEngineWork = true;
    this.currDistance = 0;
    this.speed = 0;
    this.startTime = 0;
    this.totalTime = 0;

    this.carName = car.name;
    this.carColor = car.color;
    this.carId = car.id;

    this.serverAPI = ServerAPI.getInstance();

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

    this.hydrate();
  }

  hydrate() {
    window.addEventListener('resize', () => {
      const oldLength = this.trackLength;
      this.trackLength = window.innerWidth - this.finishOffset;
      if (this.speed !== 0) {
        const coefficient = this.trackLength / oldLength;
        this.speed *= coefficient;
      }
    });
    this.setControlsStateToStart();
  }

  async startCar(isRace?: boolean) {
    const move = () => {
      this.icon.getElem().style.transform = `translateX(${this.currDistance}px)`;
      this.currDistance += this.speed;
      if (this.currDistance <= this.trackLength && this.isEngineWork) {
        requestAnimationFrame(move);
      } else if (isRace && this.isEngineWork) {
        this.signalFinish();
      }
    };

    requestAnimationFrame(move);
    this.startTime = Date.now();

    if (!isRace) this.setControlsStateToRace();

    const res = await this.serverAPI.driveCar(this.carId);
    if (res === 500) {
      this.isEngineWork = false;
    }

    return this.carId;
  }

  signalFinish() {
    this.totalTime = (Date.now() - this.startTime) / 1000;
    const event = new CustomEvent(CustomEvents.finish, {
      bubbles: true,
      detail: {
        carId: this.carId,
        totalTime: this.totalTime,
      },
    });

    this.elem?.dispatchEvent(event);
  }

  async startEngine() {
    this.disableAllControls();

    const params = await this.serverAPI.startCarEngine(this.carId);

    if (!params) return;
    this.speed = this.trackLength / (params.distance / params.velocity / 1000) / 60;

    this.currDistance = 0;
    this.isEngineWork = true;
  }

  async stopCar(race?: boolean) {
    this.disableAllControls();
    await this.serverAPI.stopCarEngine(this.carId);
    this.isEngineWork = false;
    this.icon.getElem().style.transform = 'none';
    this.currDistance = 0;
    if (!race) this.setControlsStateToStart();
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

  setControlsStateToRace() {
    this.stopButton.enable();
    this.startButton.disable();
    this.changeButton.disable();
    this.deleteButton.disable();
  }

  setControlsStateToStart() {
    this.stopButton.disable();
    this.startButton.enable();
    this.changeButton.enable();
    this.deleteButton.enable();
  }

  disableAllControls() {
    this.stopButton.disable();
    this.startButton.disable();
    this.changeButton.disable();
    this.deleteButton.disable();
  }

  changeMode(mode: ModeNames) {
    if (mode === ModeNames.fun) {
      this.transformName();
    } else {
      this.removeNameTransform();
    }
    this.changeIcon(mode);
  }

  changeIcon(mode: ModeNames) {
    this.icon.changeMode(mode);
  }

  transformName() {
    let [first, second] = [...this.carName.split(' ')];
    if (first && first in brandTransformer) {
      first = brandTransformer[first as keyof typeof brandTransformer];
    }
    if (second && second in modelTransformer) {
      second = modelTransformer[second as keyof typeof modelTransformer];
    }

    first = first === undefined ? '' : first;
    second = second === undefined ? '' : second;

    if (this.nameElem) this.nameElem.innerText = `${first} ${second}`;
  }

  removeNameTransform() {
    if (this.nameElem) this.nameElem.innerText = this.carName;
  }
}
