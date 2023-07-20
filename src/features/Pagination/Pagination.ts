import Button from '../../shared/elements/Button/Button';
import ElemController from '../../shared/utils/ElemController';
import './pagination.scss';

export default class Pagination extends ElemController {
  protected classes: Record<string, string>;

  private prevButton: Button;

  private nextButton: Button;

  private pageNumberWindow: HTMLElement;

  constructor(prevBtnCB: () => void, nextBtnCB: () => void) {
    super();

    this.classes = {
      baseClass: 'pagination',
    };

    this.prevButton = new Button('<', null, prevBtnCB);
    this.nextButton = new Button('>', null, nextBtnCB);
    this.pageNumberWindow = this.createElem('span', ['1'], null);

    this.init();
  }

  init() {
    this.elem = this.createElem(
      'div',
      [this.prevButton.getElem(), this.pageNumberWindow, this.nextButton.getElem()],
      this.classes.baseClass
    );
  }

  updatePageNumber(pageNumber: number | string) {
    this.pageNumberWindow.innerText = String(pageNumber);
  }

  disablePrev() {
    this.prevButton.getElem().setAttribute('disabled', 'disabled');
  }

  disableNext() {
    this.nextButton.getElem().setAttribute('disabled', 'disabled');
  }

  enablePrev() {
    this.prevButton.getElem().removeAttribute('disabled');
  }

  enableNext() {
    this.nextButton.getElem().removeAttribute('disabled');
  }
}
