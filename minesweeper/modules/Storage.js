class Storage {
  constructor(gameInstance) {
    this.gameInstance = gameInstance;

    this.saveOptions = () => {
      const { theme } = document.body.dataset;
      const sound = !this.gameInstance.sounds.isMuted;
      const opt = { theme, sound };
      localStorage.setItem('ms-options', JSON.stringify(opt));
    };

    this.loadOptions = () => {
      let opt = localStorage.getItem('ms-options');
      if (!opt) return;
      opt = JSON.parse(opt);
      if (!opt.sound) {
        this.gameInstance.sounds.isMuted = true;
        this.gameInstance.view.static.elements.soundToggle.classList.add('controls__sound_off');
      }
      document.body.dataset.theme = opt.theme;
    };

    this.savePrevRes = () => {
      localStorage.setItem('ms-latest', JSON.stringify(this.gameInstance.prevResults));
    };

    this.loadPrevRes = () => {
      const prev = localStorage.getItem('ms-latest');
      if (prev) return JSON.parse(prev);
      return null;
    };

    this.loadGame = () => {
      const gameState = localStorage.getItem('ms-game');
      if (!gameState) return null;
      return JSON.parse(gameState);
    };

    this.saveGame = this.saveGame.bind(this);
  }

  saveGame() {
    console.log('save');
    if (!this.gameInstance.isStarted || this.gameInstance.isGameOver) {
      localStorage.removeItem('ms-game');
      return;
    }
    const size = this.gameInstance.gameSize;
    const mines = this.gameInstance.gameMinesCount;
    const time = this.gameInstance.gameTime;
    const steps = this.gameInstance.gameSteps;
    const fieldState = [];
    for (let i = 0; i < size; i += 1) {
      fieldState.push([]);
      for (let j = 0; j < size; j += 1) {
        const cell = this.gameInstance.cells[i][j];
        const cellValue = cell.value;
        const { isOpen, isMarked } = cell;
        const cellState = { cellValue, isOpen, isMarked };
        fieldState[i].push(cellState);
      }
    }
    const gameState = {
      size,
      mines,
      time,
      steps,
      fieldState,
    };
    localStorage.setItem('ms-game', JSON.stringify(gameState));
  }
}

export default Storage;
