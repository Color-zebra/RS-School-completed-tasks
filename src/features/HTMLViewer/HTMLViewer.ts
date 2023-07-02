import { GameTag } from '../../shared/types/interfaces';
import { appendArg, gameLevel } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';

import './HTMLViewer.scss';

export class HTMLViewer extends ElemController {
  classes: Record<string, string>;
  private gameStrings: HTMLElement[];
  private indentSize: number;

  constructor() {
    super();
    this.classes = {
      baseClass: 'viewer',
      mainClass: 'game__viewer',
      codeString: 'html-code',
      codeTag: 'html-tag',
      codeAttr: 'html-attr',
      codeValue: 'html-value',
    };
    this.gameStrings = [];
    this.indentSize = 4;

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.mainClass, this.classes.baseClass], ["I'm HTML code viewer"]);
  }

  public initLevel(level: gameLevel) {
    if (!this.elem) return;
    this.elem.innerHTML = '';
    level.forEach((tag: GameTag) => {
      this.elem?.append(this.createGameStr(tag, 0));
    });
  }

  public getGameStrings() {
    return this.gameStrings;
  }

  private createGameStr(elem: GameTag, indentLevel: number) {
    const indent = ' '.repeat(indentLevel * this.indentSize);
    const content: appendArg[] = [];
    const classes: appendArg[] = [];
    const id: appendArg[] = [];
    const tag: appendArg = this.createElem('span', [this.classes.codeTag], [elem.tag]);

    if (elem.className) {
      const classAttr = this.createElem('span', [this.classes.codeAttr], [` class=`]);
      const classValue = this.createElem('span', [this.classes.codeValue], ['"', elem.className.join(' '), '"']);
      classes.push(classAttr, classValue);
    }

    if (elem.id) {
      const idAttr = this.createElem('span', [this.classes.codeAttr], [` id=`]);
      const idValue = this.createElem('span', [this.classes.codeValue], ['"', elem.id], '"');
      classes.push(idAttr, idValue);
    }

    if (elem.children) {
      content.push(`${indent}<`, tag, ...classes, ...id, `>`);
      content.push(
        ...elem.children.map((tag: GameTag) => {
          return this.createGameStr(tag, indentLevel + 1);
        })
      );
      content.push(`${indent}</`, tag.cloneNode(true) as HTMLElement, `>`);
    } else {
      content.push(`${indent}<`, tag.cloneNode(true) as HTMLElement, ...classes, ...id, ` />`);
    }

    const resElem = this.createElem('div', [this.classes.codeString], [...content]);
    this.gameStrings.push(resElem);
    return resElem;
  }
}
