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
    this.controls = null;
    this.fieldWrapper = null;
    this.HTMLElements = {
      themeSwitcher: document.getElementById('theme-switcher'),
    };
  }

  init() {
    this.field.createField(this.size.medium);
    this.field.plantBombs(50);
    this.field.describeField();
    this.field.renderField();
    this.hydrateGame();
  }

  hydrateGame() {
    this.HTMLElements.themeSwitcher.addEventListener('click', () => {
      console.log('switch');
      const currTheme = document.body.dataset.theme;
      console.log(currTheme);
      document.body.dataset.theme = currTheme === 'flame' ? 'ice' : 'flame';
    });
  }
}

export default Game;
