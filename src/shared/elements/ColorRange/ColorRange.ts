import ElemController from '../../utils/ElemController';
import './colorrange.scss';

export default class ColorRange extends ElemController {
  protected classes: Record<string, string>;

  private choosenColor: string;

  protected addClasses: Array<string>;

  constructor(addClasses: string[] | null) {
    super();

    this.classes = {
      baseClass: 'color-input',
    };

    this.addClasses = addClasses || [];

    this.choosenColor = '';

    this.init();
  }

  protected init() {
    this.elem = this.createElem('input', null, this.classes.baseClass, null, { type: 'color' });
    this.choosenColor = (this.elem as HTMLInputElement).value;
    this.hydrate();
  }

  private hydrate() {
    this.elem?.addEventListener('input', () => {
      this.choosenColor = (this.elem as HTMLInputElement).value;
    });
  }

  public getColor() {
    return this.choosenColor;
  }

  public setColor(color: string) {
    this.choosenColor = color;
    (this.elem as HTMLInputElement).value = color;
  }
}
