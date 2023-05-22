import Matrix from './Matrix.js';
import Sounds from './Sounds.js';
import Storage from './Storage.js';
import View from './View.js';

class Game {
  constructor() {
    this.view = new View(this);
    this.matrix = new Matrix();
    this.sounds = new Sounds();
    this.storage = new Storage(this);
    this.cells = null;
    this.isStarted = null;
    this.isGameOver = null;
    this.gameSize = null;
    this.gameMinesCount = null;
    this.waitForFirstClick = this.waitForFirstClick.bind(this);
    this.handleGameClick = this.handleGameClick.bind(this);
    this.showResTimeout = null;
    this.gameSteps = 0;
    this.gameTime = 0;
    this.gameTimer = null;
    this.prevResults = this.storage.loadPrevRes() || [];
    this.bombsLeft = null;
  }

  load() {
    this.storage.loadOptions();
    this.storage.loadChoosenValues();
    this.view.renderPrevResults(this.prevResults);

    const loadedGame = this.storage.loadGame();
    if (loadedGame) {
      this.startLoadedGame(loadedGame);
      return;
    }
    const params = this.view.static.getChoosenOptions();
    if (params) {
      const { size, minesCount } = params;
      this.prepareNewGame(+size, +minesCount);
    } else {
      this.prepareNewGame();
    }
  }

  init() {
    window.addEventListener('beforeunload', this.storage.saveGame);

    this.load();
  }

