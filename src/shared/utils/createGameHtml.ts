import { GameTag } from '../types/interfaces';
import { appendArg } from '../types/types';
import { ElemFactory } from './elemFactory';
const factory = new ElemFactory();
const indentSize = 4;
const codeStringClass = 'html-code';

export const createGameHtml = (elem: GameTag, spaces = 0): HTMLElement => {
  const indent = ' '.repeat(spaces);
  const content: appendArg[] | appendArg = [];

  if (elem.children) {
    content.push(`${indent}<${elem.tag}>`);
    content.push(
      ...elem.children.map((tag: GameTag) => {
        return createGameHtml(tag, spaces + indentSize);
      })
    );
    content.push(`${indent}</${elem.tag}>`);
  } else {
    content.push(`${indent}<${elem.tag} />`);
  }

  return factory.createElem('div', [codeStringClass], [...content]);
};
