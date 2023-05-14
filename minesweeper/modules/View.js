import Cell from './Cell.js';
import Sound from './Sound.js';

class View {
  constructor(size, bombsCount) {
    this.sound = new Sound();
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      marked: 'game-field__cell_marked',
      empty: 'game-field__cell',
      shownResult: 'result_shown',
      shownStat: 'stat__table_shown',
      win: 'win',
      lose: 'lose',
    };
    this.texts = {
      win: 'Congratulations!\n You won!',
      lose: 'You lose',
    };
    this.choosenOptions = {
      size,
      bombsCount,
    };
    this.elements = {
      wrapper: null,
      sizeButtons: null,
      choosenMinesValue: null,
      minesInput: null,
      startBtn: null,
      themeSwitcher: null,
      steps: null,
      resultsBtn: null,
      resultsTable: null,
      timer: null,
      gameField: null,
      resultText: null,
      resultAnimation: null,
      resultWindow: null,
      resultBtn: null,
    };
    this.cells = null;
    this.timerId = null;
  }

  revealCell(elem, value) {
    if (value === '*') {
      this.showWrongCell(elem);
    } else {
      this.showEmptyCell(elem, value);
    }
  }

  showEmptyCell(elem, value) {
    if (!elem.classList.contains(this.classes.hidden)) return;
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
    this.sound.playFlag();
    elem.classList.add(this.classes.marked);
  }

  showHiddenCell(elem) {
    this.sound.playFlag();
    elem.classList.remove(this.classes.marked);
  }

  renderGameField(size) {
    this.elements.gameField.innerHTML = '';
    document.body.dataset.size = size;

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

  gameOver(isWinner) {
    const time = this.elements.timer.innerText;
    const steps = this.elements.steps.innerText;
    if (isWinner) {
      this.sound.playWin();
    } else {
      this.sound.playLose();
    }

    this.elements.resultText.innerText = isWinner ? this.texts.win : this.texts.lose;
    this.elements.resultText.innerText += `\nTime: ${time} \nSteps: ${steps}`;
    this.elements.resultAnimation.classList.add(isWinner ? this.classes.win : this.classes.lose);
    this.elements.resultWindow.classList.add(this.classes.shownResult);
  }

  closeGameResults() {
    this.elements.resultAnimation.classList.remove(this.classes.win);
    this.elements.resultAnimation.classList.remove(this.classes.lose);
    this.elements.resultWindow.classList.remove(this.classes.shownResult);
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
      <p id="result-text" class="result__text">You lose</p>
      <div id="result-animation" class="result__animation"></div>
      <div class="result__start-game-button button" id="result-btn">Start new game</div>
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
        <label for="mines-count">Total mines: <span class="controls__mines-value" id="choosen-mines-value">10</span></label>
        <input class="styled-slider" type="range" min="10" max="99" value="10" step="1" id="mines-input" name="mines-count">
      </div>
      <div class="controls__start-game">
        <button id="start-game-btn" class="controls__start-game-button button">Start game</button>
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
      <div class="statistics__steps">Steps: <span id="steps">0</span></div>
      <div class="statistics__stat stat">
        <div class="stat__title button" id="toggle-stat-btn">Latest results</div>
        <table id="table" class="stat__table">
          <tr class="stat__row">
            <th>Res</th>
            <th>Steps</th>
            <th>Time</th>
          </tr>
        </table>
      </div>
      <div class="statistics__time">Time: <span id="time">00:00:00</span></div>
    `;
    this.elements.wrapper.append(statistic);
  }

  clearStatistic() {
    this.elements.resultsTable.innerHTML = `
      <tr class="stat__row">
        <th>Res</th>
        <th>Steps</th>
        <th>Time</th>
      </tr>
    `;
  }

  createStatisticRow(res) {
    const row = document.createElement('tr');
    row.classList.add('stat__row');
    row.innerHTML = `
      <td>${res[0] ? 'Win' : 'Lose'}</td>
      <td>${res[1]}</td>
      <td>${res[2]}</td>
    `;
    this.elements.resultsTable.append(row);
  }

  createLayout() {
    this.createWrapper();
    this.createControls();
    this.createStatistic();
    this.createGameField();
    this.createResultsWindow();
    document.body.append(this.elements.wrapper);
  }

  getHtmlElements() {
    this.elements.sizeButtons = document.querySelectorAll('.size__input');
    this.elements.choosenMinesValue = document.getElementById('choosen-mines-value');
    this.elements.minesInput = document.getElementById('mines-input');
    this.elements.startBtn = document.getElementById('start-game-btn');
    this.elements.themeSwitcher = document.getElementById('theme-switcher');
    this.elements.steps = document.getElementById('steps');
    this.elements.resultsBtn = document.getElementById('toggle-stat-btn');
    this.elements.resultsTable = document.getElementById('table');
    this.elements.timer = document.getElementById('time');
    this.elements.resultText = document.getElementById('result-text');
    this.elements.resultAnimation = document.getElementById('result-animation');
    this.elements.resultWindow = document.getElementById('result');
    this.elements.resultBtn = document.getElementById('result-btn');
  }

  showCurrentOptions(size, minesCount) {
    [...this.elements.sizeButtons].forEach((item) => {
      if (+item.getAttribute('id') === size) {
        item.setAttribute('checked', 'checked');
      }
    });
    this.choosenOptions.bombsCount = minesCount;
    this.choosenOptions.size = size;
    this.elements.minesInput.value = minesCount;
    this.elements.choosenMinesValue.innerText = minesCount;
  }

  getChooseOptions() {
    return this.choosenOptions;
  }

  hydrateInterface() {
    this.getHtmlElements();

    this.elements.themeSwitcher.addEventListener('click', () => {
      const currTheme = document.body.dataset.theme;
      document.body.dataset.theme = currTheme === 'flame' ? 'ice' : 'flame';
    });

    const checkRadio = () => {
      let choosenValue = null;
      [...this.elements.sizeButtons].forEach((btn) => {
        if (btn.checked) choosenValue = +btn.getAttribute('id');
      });
      this.choosenOptions.size = choosenValue;
    };
    [...this.elements.sizeButtons].forEach((btn) => {
      btn.addEventListener('change', checkRadio);
    });

    this.elements.minesInput.addEventListener('input', (e) => {
      const { value } = e.target;
      if (this.choosenOptions.bombsCount === value) return;

      this.choosenOptions.bombsCount = +e.target.value;
      this.elements.choosenMinesValue.innerText = e.target.value;
    });

    this.elements.resultsBtn.addEventListener('click', () => {
      this.elements.resultsTable.classList.toggle(this.classes.shownStat);
    });
  }
}

export default View;
