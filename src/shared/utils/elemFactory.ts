import { appendArg } from '../types/types';

export class ElemFactory {
  createElem<T extends appendArg>(tagName: string, classes?: string[], content?: Array<T>, id?: string) {
    const elem = document.createElement(tagName);
    classes && elem.classList.add(...classes.filter((className) => !!className));
    id && elem.setAttribute('id', id);
    content && elem.append(...content);

    return elem;
  }
}
