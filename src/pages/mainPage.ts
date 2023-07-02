import { Popup } from '../shared/elements/Popup';
import { EventEmitter } from '../shared/emitter/Emitter';
import { StorageAPI } from '../shared/storage/StorageAPI';
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
  private storageAPI: StorageAPI;
  private classes: Record<string, string>;
  private emitter: EventEmitter;
  private popup: Popup;

  constructor() {
    super();
    this.storageAPI = new StorageAPI();
    this.emitter = new EventEmitter();

    this.header = new Header(this.openMenu.bind(this), this.closeMenu.bind(this));
    this.footer = new Footer();
    this.game = new Game(this.storageAPI.choosenLevel);
    this.popup = new Popup();
    this.aside = new Aside(
      this.storageAPI.choosenLevel,
      this.storageAPI.gameState,
      this.changeLevel.bind(this),
      this.help.bind(this)
    );

    this.classes = {
      baseClass: 'wrapper',
    };

    this.init();
  }

  protected init() {
    this.elem = this.factory.createElem(
      'div',
      [this.classes.baseClass],
      [this.popup.getElem(), this.header.getElem(), this.game.getElem(), this.aside.getElem(), this.footer.getElem()]
    );

    this.emitter.subscribe('level-change', (level) => {
      if (typeof level === 'number') {
        this.aside.setChoosenLevel(level);
        this.storageAPI.setCurrLevel(level);
      }
      this.aside.updateAside();
    });

    this.emitter.subscribe('state-change', (gameState) => {
      if (gameState && typeof gameState !== 'number') {
        this.storageAPI.setCurrGameState(gameState);
        this.aside.setGameState(gameState);
      }
      this.aside.updateAside();
    });

    this.emitter.subscribe('reset-game', () => {
      const emptyState = this.storageAPI.reset();
      this.aside.setGameState(emptyState);
      this.game.setGameState(emptyState);
      this.aside.setChoosenLevel(0);
      this.aside.updateAside();
      this.changeLevel(0);
    });

    this.emitter.subscribe('open-popup', () => {
      this.popup.showPopup();
    });
  }

  public openMenu() {
    const burger = this.header.burger.getElem();
    const aside = this.aside.getElem();
    aside.classList.add('aside-shown');
    burger.classList.add('burger-shown');
  }

  public closeMenu() {
    const burger = this.header.burger.getElem();
    const aside = this.aside.getElem();
    aside.classList.remove('aside-shown');
    burger.classList.remove('burger-shown');
  }

  public changeLevel(level: number) {
    this.emitter.emit('level-change', level);
    this.game.initLevel(level);
    this.closeMenu();
  }

  public help() {
    this.game.help();
    this.closeMenu();
  }

  public updateAside() {
    this.aside;
  }
}
