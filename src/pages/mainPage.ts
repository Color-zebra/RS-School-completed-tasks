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
    this.aside = new Aside(this.changeLevel.bind(this));
    this.header = new Header();
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

  public changeLevel(level: number) {
    console.log(this);
    this.game.initLevel(level);
  }
}
