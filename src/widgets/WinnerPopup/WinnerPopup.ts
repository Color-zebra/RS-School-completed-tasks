import ElemController from '../../shared/utils/ElemController';
import './winnerpopup.scss';

export default class WinnerPopup extends ElemController {
  protected classes: Record<string, string>;

  protected texts: Record<string, string>;

  winnerNameElem: HTMLElement;

  winnerTimeElem: HTMLElement;

  constructor() {
    super();

    this.classes = {
      baseClass: 'winner-popup',
      content: 'winner-popup__content',
      winnerName: 'winner-popup__name',
      winnerTime: 'winner-popup__time',
      show: 'winner-popup_shown',
    };

    this.texts = {
      winner: 'The winner is',
      time: 'With time',
    };

    this.winnerNameElem = this.createElem('span', null, this.classes.winnerName);
    this.winnerTimeElem = this.createElem('span', null, this.classes.winnerTime);

    this.init();
  }

  init() {
    const nameText = this.createElem('span', [this.texts.winner], null);
    const timeText = this.createElem('span', [this.texts.time], null);
    const content = this.createElem(
      'div',
      [nameText, this.winnerNameElem, timeText, this.winnerTimeElem],
      this.classes.content
    );
    this.elem = this.createElem('div', [content], this.classes.baseClass);
  }

  showPopup(name: string, time: string | number) {
    console.log('show');
    this.winnerNameElem.innerText = name;
    this.winnerTimeElem.innerText = String(time);
    if (!this.elem) return;
    document.body.append(this.elem);
    this.elem.classList.add(this.classes.show);
    this.elem.addEventListener(
      'animationend',
      () => {
        this.elem?.classList.remove(this.classes.show);
        this.elem?.remove();
      },
      {
        once: true,
      }
    );
  }
}
