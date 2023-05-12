import Cell from './Cell.js';

class View {
  constructor() {
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      marked: 'game-field__cell_marked',
      empty: 'game-field__cell',
    };
  }

  revealCell(elem, value) {
    if (value === '*') {
      this.showWrongCell(elem);
    } else {
      this.showEmptyCell(elem, value);
    }
    if (value === '') {

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

  renderGameField(size, container) {
    const curr = container;
    curr.innerHTML = '';
    const elements = [];
    for (let i = 0; i < size; i += 1) {
      elements.push([]);
      for (let j = 0; j < size; j += 1) {
        const cell = new Cell(j, i);
        elements[i].push(cell);
        curr.append(cell.elem);
      }
    }

    return elements;
  }
}

export default View;
