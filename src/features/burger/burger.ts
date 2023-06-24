import { ElemController } from '../../shared/utils/elemController';
import './burger.scss';

export class Burger extends ElemController {
  private classes: Record<string, string>;
  openMenu: () => void;
  closeMenu: () => void;

  constructor(openMenu: () => void, closeMenu: () => void) {
    super();

    this.classes = {
      burger: 'burger',
      line: 'burger__line',
    };

    this.openMenu = openMenu;
    this.closeMenu = closeMenu;

    this.init();
  }

  protected init() {
    const childrens = new Array(3);

    for (let i = 0; i < childrens.length; i++) {
      childrens[i] = this.factory.createElem('span', [this.classes.line]);
    }

    this.elem = this.factory.createElem('div', [this.classes.burger], childrens);

    this.hydrate();
  }

  private hydrate() {
    const burger = this.elem;
    this.elem?.addEventListener('click', () => {
      if (burger?.classList.contains('burger-shown')) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });
  }
}
