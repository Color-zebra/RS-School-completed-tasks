import Field from './Field.js';
import View from './View.js';

class Game {
  constructor() {
    this.field = new Field();
    this.view = new View();

    this.sizes = {
      easy: 10,
      medium: 15,
      hard: 25,
    };
    this.size = 10;
    this.bombsCount = 10;
    this.cells = null;
    this.isStarted = false;
    this.HTMLElements = {
      themeSwitcherElem: document.getElementById('theme-switcher'),
      gameFieldElem: document.getElementById('game-field'),
    };
    this.handlers = {
      onCellClick: (e) => {
        const elem = e.target.closest('.game-field__cell');
        if (!elem) return;
        const x = +elem.dataset.x;
        const y = +elem.dataset.y;
        if (e.button === 0) {
          if (!this.isStarted) {
            this.field.generateField([x, y], this.size, this.bombsCount);
            this.isStarted = true;
          }
          this.revealCell([x, y]);
        }
        if (e.button === 2) {
          this.view.showMarkedCell(this.cells[y][x].elem);
        }
      },
    };
  }

  init() {
    this.view.createLayout();
    this.view.renderGameField(this.size);
    this.cells = this.view.cells; //! а надо ли?
    this.hydrateGame();
    // document.body.dataset.size = this.size;
    // this.cells = this.view.renderGameField(this.size, this.HTMLElements.gameFieldElem);
  }

  revealCell(coords) {
    const [x, y] = coords;
    const currCell = this.cells[y][x];
    if (currCell.isOpen) return;

    const value = this.field.field[y][x];
    currCell.isOpen = true;
    this.view.revealCell(currCell.elem, value);

    if (!value) this.revealSiblingsCell(coords);
  }

  revealSiblingsCell(coords) {
    const [x, y] = coords;

    const { field } = this.field;
    const prevRowIndex = y - 1;
    const nextRowIndex = y + 1;
    const prevColumnIndex = x - 1;
    const nextColumnIndex = x + 1;

    const prevRow = field[prevRowIndex];
    const nextRow = field[nextRowIndex];

    if (prevRow !== undefined) {
      if (prevRow[x + 1] !== undefined) this.revealCell([nextColumnIndex, prevRowIndex]);
      if (prevRow[x] !== undefined) this.revealCell([x, prevRowIndex]);
      if (prevRow[x - 1] !== undefined) this.revealCell([prevColumnIndex, prevRowIndex]);
    }

    if (nextRow !== undefined) {
      if (nextRow[x + 1] !== undefined) this.revealCell([nextColumnIndex, nextRowIndex]);
      if (nextRow[x] !== undefined) this.revealCell([x, nextRowIndex]);
      if (nextRow[x - 1] !== undefined) this.revealCell([prevColumnIndex, nextRowIndex]);
    }

    if (field[y][x + 1] !== undefined) this.revealCell([nextColumnIndex, y]);
    if (field[y][x - 1] !== undefined) this.revealCell([prevColumnIndex, y]);
  }

  hydrateGame() {
    /* this.HTMLElements.themeSwitcherElem.addEventListener('click', () => {
      const currTheme = document.body.dataset.theme;
      document.body.dataset.theme = currTheme === 'flame' ? 'ice' : 'flame';
    }); */
    this.view.elements.gameField.addEventListener('mousedown', this.handlers.onCellClick);
    this.view.elements.gameField.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }
}

export default Game;
