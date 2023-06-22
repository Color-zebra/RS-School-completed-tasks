import { GameTag } from '../types/interfaces';
import { appendArg } from '../types/types';

export const createGameElem = (elem: GameTag): HTMLElement => {
  const currElem = document.createElement(`${elem.tag}`);
  if (elem.children) {
    const children: appendArg[] = [];
    elem.children.forEach((tag: GameTag) => {
      children.push(createGameElem(tag));
    });
    currElem.append(...children);
  }
  return currElem;
};
