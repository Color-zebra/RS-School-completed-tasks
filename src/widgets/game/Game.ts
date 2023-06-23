import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/Table';
import { gameLevels } from '../../shared/data/gameLevels';
import { GameTag } from '../../shared/types/interfaces';
import { appendArg, levels } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';
import './game.scss';

export class Game extends ElemController {
  private classes: Record<string, string>;

  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;
  private levels: levels;
  private strElemMap: Map<HTMLElement, HTMLElement> | null;
  private elemStrMap: Map<HTMLElement, HTMLElement> | null;
  private indentSize: number;
  private gameElemTree: HTMLElement[];
  private gameStrTree: HTMLElement[];

  constructor() {
    super();

    this.table = new Table();
    this.cssEditor = new CSSEditor();
    this.htmlViewer = new HTMLViewer();
    this.classes = {
      baseClass: 'game',
      codeString: 'html-code',
    };
    this.levels = gameLevels;
    this.elemStrMap = null;
    this.strElemMap = null;
    this.gameElemTree = [];
    this.gameStrTree = [];

    this.indentSize = 4;

    this.init();
    this.hydrate();
  }

  protected init() {
    this.elem = this.createElem(
      'main',
      [this.classes.baseClass],
      [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]
    );

    this.initCurrLevel(0);
  }

  private hydrate() {
    
  }

  private createGameElem(elem: GameTag) {
    const currElem = document.createElement(`${elem.tag}`);
    if (elem.children) {
      const children: appendArg[] = [];
      elem.children.forEach((tag: GameTag) => {
        children.push(this.createGameElem(tag));
      });
      currElem.append(...children);
    }
    this.gameElemTree.push(currElem);
    return currElem;
  }

  private createGameStr(elem: GameTag, indentLevel: number) {
    const indent = ' '.repeat(indentLevel * this.indentSize);
    const content: appendArg[] | appendArg = [];
    const tagName = elem.tag.slice(3);

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
    this.gameStrTree.push(resElem);
    return resElem;
  }

  private initCurrLevel(levelNumber: number) {
    const level = gameLevels[levelNumber];
    level.forEach((tag: GameTag) => {
      this.table.getElem().append(this.createGameElem(tag));
      this.htmlViewer.getElem().append(this.createGameStr(tag, 0));
    });
  }
}
