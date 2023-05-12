import Field from './Field.js';
import View from './View.js';

class Game {
  constructor() {
    this.sizes = {
      easy: 10,
      medium: 15,
      hard: 25,
    };
    this.size = 10;
    this.bombsCount = 0;
    this.field = new Field();
    this.view = new View();
    this.controls = null;
    this.cells = null;
    this.HTMLElements = {
      themeSwitcherElem: document.getElementById('theme-switcher'),
      gameFieldElem: document.getElementById('game-field'),
    };
    this.handlers = {
      onCellClick: (e) => {
        const elem = e.target.closest('.game-field__cell');
        if (!elem) return;
        const { x, y } = elem.dataset;
        if (e.button === 0) {
          this.revealCell([x, y]);
        }
        if (e.button === 2) {
          this.view.showMarkedCell(this.cells[y][x].elem);
        }
      },
    };
  }

  init() {
    this.field.generateField({ emptyX: 5, emptyY: 4 }, 10, 10);
    this.hydrateGame();
    document.body.dataset.size = this.size;
    this.cells = this.view.renderGameField(this.size, this.HTMLElements.gameFieldElem);
    console.log(this.field);
    console.log(this.cells);
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
    console.log('reveal siblings');
    let [x, y] = coords;
    x = +x;
    y = +y;
    const { field } = this.field;
    const prevRowIndex = y - 1;
    const nextRowIndex = y + 1;
    const prevColumnIndex = x - 1;
    const nextColumnIndex = x + 1;

    const prevRow = field[prevRowIndex];
    const nextRow = field[nextRowIndex];
    console.log(prevRowIndex, nextRowIndex, prevColumnIndex, nextColumnIndex);
    console.log(prevRow, nextRow);
    if (prevRow !== undefined) { // верхний ряд
      if (prevRow[x + 1] !== undefined) { // верх - право
        console.log(`reveal x:${nextColumnIndex}, y: ${prevRowIndex}`);
        this.revealCell([nextColumnIndex, prevRowIndex]);
      }
      if (prevRow[x] !== undefined) { // верх - центр
        console.log(`reveal x:${x}, y: ${prevRowIndex}`);
        this.revealCell([x, prevRowIndex]);
      }
      if (prevRow[x - 1] !== undefined) { // верх - лево
        console.log(`reveal x:${prevColumnIndex}, y: ${prevRowIndex}`);
        this.revealCell([prevColumnIndex, prevRowIndex]);
      }
    }
    if (nextRow !== undefined) { // нижний ряд
      if (nextRow[x + 1] !== undefined) { // низ - право
        console.log(`reveal x:${nextColumnIndex}, y: ${nextRowIndex}`);
        this.revealCell([nextColumnIndex, nextRowIndex]);
      }
      if (nextRow[x] !== undefined) { // низ центр
        console.log(`reveal x:${x}, y: ${nextRowIndex}`);
        this.revealCell([x, nextRowIndex]);
      }
      if (nextRow[x - 1] !== undefined) { // низ лево
        console.log(`reveal x:${prevColumnIndex}, y: ${nextRowIndex}`);
        this.revealCell([prevColumnIndex, nextRowIndex]);
      }
    }
    if (field[y][x + 1] !== undefined) { // право
      console.log(`reveal x:${nextColumnIndex}, y: ${y}`);
      this.revealCell([nextColumnIndex, y]);
    }
    if (field[y][x - 1] !== undefined) { // лево
      console.log(`reveal x:${prevColumnIndex}, y: ${y}`);
      this.revealCell([prevColumnIndex, y]);
    }
  }

  hydrateGame() {
    this.HTMLElements.themeSwitcherElem.addEventListener('click', () => {
      const currTheme = document.body.dataset.theme;
      document.body.dataset.theme = currTheme === 'flame' ? 'ice' : 'flame';
    });
    this.HTMLElements.gameFieldElem.addEventListener('mousedown', this.handlers.onCellClick);
    this.HTMLElements.gameFieldElem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }
}

export default Game;
