import CarCreator from '../../features/CarCreator/CarCreator';
import CarUpdater from '../../features/CarUpdater/CarUpdater';
import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import Race from '../../widgets/Race/Race';
import './garage.scss';
import ServerAPI from '../../shared/utils/ServerAPI';
import { Car, CarInfo } from '../../shared/types/interfaces';
import CarInfoGenerator from '../../shared/utils/CarInfoGenerator';
import { CustomEvents } from '../../shared/types/enums';

export default class Garage extends ElemController {
  classes: Record<string, string>;

  addClasses: string[];

  private race: Race;

  private carUpdater: CarUpdater;

  private carCreator: CarCreator;

  private startRaceButton: Button;

  private stopRaceButton: Button;

  carGeneratorButton: Button;

  private serverAPI: ServerAPI;

  private carInfoGenerator: CarInfoGenerator;

  massGenerationCount: number;

  constructor(addClasses: string[] | null) {
    super();

    this.classes = {
      baseClass: 'garage',
      controlsClass: 'garage__controls',
    };
    this.addClasses = addClasses || [];

    this.carUpdater = new CarUpdater();
    this.carCreator = new CarCreator();
    this.startRaceButton = new Button('start race', null, () => this.startRace());
    this.stopRaceButton = new Button('stop race', null, () => this.stopRace());
    this.carGeneratorButton = new Button('generate 100 cars', null, () => this.massCarGeneration());
    this.race = new Race(
      null,
      () => this.disableAllControls(),
      () => this.setControlsStateToStart(),
      () => this.setControlsStateToRace()
    );

    this.massGenerationCount = 100;

    this.serverAPI = ServerAPI.getInstance();
    this.carInfoGenerator = CarInfoGenerator.getInstance();

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
        this.carGeneratorButton.getElem(),
      ],
      this.classes.controlsClass
    );
    this.elem = this.createElem('div', [controlsBlock, this.race.getElem()], this.classes.baseClass);

    this.hydrate();
  }

  private hydrate() {
    this.elem?.addEventListener(CustomEvents.create, (e) => {
      const carInfo: CarInfo = (e as CustomEvent).detail.car;
      this.createCar(carInfo);
    });

    this.elem?.addEventListener(CustomEvents.updateStart, (e) => {
      const car: Car = { ...(e as CustomEvent).detail.car };
      this.carUpdater.initCarUpdate(car);
    });

    this.elem?.addEventListener(CustomEvents.updateEnd, (e) => {
      const car: Car = { ...(e as CustomEvent).detail.car };
      this.race.updateSingleCar(car);
    });
  }

  private startRace() {
    this.race.startRace();
  }

  private stopRace() {
    this.race.stopRace();
  }

  async massCarGeneration() {
    const carsInfo = [...Array(this.massGenerationCount)].map(() => this.carInfoGenerator.generateRandomCar());
    const promises = carsInfo.map((carInfo: CarInfo) => this.serverAPI.saveCar(carInfo));
    await Promise.all(promises);
    this.race.renderCars();
  }

  private async createCar(car: CarInfo) {
    await this.serverAPI.saveCar(car);
    this.race.renderCars();
  }

  setControlsStateToRace() {
    this.stopRaceButton.enable();
    this.startRaceButton.disable();
    this.carGeneratorButton.disable();
    this.carCreator.submitButton.enable();
  }

  setControlsStateToStart() {
    this.stopRaceButton.disable();
    this.startRaceButton.enable();
    this.carGeneratorButton.enable();
    this.carCreator.submitButton.enable();
  }

  disableAllControls() {
    this.stopRaceButton.disable();
    this.startRaceButton.disable();
    this.carGeneratorButton.disable();
    this.carCreator.submitButton.disable();
  }
}
