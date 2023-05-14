class Cell {
  constructor(x, y) {
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      marked: 'game-field__cell_marked',
      empty: 'game-field__cell',
    };
    this.elem = this.generateCell(x, y);
    this.isOpen = false;
    this.x = x;
    this.y = y;
  }

  generateCell(x, y) {
    const cell = document.createElement('div');
    cell.classList.add(this.classes.empty);
    cell.classList.add(this.classes.hidden);
    cell.dataset.x = x;
    cell.dataset.y = y;
    return cell;
  }
}

export default Cell;
