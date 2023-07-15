import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import './header.scss';

export default class Header extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  protected toGarageBtn: Button;

  protected toWinnersBtn: Button;

  constructor(addClasses: [string] | null) {
    super();

    this.classes = {
      baseClass: 'header',
    };
    this.addClasses = addClasses || [];

    this.toGarageBtn = new Button('Garage', ['header__garage-btn'], () => {
      window.location.hash = 'garage';
    });
    this.toWinnersBtn = new Button('Winners', ['header__winners-btn'], () => {
      window.location.hash = 'winners';
    });

    this.init();
  }

  protected init() {
    this.elem = this.createElem(
      'div',
      [this.toGarageBtn.getElem(), this.toWinnersBtn.getElem()],
      [this.classes.baseClass]
    );
  }
}
