import { ElemController } from '../shared/utils/elemController';
import { Aside } from '../widgets/aside/Aside';
import { Footer } from '../widgets/footer/Footer';
import { Game } from '../widgets/game/Game';
import { Header } from '../widgets/header/Header';
import './mainpage.scss';

export class MainPage extends ElemController {
  private aside: Aside;
  private header: Header;
  private footer: Footer;
  private game: Game;
  private classes: Record<string, string>;

  constructor() {
    super();
    this.aside = new Aside(this.changeLevel.bind(this), this.help.bind(this));
    this.header = new Header(this.openMenu.bind(this), this.closeMenu.bind(this));
    this.footer = new Footer();
    this.game = new Game();

    this.classes = {
      baseClass: 'wrapper',
    };

    this.init();
  }

  protected init() {
    this.elem = this.factory.createElem(
      'div',
      [this.classes.baseClass],
      [this.header.getElem(), this.game.getElem(), this.aside.getElem(), this.footer.getElem()]
    );
  }

  openMenu() {
    const burger = this.header.burger.getElem();
    const aside = this.aside.getElem();
    aside.classList.add('aside-shown');
    burger.classList.add('burger-shown');
  }

  closeMenu() {
    const burger = this.header.burger.getElem();
    const aside = this.aside.getElem();
    aside.classList.remove('aside-shown');
    burger.classList.remove('burger-shown');
  }

  public changeLevel(level: number) {
    this.game.initLevel(level);
    this.closeMenu();
  }

  public help() {
    this.game.help();
    this.closeMenu();
  }
}
