import Cell from './Cell.js';

class GameView {
  constructor(cellsContainer, gameInstance) {
    this.gameInstance = gameInstance;
    this.cellsContainer = cellsContainer;
    this.cellElements = null;
  }

  renderGameField(size) {
    this.cellsContainer.innerHTML = '';
    document.body.dataset.size = size;

    const elements = [];
    for (let i = 0; i < size; i += 1) {
      elements.push([]);
      for (let j = 0; j < size; j += 1) {
        const cell = new Cell(j, i, this.gameInstance);
        elements[i].push(cell);
        this.cellsContainer.append(cell.elem);
      }
    }

    this.cellElements = elements;
  }
}

export default GameView;
