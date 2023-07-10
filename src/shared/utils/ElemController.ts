import { appendArg, classArg } from '../types/types';

export abstract class ElemController {
  protected abstract init(): void;
  protected elem: null | HTMLElement;

  constructor() {
    this.elem = null;
  }

  createElem<T extends appendArg>(
    tag: string,
    content: Array<T> | null,
    classes: classArg,
    id?: string,
    attributes?: Record<string, string>
  ) {
    const elem = document.createElement(tag);

    content && elem.append(...content);
    id && elem.setAttribute('id', id);

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
}
