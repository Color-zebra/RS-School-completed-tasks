import { ElemController } from '../shared/utils/elemController';
import { Aside } from '../widgets/aside/aside';
import { Footer } from '../widgets/footer/Footer';
import { Game } from '../widgets/game/Game';
import { Header } from '../widgets/header/Header';

export class MainPage extends ElemController {
  private aside: Aside;
  private header: Header;
  private footer: Footer;
  private game: Game;

  constructor() {
    super();
    this.aside = new Aside();
    this.header = new Header();
    this.footer = new Footer();
    this.game = new Game();
  }

  public init() {
    this.elem = this.factory.createElem(
      'div',
      [],
      [this.header.getElem(), this.game.getElem(), this.aside.getElem(), this.footer.getElem()]
    );
  }
}
