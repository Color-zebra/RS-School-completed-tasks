import Garage from '../../pages/Garage/Garage';
import Winners from '../../pages/Winners/Winners';
import ElemController from '../../shared/utils/ElemController';
import Footer from '../../widgets/Footer/Footer';
import Header from '../../widgets/Header/Header';

export default class Router extends ElemController {
  protected classes: Record<string, string>;

  protected header: Header;

  protected footer: Footer;

  protected winnersPage: Winners;

  protected garagePage: Garage;

  constructor() {
    super();

    this.classes = {
      baseClass: 'wrapper',
    };

    this.header = new Header(null);
    this.footer = new Footer(null);
    this.garagePage = new Garage(null);
    this.winnersPage = new Winners();

    this.init();
  }

  protected init() {
    const page = this.createElem(
      'main',
      [this.garagePage.getElem(), this.winnersPage.getElem()],
      this.classes.baseClass
    );
    this.elem = this.createElem('div', [this.header.getElem(), page, this.footer.getElem()], this.classes.baseClass);
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