  startLoadedGame(game) {
    const {
      size, mines, steps, time, fieldState,
    } = game;

    this.isStarted = true;
    this.isGameOver = false;
    this.cells = null;
    this.gameSize = size;
    this.gameMinesCount = mines;
    this.view.gameView.renderGameField(this.gameSize);
    this.refreshGameInfo(steps, time);
    this.startTimer();

    const cells = this.view.getNewCells(size);

    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        cells[i][j].value = fieldState[i][j].cellValue;
        if (fieldState[i][j].isOpen) cells[i][j].setOpen();
        if (fieldState[i][j].isMarked) cells[i][j].setMark();
      }
    }

    this.cells = cells;
    this.updateFlagsAndMines();
    this.view.static.elements.gameField.addEventListener('mousedown', this.handleGameClick);
  }

  createNewGame() {
    this.view.closeGameResults();
    const params = this.view.static.getChoosenOptions();
    const { size, minesCount } = params;
    this.prepareNewGame(size, minesCount);
    clearTimeout(this.showResTimeout);
    clearTimeout(this.gameTimer);
  }

  prepareNewGame(size = 10, minesCount = 10) {
    this.isStarted = false;
    this.isGameOver = false;
    this.cells = null;
    this.gameSize = size;
    this.gameMinesCount = minesCount;
    this.marksLeft = minesCount;
    this.view.static.elements.flags.innerText = 0;
    this.view.static.elements.bombs.innerText = minesCount;
    this.view.gameView.renderGameField(this.gameSize);
    this.refreshGameInfo(0, 0);

    const field = this.view.static.elements.gameField;
    field.removeEventListener('mousedown', this.handleGameClick);
    field.addEventListener('click', this.waitForFirstClick);
  }

  startNewGame(firstClickCoords, size, mines) {
    const cells = this.view.getNewCells(size).flat();
    const cellsValue = this.matrix.getNewMatrix(firstClickCoords, size, mines).flat();
    const res = cells.map((cell, index) => {
      const newCell = cell;
      newCell.value = cellsValue[index];
      return newCell;
    });

    const matrixRes = [];
    for (let i = 0; i < res.length; i += 1) {
      if (i % this.gameSize === 0) {
        matrixRes.push([]);
      }
      matrixRes[matrixRes.length - 1].push(res[i]);
    }

    this.cells = matrixRes;

    this.view.static.elements.gameField.addEventListener('mousedown', this.handleGameClick);
    const [x, y] = [...firstClickCoords];
    this.cells[y][x].reveal();
  }

  addSteps() {
    this.gameSteps += 1;
    this.view.static.elements.steps.innerText = this.gameSteps;
  }

  startTimer() {
    this.gameTimer = setInterval(() => {
      this.gameTime += 1;
      this.view.static.elements.timer.innerText = this.gameTime;
    }, 1000);
  }

  updateFlagsAndMines() {
    let markedCells = 0;
    for (let i = 0; i < this.gameSize; i += 1) {
      for (let j = 0; j < this.gameSize; j += 1) {
        if (this.cells[i][j].isMarked) {
          markedCells += 1;
        }
      }
    }
    this.bombsLeft = this.gameMinesCount - markedCells;
    this.view.static.elements.flags.innerText = markedCells;
    this.view.static.elements.bombs.innerText = this.bombsLeft >= 0 ? this.bombsLeft : 0;
  }

  checkIsWin() {
    if (this.isGameOver) return;
    const openedCells = this.cells.flat().filter((cell) => cell.isOpen).length;
    const totalCells = this.gameSize * this.gameSize;
    if (openedCells + this.gameMinesCount >= totalCells) this.winGame();
  }

  winGame() {
    this.isGameOver = true;
    this.stopGame();
    this.view.showGameResults(true);
    const steps = this.gameSteps;
    const time = this.gameTime;
    const size = this.gameSize;
    const mines = this.gameMinesCount;
    this.addGameResult({
      steps, time, size, mines,
    });
  }

  loseGame() {
    this.isGameOver = true;
    this.stopGame();
    this.sounds.playFall();
    this.revealAllCells();
    this.showResTimeout = setTimeout(() => this.view.showGameResults(false), 2000);
  }

  addGameResult(res) {
    this.prevResults.unshift(res);
    if (this.prevResults.length > 10) {
      this.prevResults.length = 10;
    }
    this.view.renderPrevResults(this.prevResults);
    this.storage.savePrevRes();
  }

  stopGame() {
    this.view.static.elements.gameField.removeEventListener('mousedown', this.handleGameClick);
    clearInterval(this.gameTimer);
  }

  refreshGameInfo(steps, time) {
    this.gameSteps = steps;
    this.gameTime = time;
    this.view.static.elements.steps.innerText = this.gameSteps;
    this.view.static.elements.timer.innerText = this.gameTime;
  }

  revealAllCells() {
    this.cells.flat().forEach((cell) => {
      if (cell.isOpen) return;
      if (cell.isMarked) cell.mark();
      cell.setOpen();
    });
  }

  revealSiblingsCell(coords) {
    const [x, y] = coords;
    const { cells } = this;

    const prevRowIndex = y - 1;
    const nextRowIndex = y + 1;
    const prevColumnIndex = x - 1;
    const nextColumnIndex = x + 1;

    const prevRow = cells[prevRowIndex];
    const nextRow = cells[nextRowIndex];

    if (prevRow !== undefined) {
      if (prevRow[x + 1] !== undefined) cells[prevRowIndex][nextColumnIndex].reveal();
      if (prevRow[x] !== undefined) cells[prevRowIndex][x].reveal();
      if (prevRow[x - 1] !== undefined) cells[prevRowIndex][prevColumnIndex].reveal();
    }

    if (nextRow !== undefined) {
      if (nextRow[x + 1] !== undefined) cells[nextRowIndex][nextColumnIndex].reveal();
      if (nextRow[x] !== undefined) cells[nextRowIndex][x].reveal();
      if (nextRow[x - 1] !== undefined) cells[nextRowIndex][prevColumnIndex].reveal();
    }

    if (cells[y][x + 1] !== undefined) cells[y][nextColumnIndex].reveal();
    if (cells[y][x - 1] !== undefined) cells[y][prevColumnIndex].reveal();
  }

  /* HANDLERS */

  waitForFirstClick(e) {
    const elem = e.target.closest('.game-field__cell');
    if (!elem) return;
    this.sounds.playStep();
    this.isStarted = true;
    const x = +elem.dataset.x;
    const y = +elem.dataset.y;
    this.startNewGame([x, y], this.gameSize, this.gameMinesCount);
    this.addSteps();
    this.startTimer();
    this.view.static.elements.gameField.removeEventListener('click', this.waitForFirstClick);
  }

  handleGameClick(e) {
    const elem = e.target.closest('.game-field__cell');
    if (!elem) return;
    const x = +elem.dataset.x;
    const y = +elem.dataset.y;
    const cell = this.cells[y][x];
    if (e.button === 0) {
      if (!cell.isOpen && !cell.isMarked) {
        this.addSteps();
        this.sounds.playStep();
      }
      cell.reveal();
    }
    if (e.button === 2) {
      cell.mark();
    }
  }
}

export default Game;
