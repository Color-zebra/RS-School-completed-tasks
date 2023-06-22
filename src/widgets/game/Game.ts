import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/Table';
import { ElemController } from '../../shared/utils/elemController';
import './game.scss';

export class Game extends ElemController {
  private classes: Record<string, string>;

  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;

  constructor() {
    super();

    this.table = new Table();
    this.cssEditor = new CSSEditor();
    this.htmlViewer = new HTMLViewer();
    this.classes = {
      baseClass: 'game',
    };

    this.init();
  }

  init() {
    this.elem = this.createElem(
      'main',
      [this.classes.baseClass],
      [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]
    );
  }
}
