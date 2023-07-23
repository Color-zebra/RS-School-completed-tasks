import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import './header.scss';

export default class Header extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  protected toGarageBtn: Button;

  protected toWinnersBtn: Button;

  protected switchModeBtn: Button;

  constructor(addClasses: [string] | null, switchModeCB: () => void) {
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
    this.switchModeBtn = new Button(null, ['header__switch-btn', 'btn_spec'], () => {
      switchModeCB();
    });

    this.init();
  }

  protected init() {
    this.elem = this.createElem(
      'div',
      [this.toGarageBtn.getElem(), this.switchModeBtn.getElem(), this.toWinnersBtn.getElem()],
      [this.classes.baseClass]
    );
  }
}
