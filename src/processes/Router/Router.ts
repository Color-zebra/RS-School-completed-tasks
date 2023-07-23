import Garage from '../../pages/Garage/Garage';
import Winners from '../../pages/Winners/Winners';
import { CustomEvents, ModeNames } from '../../shared/types/enums';
import ElemController from '../../shared/utils/ElemController';
import Footer from '../../widgets/Footer/Footer';
import Header from '../../widgets/Header/Header';
import ModeChangePopup from '../../widgets/ModeChangePopup/ModeChangePopup';

export default class Router extends ElemController {
  protected classes: Record<string, string>;

  protected header: Header;

  protected footer: Footer;

  protected winnersPage: Winners;

  protected garagePage: Garage;

  private mode: ModeNames;

  private modePopup: ModeChangePopup;

  constructor() {
    super();

    this.classes = {
      baseClass: 'wrapper',
      pageClass: 'main',
    };

    this.mode = ModeNames.strict;

    this.header = new Header(null, () =>
      this.modePopup.showPopup(this.mode === ModeNames.fun ? ModeNames.strict : ModeNames.fun)
    );
    this.footer = new Footer(null);
    this.garagePage = new Garage(null);
    this.winnersPage = new Winners();
    this.modePopup = new ModeChangePopup(() => this.changeMode());

    this.init();
  }

  protected init() {
    document.body.dataset.mode = 'strict';
    const page = this.createElem(
      'main',
      [this.garagePage.getElem(), this.winnersPage.getElem()],
      this.classes.pageClass
    );
    this.elem = this.createElem('div', [this.header.getElem(), page, this.footer.getElem()], this.classes.baseClass);
    this.hydrate();
  }

  hydrate() {
    this.changeView();
    window.addEventListener('hashchange', () => {
      this.changeView();
    });
    this.elem?.addEventListener(CustomEvents.newWinner, () => {
      this.winnersPage.renderWinners();
    });
    this.elem?.addEventListener(CustomEvents.deleteWinner, (e) => {
      const { id } = (e as CustomEvent).detail;
      if (this.winnersPage.currPageWinners.some((winner) => winner.id === id)) {
        this.winnersPage.renderWinners();
      }
    });
    this.elem?.addEventListener(CustomEvents.updateEnd, (e) => {
      const { id } = (e as CustomEvent).detail.car;
      if (this.winnersPage.currPageWinners.some((winner) => winner.id === id)) {
        this.winnersPage.renderWinners();
      }
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

  changeMode() {
    if (this.mode === ModeNames.fun) {
      this.mode = ModeNames.strict;
      this.garagePage.changeMode(this.mode);
      this.winnersPage.changeMode(this.mode);
      document.body.dataset.mode = 'strict';
    } else {
      this.mode = ModeNames.fun;
      this.garagePage.changeMode(this.mode);
      this.winnersPage.changeMode(this.mode);
      document.body.dataset.mode = 'fun';
    }
  }
}
