import { rightAnswers } from '../../shared/data/rightAnswers';
import { Button } from '../../shared/elements/Button';
import { ElemController } from '../../shared/utils/elemController';

import './csseditor.scss';

export class CSSEditor extends ElemController {
  classes: Record<string, string>;
  input: HTMLInputElement | null;
  enterButton: Button;
  inputSpeed: number;
  onInputCallBack: () => void;
  timeout: ReturnType<typeof setInterval> | null;

  constructor(onInputCallBack: () => void) {
    super();

    this.classes = {
      baseClass: 'editor',
      mainClass: 'game__editor',
      inputClass: 'editor__input',
      buttonClass: 'editor__button',
    };
    this.inputSpeed = 200;
    this.input = null;
    this.timeout = null;
    this.enterButton = new Button('enter', this.classes.buttonClass);

    this.onInputCallBack = onInputCallBack;

    this.init();
  }

  protected init() {
    this.input = this.createElem('input', [this.classes.inputClass], []) as HTMLInputElement;
    this.input.setAttribute('placeholder', 'Type your selector here');
    this.input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.input && this.onInputCallBack();
      }
    });
    this.elem = this.createElem(
      'div',
      [this.classes.mainClass, this.classes.baseClass],
      [this.input, this.enterButton.getElem()]
    );
  }

  public getAnswer() {
    return this.input?.value;
  }

  public giveAnswer(level: number, callback: () => void) {
    if (!this.input) return;
    this.clearInput();
    if (this.timeout) {
      clearInterval(this.timeout);
    }

    const ans = rightAnswers[level];
    const inp = this.input;
    const speed = this.inputSpeed;

    let i = 0;
    this.timeout = setInterval(() => {
      if (i >= ans.length && this.timeout) {
        clearInterval(this.timeout);
        callback();
        return;
      }
      inp.value += ans[i];
      i++;
    }, speed);
  }

  clearInput() {
    if (this.input) {
      this.input.value = '';
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }
}
