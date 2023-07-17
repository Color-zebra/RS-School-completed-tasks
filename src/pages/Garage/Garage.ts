import CarCreator from '../../entities/CarCreator/CarCreator';
import CarUpdater from '../../entities/CarUpdater/CarUpdater';
import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import Race from '../../widgets/Race/Race';
import './garage.scss';

export default class Garage extends ElemController {
  classes: Record<string, string>;

  addClasses: string[];

  private race: Race;

  private carUpdater: CarUpdater;

  private carCreator: CarCreator;

  private startRaceButton: Button;

  private stopRaceButton: Button;

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
  }

  private startRace() {
    console.log('Race started');
  }

  private stopRace() {
    console.log('Race stopped');
  }
}
