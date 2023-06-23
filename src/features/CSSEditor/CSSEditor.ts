import { ElemController } from '../../shared/utils/elemController';

export class CSSEditor extends ElemController {
  classes: Record<string, string>;
  input: HTMLInputElement | null;
  onInputCallBack: (ans: string) => void;
  constructor(onInputCallBack: (ans: string) => void) {
    super();

    this.classes = {
      baseClass: 'game__editor',
    };
    this.input = null;
    this.onInputCallBack = onInputCallBack;

    this.init();
  }

  init() {
    this.input = this.createElem('input', [], []) as HTMLInputElement;
    this.input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.input && this.onInputCallBack(this.input.value);
      }
    });
    this.elem = this.createElem('div', [this.classes.baseClass], [this.input]);
  }
}
