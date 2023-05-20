class Matrix {
  constructor() {
    this.field = [];
  }

  getNewMatrix(firstClickCoords, size, bombsCount) {
    this.field = [];
    this.generateField(firstClickCoords, size, bombsCount);
    return this.field;
  }

  generateField(firstClickCoords, size = 10, bombsCount = 10) {
    this.createField(size);
    this.createEmptyZone(firstClickCoords);
    this.plantBombs(bombsCount, size);
    this.describeField();
  }

  createEmptyZone(coords) {
    const [x, y] = coords;
    this.field[y][x] = 'start';
    if (this.field[y - 1] !== undefined) {
      if (this.field[y - 1][x + 1] !== undefined) this.field[y - 1][x + 1] = 'empty';
      if (this.field[y - 1][x] !== undefined) this.field[y - 1][x] = 'empty';
      if (this.field[y - 1][x - 1] !== undefined) this.field[y - 1][x - 1] = 'empty';
    }
    if (this.field[y + 1] !== undefined) {
      if (this.field[y + 1][x + 1] !== undefined) this.field[y + 1][x + 1] = 'empty';
      if (this.field[y + 1][x] !== undefined) this.field[y + 1][x] = 'empty';
      if (this.field[y + 1][x - 1] !== undefined) this.field[y + 1][x - 1] = 'empty';
    }
    if (this.field[y][x + 1] !== undefined) this.field[y][x + 1] = 'empty';
    if (this.field[y][x - 1] !== undefined) this.field[y][x - 1] = 'empty';
  }

  createField(size) {
    for (let i = 0; i < size; i += 1) {
      this.field.push([]);
      for (let j = 0; j < size; j += 1) {
        this.field[i].push(false);
      }
    }
  }

  plantBombs(bombsCount, size) {
    let bombs = bombsCount;
    let overflowedBombs = bombs > (size * size - 9) ? bombs - (size * size - 9) : 0;
    while (bombs > 0) {
      const x = Math.floor(Math.random() * this.field.length);
      const y = Math.floor(Math.random() * this.field.length);
      if (this.field[x][y] === false) {
        this.field[x][y] = '*';
        bombs -= 1;
      } else if (overflowedBombs > 0 && this.field[x][y] === 'empty') {
        this.field[x][y] = '*';
        bombs -= 1;
        overflowedBombs -= 1;
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
        if (this.field[i][j] === false || this.field[i][j] === 'empty' || this.field[i][j] === 'start') this.field[i][j] = checkSiblings(i, j);
      }
    }
  }
}

export default Matrix;
