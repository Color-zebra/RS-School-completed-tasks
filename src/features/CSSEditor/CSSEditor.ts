import { rightAnswers } from '../../shared/data/rightAnswers';
import { ElemController } from '../../shared/utils/elemController';

export class CSSEditor extends ElemController {
  classes: Record<string, string>;
  input: HTMLInputElement | null;
  inputSpeed: number;
  onInputCallBack: () => void;
  timeout: ReturnType<typeof setInterval> | null;

  constructor(onInputCallBack: () => void) {
    super();

    this.classes = {
      baseClass: 'game__editor',
    };
    this.inputSpeed = 200;
    this.input = null;
    this.timeout = null;

    this.onInputCallBack = onInputCallBack;

    this.init();
  }

  protected init() {
    this.input = this.createElem('input', [], []) as HTMLInputElement;
    this.input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.input && this.onInputCallBack();
      }
    });
    this.elem = this.createElem('div', [this.classes.baseClass], [this.input]);
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
