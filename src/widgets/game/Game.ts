import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/Table';
import { gameLevels } from '../../shared/data/gameLevels';
import { levels } from '../../shared/types/types';
import { ElemController } from '../../shared/utils/elemController';
import './game.scss';

export class Game extends ElemController {
  private classes: Record<string, string>;

  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;
  private levels: levels;
  private strElemMap: Map<HTMLElement, HTMLElement>;
  private elemStrMap: Map<HTMLElement, HTMLElement>;

  constructor() {
    super();

    this.table = new Table();
    this.cssEditor = new CSSEditor();
    this.htmlViewer = new HTMLViewer();
    this.classes = {
      baseClass: 'game',
    };
    this.levels = gameLevels;
    this.strElemMap = new Map();
    this.elemStrMap = new Map();

    this.init();
    this.hydrate();
  }

  protected init() {
    this.elem = this.createElem(
      'main',
      [this.classes.baseClass],
      [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]
    );

    this.initLevel(0);
  }

  private hydrate() {
    this.table.getElem().addEventListener('mouseover', (e) => {
      if (e.target !== this.table.getElem()) {
        (e.target as HTMLElement).classList.add('light');
        this.elemStrMap.get(e.target as HTMLElement)?.classList.add('light');
      }
      if (e.relatedTarget) {
        (e.relatedTarget as HTMLElement).classList.remove('light');
        this.elemStrMap.get(e.relatedTarget as HTMLElement)?.classList.remove('light');
      }
    });

    this.htmlViewer.getElem().addEventListener('mouseover', (e) => {
      if (e.target !== this.htmlViewer.getElem()) {
        (e.target as HTMLElement).classList.add('light');
        this.strElemMap.get(e.target as HTMLElement)?.classList.add('light');
      }
      if (e.relatedTarget) {
        (e.relatedTarget as HTMLElement).classList.remove('light');
        this.strElemMap.get(e.relatedTarget as HTMLElement)?.classList.remove('light');
      }
    });
  }

  private initLevel(levelNumber: number) {
    const level = gameLevels[levelNumber];
    this.table.initLevel(level);
    this.htmlViewer.initLevel(level);

    const gameElements = this.table.getGameElements();
    const gameStrings = this.htmlViewer.getGameStrings();

    gameElements.forEach((_item, index) => {
      this.elemStrMap.set(gameElements[index], gameStrings[index]);
      this.strElemMap.set(gameStrings[index], gameElements[index]);
    });
  }
}
