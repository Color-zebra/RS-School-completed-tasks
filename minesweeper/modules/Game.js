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
        const { x, y } = elem.dataset;
        if (!elem) return;
        if (e.button === 0) {
          this.view.showEmptyCell(this.cells[y][x]);
        }
        if (e.button === 2) {
          this.view.showMarkedCell(this.cells[y][x]);
        }
      },

    }
  }

  init() {
    this.field.createField(this.sizes.medium);
    this.field.plantBombs(50);
    this.field.describeField();
    this.field.renderField();
    this.hydrateGame();
    document.body.dataset.size = this.size;
    this.cells = this.view.renderGameField(this.size, this.HTMLElements.gameFieldElem);
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
