import { rightAnswers } from '../../shared/data/rightAnswers';
import { Button } from '../../shared/elements/Button';
import { ElemController } from '../../shared/utils/elemController';

import './csseditor.scss';

export class CSSEditor extends ElemController {
  classes: Record<string, string>;
  input: HTMLInputElement | null;
  label: HTMLElement | null;
  enterButton: Button;
  inputSpeed: number;
  onInputCallBack: () => void;
  timeout: ReturnType<typeof setInterval> | null;

  constructor(onInputCallBack: () => void) {
    super();

    this.classes = {
      baseClass: 'editor',
      mainClass: 'game__editor',
      inputContainerClass: 'editor__input-container',
      inputLabel: 'editor__label',
      inputClass: 'editor__input',
      buttonClass: 'editor__button',
      codeOperator: 'code-operator',
      codeClass: 'code-class',
      codeId: 'code-id',
    };
    this.inputSpeed = 200;
    this.input = null;
    this.label = null;
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
    this.input.addEventListener('input', () => {
      if (!this.input || !this.label) return;
      this.label.innerHTML = this.transformInput(this.input.value);
      const scrollLeft = this.input.scrollLeft + 10;
      if (scrollLeft) this.label.scrollLeft = scrollLeft;
    });

    this.enterButton.getElem().addEventListener('click', () => {
      this.onInputCallBack();
    });

    this.label = this.createElem('span', [this.classes.inputLabel], []);

    const inputContainer = this.createElem('div', [this.classes.inputContainerClass], [this.input, this.label]);

    this.elem = this.createElem(
      'div',
      [this.classes.mainClass, this.classes.baseClass],
      [inputContainer, this.enterButton.getElem()]
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
    if (this.input && this.label) {
      this.input.value = '';
      this.label.innerHTML = '';
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  transformInput(str: string) {
    const deviders = ' #.,+>~';
    const operators = '+>~';

    let res = '';
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      if (deviders.includes(str[i]) && stack.length !== 0) {
        console.log('close');
        res += '</span>';
        stack.pop();
      }

      if (operators.includes(str[i])) {
        res += '<span class="code-operator">' + str[i] + '</span>';
        continue;
      }
      if (str[i] === '.') {
        res += '<span class="code-class">';
        stack.push('*');
      }
      if (str[i] === '#') {
        res += '<span class="code-id">';
        stack.push('*');
      }
      res += str[i];
    }

    if (stack.length !== 0) res += '</span>';

    return res;
  }
}
