class Field {
  constructor() {
    this.field = [];
  }

  generateField(emptyCell, size = 10, bombsCount = 10) {
    this.createField(size);
    if ((bombsCount + 9) <= (size * size)) {
      this.createEmptyZone(emptyCell);
    } else {
      this.createEmptyCell(emptyCell);
    }
    this.plantBombs(bombsCount);
    this.describeField();
  }

  createEmptyZone(emptyCell) {
    const { emptyX, emptyY } = emptyCell;
    this.field[emptyY][emptyX] = 'empty';
    if (this.field[emptyY - 1] !== undefined) {
      if (this.field[emptyY - 1][emptyX + 1] !== undefined) this.field[emptyY - 1][emptyX + 1] = 'empty';
      if (this.field[emptyY - 1][emptyX] !== undefined) this.field[emptyY - 1][emptyX] = 'empty';
      if (this.field[emptyY - 1][emptyX - 1] !== undefined) this.field[emptyY - 1][emptyX - 1] = 'empty';
    }
    if (this.field[emptyY + 1] !== undefined) {
      if (this.field[emptyY + 1][emptyX + 1] !== undefined) this.field[emptyY + 1][emptyX + 1] = 'empty';
      if (this.field[emptyY + 1][emptyX] !== undefined) this.field[emptyY + 1][emptyX] = 'empty';
      if (this.field[emptyY + 1][emptyX - 1] !== undefined) this.field[emptyY + 1][emptyX - 1] = 'empty';
    }
    if (this.field[emptyY][emptyX + 1] !== undefined) this.field[emptyY][emptyX + 1] = 'empty';
    if (this.field[emptyY][emptyX - 1] !== undefined) this.field[emptyY][emptyX - 1] = 'empty';
  }

  createEmptyCell(emptyCell) {
    const { emptyX, emptyY } = emptyCell;
    this.field[emptyY][emptyX] = 'empty';
  }

  createField(size) {
    for (let i = 0; i < size; i += 1) {
      this.field.push([]);
      for (let j = 0; j < size; j += 1) {
        this.field[i].push(false);
      }
    }
  }

  plantBombs(bombsCount = 10) {
    let bombs = bombsCount;
    while (bombs > 0) {
      const x = Math.floor(Math.random() * this.field.length);
      const y = Math.floor(Math.random() * this.field.length);
      if (this.field[x][y] === false) {
        this.field[x][y] = '*';
        bombs -= 1;
      }
    }
  }

  describeField() {
    const checkSiblings = (x, y) => {
      let value = 0;
      if (this.field[x - 1]) {
        value += !!(this.field[x - 1][y - 1] === '*')
              + !!(this.field[x - 1][y] === '*')
              + !!(this.field[x - 1][y + 1] === '*');
      }
      if (this.field[x + 1]) {
        value += !!(this.field[x + 1][y - 1] === '*')
        + !!(this.field[x + 1][y] === '*')
        + !!(this.field[x + 1][y + 1] === '*');
      }
      value += !!(this.field[x][y - 1] === '*')
      + !!(this.field[x][y + 1] === '*');
      return value || '';
    };
    for (let i = 0; i < this.field.length; i += 1) {
      for (let j = 0; j < this.field.length; j += 1) {
        if (this.field[i][j] === false || this.field[i][j] === 'empty') this.field[i][j] = checkSiblings(i, j);
      }
    }
  }

  renderField() {
    console.log(this.field);
  }
}

export default Field;
