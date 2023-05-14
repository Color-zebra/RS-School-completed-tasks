class Storage {
  constructor() {
    this.options = null;
    this.statistic = null;
    this.game = null;
  }

  save(opts, stat, game) {
    if (opts) this.saveOptions(opts);
    if (stat) this.saveStatistics(stat);
    if (game) {
      this.saveGameState(game);
    } else {
      this.saveGameState(null);
    };
  }

  load() {
    this.options = this.loadOptions();
    this.statistic = this.loadStatistics();
    this.game = this.loadGameState();

    return {
      options: this.options,
      statistic: this.statistic,
      game: this.game,
    };
  }

  saveOptions(opts) {
    localStorage.setItem('options', JSON.stringify(opts));
  }

  loadOptions() {
    const loaded = localStorage.getItem('options');
    if (loaded) {
      return JSON.parse(loaded);
    }
    return null;
  }

  saveStatistics(stat) {
    localStorage.setItem('statistic', JSON.stringify(stat));
  }

  loadStatistics() {
    const loaded = localStorage.getItem('statistic');
    if (loaded) {
      return JSON.parse(loaded);
    }
    return null;
  }

  saveGameState(game) {
    localStorage.setItem('game', JSON.stringify(game));
  }

  loadGameState() {
    const loaded = localStorage.getItem('game');
    if (loaded) {
      return JSON.parse(loaded);
    }
    return null;
  }
}

export default Storage;
