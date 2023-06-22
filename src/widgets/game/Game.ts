import { CSSEditor } from '../../features/CSSEditor/CSSEditor';
import { HTMLViewer } from '../../features/HTMLViewer/HTMLViewer';
import { Table } from '../../features/table/table';
import { ElemController } from '../../shared/utils/elemController';

export class Game extends ElemController {
  private table: Table;
  private cssEditor: CSSEditor;
  private htmlViewer: HTMLViewer;

  constructor() {
    super();

    this.table = new Table();
    this.cssEditor = new CSSEditor();
    this.htmlViewer = new HTMLViewer();

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [], [this.table.getElem(), this.cssEditor.getElem(), this.htmlViewer.getElem()]);
  }
}
