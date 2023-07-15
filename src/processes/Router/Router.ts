import Garage from '../../pages/Garage/Garage';
import Winners from '../../pages/Winners/Winners';
import ElemController from '../../shared/utils/ElemController';
import Header from '../../widgets/Header/Header';

export default class Router extends ElemController {
  protected header: Header;

  protected winnersPage: Winners;

  protected garagePage: Garage;

  constructor() {
    super();

    this.header = new Header(null);
    this.garagePage = new Garage();
    this.winnersPage = new Winners();

    this.init();
  }

  protected init() {
    const page = this.createElem('main', [this.garagePage.getElem(), this.winnersPage.getElem()], null);
    this.elem = this.createElem('div', [this.header.getElem(), page], 'wrapper');
    this.hydrate();
  }

  hydrate() {
    this.changeView();
    window.addEventListener('hashchange', () => {
      this.changeView();
    });
  }

  changeView() {
    const { hash } = window.location;
    switch (hash) {
      case '#garage':
        this.displayGarage();
        break;

      case '#winners':
        this.displayWinners();
        break;

      default:
        window.location.hash = 'garage';
    }
  }

  displayGarage() {
    this.garagePage.getElem().style.display = 'flex';
    this.winnersPage.getElem().style.display = 'none';
  }

  displayWinners() {
    this.garagePage.getElem().style.display = 'none';
    this.winnersPage.getElem().style.display = 'flex';
  }
}
