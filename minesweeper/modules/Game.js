import Field from './Field.js';

class Game {
  constructor() {
    this.size = {
      easy: 10,
      medium: 15,
      hard: 25,
    };
    this.bombsCount = 0;
    this.field = new Field();
  }

  init() {
    this.field.createField(this.size.medium);
    this.field.plantBombs(50);
    this.field.describeField();
    this.field.renderField();
  }
}

export default Game;
