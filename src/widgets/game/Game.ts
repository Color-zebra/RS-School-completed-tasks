import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/Table';
import { gameLevels } from '../../shared/data/gameLevels';
import { GameTag } from '../../shared/types/interfaces';
import { levels } from '../../shared/types/types';
import { createGameElem } from '../../shared/utils/createGameElem';
import { ElemController } from '../../shared/utils/elemController';
import './game.scss';

export class Game extends ElemController {
  private classes: Record<string, string>;

  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;
  private levels: levels;

  constructor() {
    super();

    this.table = new Table();
    this.cssEditor = new CSSEditor();
    this.htmlViewer = new HTMLViewer();
    this.classes = {
      baseClass: 'game',
    };
    this.levels = gameLevels;

    this.init();
  }

  protected init() {
    this.elem = this.createElem(
      'main',
      [this.classes.baseClass],
      [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]
    );

    this.initCurrLevel(0);
  }

  private initCurrLevel(levelNumber: number) {
    gameLevels[levelNumber].forEach((tag: GameTag) => {
      this.table.getElem().append(createGameElem(tag));
    });
  }
}
