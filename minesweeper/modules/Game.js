import Field from './Field.js';
import View from './View.js';
import Storage from './Storage.js';

class Game {
  constructor() {
    this.field = new Field();
    this.view = new View();
    this.storage = new Storage();

    this.size = 10;
    this.bombsCount = 10;
    this.isMute = false;
    this.cells = null;
    this.isStarted = false;
    this.statistic = [];

    this.steps = 0;
    this.time = 0;

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
            const intervalFunc = this.updateTimer.bind(this);
            this.view.timerId = setInterval(intervalFunc, 1000);
          }
          this.updateStep(); //! Считать ли клики по открытым клеткам?
          this.revealCell([x, y]);
        }
        if (e.button === 2) {
          if (!elem.classList.contains('game-field__cell_hidden')) return;
          if (elem.classList.contains('game-field__cell_marked')) {
            this.view.showHiddenCell(this.cells[y][x].elem);
          } else {
            this.view.showMarkedCell(this.cells[y][x].elem);
          }
        }
      },
      onNewGameClick: () => {
        this.initNewGame();
      },
    };
  }

  init() {
    const loaded = this.load();
    this.view.createLayout();
    this.view.renderGameField(this.size);
    this.cells = this.view.cells; //! а надо ли?
    this.hydrateGame();
    this.view.showCurrentOptions(this.size, this.bombsCount);
    if (loaded.options) {
      this.view.showCurrentOptions(loaded.options.size, loaded.options.bombsCount)
    }
    if (this.statistic) {
      this.statistic.forEach((res) => {
        this.view.createStatisticRow(res);
      });
    }
  }

  load() {
    const state = this.storage.load();

    if (state.statistic) {
      this.statistic = [...state.statistic];
    }
    console.log(state);
    return state;
  }

  save() {
    this.updateOptions();

    const currOptions = {
      size: this.size,
      bombsCount: this.bombsCount,
      isMute: this.isMute,
    };
    let currStat = null;

    if (this.statistic.length > 0) {
      currStat = this.statistic;
    }

    this.storage.save(currOptions, currStat);
  }

  initNewGame() {
    this.updateOptions();
    this.view.renderGameField(this.size);
    this.cells = this.view.cells;
    this.field = new Field();
    this.isStarted = false;
    this.hydrateGameField();
    this.view.showCurrentOptions(this.size, this.bombsCount);
    this.view.closeGameResults();

    if (this.view.timerId) {
      this.resetTimer();
    }

    if (this.steps) {
      this.resetSteps();
    }
  }

  updateOptions() {
    const opt = this.view.getChooseOptions();
    this.size = opt.size;
    this.bombsCount = opt.bombsCount;
  }

  revealCell(coords) {
    const [x, y] = coords;
    const currCell = this.cells[y][x];
    if (currCell.isOpen) return;

    const value = this.field.field[y][x];
    currCell.isOpen = true;
    this.view.revealCell(currCell.elem, value);

    if (value === '*') {
      this.finishGame(false);
      return;
    }

    const totalOpenCells = this.cells.flat().filter((cell) => cell.isOpen).length;
    if (totalOpenCells === this.size ** 2 - this.bombsCount) {
      this.finishGame(true);
    }

    if (!value) this.revealSiblingsCell(coords);
  }

  updateStep() {
    this.steps += 1;
    this.view.elements.steps.innerText = this.steps;
    this.view.sound.playStep();
  }

  resetSteps() {
    this.steps = 0;
    this.view.elements.steps.innerText = this.steps;
  }

  updateTimer() {
    const transformSeconds = (seconds) => {
      let currSec = seconds;
      const hours = `${Math.floor(currSec / 3600)}`;
      currSec %= 3600;
      const minutes = `${Math.floor(currSec / 60)}`;
      currSec = `${currSec % 60}`;

      return `${(`0${hours}`).slice(-2)}:${(`0${minutes}`).slice(-2)}:${(`0${currSec}`).slice(-2)}`;
    };

    this.time += 1;
    this.view.elements.timer.innerText = transformSeconds(this.time);
  }

  resetTimer() {
    clearInterval(this.view.timerId);
    this.view.cells.timerId = null;
    this.time = 0;
    this.view.elements.timer.innerText = '00:00:00';
  }

  finishGame(isWinner) {
    clearInterval(this.view.timerId);
    this.view.gameOver(isWinner, this.time, this.steps);
    this.updateStatistic(isWinner);
  }

  updateStatistic(isWinner) {
    this.statistic.unshift([isWinner, this.steps, this.view.elements.timer.innerText]);
    this.statistic.length = this.statistic.length > 10 ? 10 : this.statistic.length;
    this.view.clearStatistic();
    this.statistic.forEach((res) => {
      this.view.createStatisticRow(res);
    });
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
    this.view.hydrateInterface();
    this.hydrateGameField();

    window.addEventListener('beforeunload', () => {
      this.save();
    });
  }

  hydrateGameField() {
    this.view.elements.gameField.addEventListener('mousedown', this.handlers.onCellClick);
    this.view.elements.gameField.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    this.view.elements.startBtn.addEventListener('click', this.handlers.onNewGameClick);
    this.view.elements.resultBtn.addEventListener('click', this.handlers.onNewGameClick);
  }
}

export default Game;
