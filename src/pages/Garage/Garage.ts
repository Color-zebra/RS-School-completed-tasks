import CarCreator from '../../entities/CarCreator/CarCreator';
import CarUpdater from '../../entities/CarUpdater/CarUpdater';
import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import Race from '../../features/Race/Race';
import './garage.scss';
import ServerAPI from '../../shared/utils/ServerAPI';
import { CarInfo } from '../../shared/types/interfaces';

export default class Garage extends ElemController {
  classes: Record<string, string>;

  addClasses: string[];

  private race: Race;

  private carUpdater: CarUpdater;

  private carCreator: CarCreator;

  private startRaceButton: Button;

  private stopRaceButton: Button;

  private serverAPI: ServerAPI;

  constructor(addClasses: string[] | null) {
    super();

    this.classes = {
      baseClass: 'garage',
      controlsClass: 'garage__controls',
    };
    this.addClasses = addClasses || [];

    this.race = new Race(null);
    this.carUpdater = new CarUpdater();
    this.carCreator = new CarCreator();
    this.startRaceButton = new Button('start race', null, () => this.startRace());
    this.stopRaceButton = new Button('stop race', null, () => this.stopRace());

    this.serverAPI = ServerAPI.getInstance();

    this.init();
  }

  protected init() {
    const controlsBlock = this.createElem(
      'div',
      [
        this.carCreator.getElem(),
        this.carUpdater.getElem(),
        this.startRaceButton.getElem(),
        this.stopRaceButton.getElem(),
      ],
      this.classes.controlsClass
    );
    this.elem = this.createElem('div', [controlsBlock, this.race.getElem()], this.classes.baseClass);

    this.hydrate();
  }

  private hydrate() {
    this.elem?.addEventListener('car-delete', (e) => {
      const id: number = (e as CustomEvent).detail.carId;
      this.deleteCar(id);
    });
    this.elem?.addEventListener('car-create', (e) => {
      const carInfo: CarInfo = (e as CustomEvent).detail.car;
      this.createCar(carInfo);
    });
  }

  private startRace() {
    console.log('Race started');
  }

  private stopRace() {
    console.log('Race stopped');
  }

  private async deleteCar(id: number) {
    await this.serverAPI.deleteCar(id);
    this.race.renderCars();
  }

  private async createCar(car: CarInfo) {
    console.log(car);
    await this.serverAPI.saveCar(car);
    this.race.renderCars();
  }
}
