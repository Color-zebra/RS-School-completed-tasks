import { Burger } from '../../features/burger/Burger';
import { ElemController } from '../../shared/utils/elemController';
import './header.scss';

export class Header extends ElemController {
  classes: Record<string, string>;
  burger: Burger;
  constructor(openMenu: () => void, closeMenu: () => void) {
    super();

    this.classes = {
      baseClass: 'header',
    };

    this.burger = new Burger(openMenu, closeMenu);

    this.init();
  }

  protected init() {
    this.elem = this.createElem('header', [this.classes.baseClass], ['RSS CSS Selectors', this.burger.getElem()]);
  }
}
