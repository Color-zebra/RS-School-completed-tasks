class Field {
  constructor() {
    this.field = [];
  }

  createField(size = 10) {
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
      return value;
    };
    for (let i = 0; i < this.field.length; i += 1) {
      for (let j = 0; j < this.field.length; j += 1) {
        if (!this.field[i][j]) this.field[i][j] = String(checkSiblings(i, j));
      }
    }
  }

  renderField() {
    console.log(this.field);
  }
}

export default Field;
