import CarUpdater from '../../entities/CarUpdater/CarUpdater';
import ElemController from '../../shared/utils/ElemController';
import Race from '../../widgets/Race/Race';
import './garage.scss';

export default class Garage extends ElemController {
  private race: Race;

  private carUpdater: CarUpdater;

  constructor() {
    super();

    this.race = new Race(null);
    this.carUpdater = new CarUpdater();

    this.init();
  }

  protected init() {
    this.elem = this.createElem('h1', ["I'm garage page", this.carUpdater.getElem(), this.race.getElem()], null);
  }
}
