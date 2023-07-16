import ElemController from '../../shared/utils/ElemController';
import Race from '../../widgets/Race/Race';
import './garage.scss';

export default class Garage extends ElemController {
  private race: Race;

  constructor() {
    super();

    this.race = new Race(null);

    this.init();
  }

  protected init() {
    console.log(this.race);
    this.elem = this.createElem('h1', ["I'm garage page", this.race.getElem()], null);
  }
}
