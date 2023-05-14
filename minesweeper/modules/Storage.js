class Storage {
  constructor() {
    this.options = null;
    this.statistic = null;
    this.game = {
      field: null,
      openedCells: null,
      markedCells: null,
    };
  }

  save(opts, stat) {
    if (opts) this.saveOptions(opts);
    if (stat) this.saveStatistics(stat);
  }

  load() {
    this.options = this.loadOptions();
    this.statistic = this.loadStatistics();

    return {
      options: this.options,
      statistic: this.statistic,
      game: null,
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

  saveGameState() {
  }

  loadGameState() {
  }
}

export default Storage;
