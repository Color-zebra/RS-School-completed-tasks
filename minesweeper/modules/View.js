class View {
  constructor() {
    this.classes = {
      hidden: 'game-field__cell_hidden',
      broken: 'game-field__cell_broken',
      empty: 'game-field__cell',
    };
  }

  renderGameField(size, container) {
    const curr = container;
    curr.innerHTML = '';
    const elements = [];
    for (let i = 0; i < size; i += 1) {
      elements.push([]);
      for (let j = 0; j < size; j += 1) {
        const cell = this.generateCell(j, i);
        elements[i].push(cell);
        curr.append(cell);
      }
    }

    return elements;
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

export default View;
