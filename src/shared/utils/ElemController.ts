import { AppendArg, ClassArg } from '../types/types';

export default abstract class ElemController {
  protected abstract init(): void;
  protected abstract classes: Record<string, string>;

  protected elem: null | HTMLElement;

  constructor() {
    this.elem = null;
  }

  protected createElem<T extends AppendArg>(
    tag: string,
    content: Array<T> | null,
    classes: ClassArg | null,
    id?: string | null,
    attributes?: Record<string, string>
  ) {
    const elem = document.createElement(tag);

    if (content) {
      elem.append(...content);
    }
    if (id) {
      elem.setAttribute('id', id);
    }
    if (attributes) {
      Object.entries(attributes).forEach((pair) => {
        const [attr, value] = [...pair];
        elem.setAttribute(attr, value);
      });
    }
    if (classes) {
      const currClasses = Array.isArray(classes) ? classes : [classes];
      elem.classList.add(...currClasses);
    }

    return elem;
  }

  getElem() {
    return this.elem || this.createElem('div', null, null);
  }
}
