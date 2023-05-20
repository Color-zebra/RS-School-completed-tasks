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
  }
}

export default Storage;
