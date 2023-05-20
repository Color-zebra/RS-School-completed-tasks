class Cell {
  constructor(x, y, gameInstance) {
    this.gameInstance = gameInstance;
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      marked: 'game-field__cell_marked',
      empty: 'game-field__cell',
    };
    this.elem = this.generateCell(x, y);
    this.isOpen = false;
    this.isMarked = false;
    this.value = null;
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

  reveal() {
    if (this.isOpen || this.isMarked) return;
    this.elem.classList.remove(this.classes.hidden);
    this.isOpen = true;

    if (this.value === '*') {
      this.elem.classList.add(this.classes.broken);
      this.gameInstance.loseGame();
      return;
    }

    if (typeof this.value === 'number') {
      this.elem.classList.add(`col${this.value}`);
      this.elem.innerHTML = this.value;
    }

    if (this.value === '') this.gameInstance.revealSiblingsCell([this.x, this.y]);

    this.gameInstance.checkIsWin();
  }

  mark() {
    if (this.isOpen) return;
    this.gameInstance.sounds.playFlag();
    if (this.isMarked) {
      this.isMarked = false;
      this.elem.classList.remove(this.classes.marked);
      return;
    }
    this.isMarked = true;
    this.elem.classList.add(this.classes.marked);
  }

  open() {
    this.elem.classList.remove(this.classes.hidden);

    if (this.value === '*') {
      this.elem.classList.add(this.classes.broken);
      return;
    }

    if (typeof this.value === 'number') {
      this.elem.classList.add(`col${this.value}`);
      this.elem.innerHTML = this.value;
    }
  }
}

export default Cell;
