import { GameTag } from '../../shared/types/interfaces';
import { appendArg, gameLevel } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';

export class HTMLViewer extends ElemController {
  classes: Record<string, string>;
  private gameStrings: HTMLElement[];
  private indentSize: number;

  constructor() {
    super();
    this.classes = {
      baseClass: 'game__viewer',
      codeString: 'html-code',
    };
    this.gameStrings = [];
    this.indentSize = 4;

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.classes.baseClass], ["I'm HTML code viewer"]);
  }

  public initLevel(level: gameLevel) {
    level.forEach((tag: GameTag) => {
      this.elem?.append(this.createGameStr(tag, 0));
    });
  }

  getGameStrings() {
    return this.gameStrings;
  }

  private createGameStr(elem: GameTag, indentLevel: number) {
    const indent = ' '.repeat(indentLevel * this.indentSize);
    const content: appendArg[] | appendArg = [];
    const tagName = elem.tag;

    if (elem.children) {
      content.push(`${indent}<${tagName}>`);
      content.push(
        ...elem.children.map((tag: GameTag) => {
          return this.createGameStr(tag, indentLevel + 1);
        })
      );
      content.push(`${indent}</${tagName}>`);
    } else {
      content.push(`${indent}<${tagName} />`);
    }

    const resElem = this.createElem('div', [this.classes.codeString], [...content]);
    this.gameStrings.push(resElem);
    return resElem;
  }
}
