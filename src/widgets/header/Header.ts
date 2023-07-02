import { Burger } from '../../features/burger/Burger';
import { Theme } from '../../features/theme/Theme';
import { ElemController } from '../../shared/utils/elemController';
import './header.scss';

export class Header extends ElemController {
  classes: Record<string, string>;
  burger: Burger;
  theme: Theme;
  text: string;
  constructor(openMenu: () => void, closeMenu: () => void) {
    super();

    this.classes = {
      baseClass: 'header',
      titleClass: 'header__title',
    };
    this.text = 'RSS CSS Selectors';

    this.theme = new Theme('header__theme-switcher');
    this.burger = new Burger(openMenu, closeMenu);

    this.init();
  }

  protected init() {
    const text = this.createElem('span', [this.classes.titleClass], [this.text]);
    this.elem = this.createElem(
      'header',
      [this.classes.baseClass],
      [this.theme.getElem(), text, this.burger.getElem()]
    );
  }
}
