import CarCreator from '../../entities/CarCreator/CarCreator';
import CarUpdater from '../../entities/CarUpdater/CarUpdater';
import ElemController from '../../shared/utils/ElemController';
import Race from '../../widgets/Race/Race';
import './garage.scss';

export default class Garage extends ElemController {
  classes: Record<string, string>;

  addClasses: string[];

  private race: Race;

  private carUpdater: CarUpdater;

  private carCreator: CarCreator;

  constructor(addClasses: string[] | null) {
    super();

    this.classes = {
      baseClass: 'garage',
    };
    this.addClasses = addClasses || [];

    this.race = new Race(null);
    this.carUpdater = new CarUpdater();
    this.carCreator = new CarCreator();

    this.init();
  }

  protected init() {
    this.elem = this.createElem(
      'div',
      [this.carCreator.getElem(), this.carUpdater.getElem(), this.race.getElem()],
      this.classes.baseClass
    );
  }
}
