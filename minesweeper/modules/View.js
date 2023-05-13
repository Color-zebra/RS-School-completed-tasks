import Cell from './Cell.js';

class View {
  constructor() {
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      marked: 'game-field__cell_marked',
      empty: 'game-field__cell',
    };
    this.elements = {
      wrapper: null,
      gameField: null,
    };
    this.cells = null;
  }

  revealCell(elem, value) {
    if (value === '*') {
      this.showWrongCell(elem);
    } else {
      this.showEmptyCell(elem, value);
    }
  }

  showEmptyCell(elem, value) {
    if (!elem.classList.contains('game-field__cell_hidden')) return;
    if (value) {
      elem.append(value);
      elem.classList.add(`col${value}`);
    }
    elem.classList.remove(this.classes.hidden);
    elem.classList.remove(this.classes.marked);
  }

  showWrongCell(elem) {
    elem.classList.remove(this.classes.hidden);
    elem.classList.remove(this.classes.marked);
    elem.classList.add(this.classes.broken);
  }

  showMarkedCell(elem) {
    elem.classList.add(this.classes.marked);
  }

  showHiddenCell(elem) {
    elem.classList.remove(this.classes.marked);
  }

  renderGameField(size) {
    this.elements.gameField.innerHTML = '';

    const elements = [];
    for (let i = 0; i < size; i += 1) {
      elements.push([]);
      for (let j = 0; j < size; j += 1) {
        const cell = new Cell(j, i);
        elements[i].push(cell);
        this.elements.gameField.append(cell.elem);
      }
    }

    this.cells = elements;
  }

  createGameField() {
    const fieldElem = document.createElement('div');
    fieldElem.classList.add('game-field');
    this.elements.gameField = fieldElem;
    this.elements.wrapper.append(fieldElem);
  }

  createResultsWindow() {
    const results = document.createElement('div');
    results.classList.add('result');
    results.setAttribute('id', 'result');
    results.innerHTML = `
      <p class="result__text">You lose</p>
      <div class="result__animation"></div>
      <div class="result__start-game-button button">Start new game</div>
    `;

    this.elements.wrapper.append(results);
  }

  createWrapper() {
    const wrap = document.createElement('div');
    wrap.classList.add('wrapper');
    this.elements.wrapper = wrap;
  }

  createControls() {
    const controls = document.createElement('div');
    controls.classList.add('controls');
    controls.innerHTML = `
      <div class="controls__size size">
        <div class="size__text">Field size</div>
        <div class="size__inputs">
          <label class="size__label" for="10">
            <input type="radio" class="size__input" name="size" checked id="10">
            <span>small</span>
          </label>
          <label class="size__label" for="15">
            <input type="radio" class="size__input" name="size" id="15">
            <span>medium</span>
          </label>
          <label class="size__label" for="25">
            <input type="radio" class="size__input" name="size" id="25">
            <span>big</span>
          </label>
        </div>
      </div>
      <div class="controls__mines-count">
        <label for="mines-count">Total mines: <span class="controls__mines-value">10</span></label>
        <input class="styled-slider" type="range" min="10" max="99" value="10" step="1" name="mines-count">
      </div>
      <div class="controls__start-game">
        <button id="startGame" class="controls__start-game-button button">Start game</button>
      </div>
      <button id="theme-switcher" class="controls__theme-switch-button button">
        Theme
      </button>
    `;
    this.elements.wrapper.append(controls);
  }

  createStatistic() {
    const statistic = document.createElement('div');
    statistic.classList.add('statistics');
    statistic.innerHTML = `
      <div class="statistics__steps">Steps: <span>2000</span></div>
      <div class="statistics__stat stat">
        <div class="stat__title button" onclick="toggleStat()">Latest results</div>
        <table id="table" class="stat__table">
        </table>
      </div>
      <div class="statistics__time">Steps: <span>1:55:25</span></div>
    `;
    this.elements.wrapper.append(statistic);
  }

  createLayout() {
    this.createWrapper();
    this.createControls();
    this.createStatistic();
    this.createGameField();
    this.createResultsWindow();
    document.body.append(this.elements.wrapper);
  }
}

export default View;
