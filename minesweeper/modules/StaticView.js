class StaticView {
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.classes = {
      shownResult: 'result_shown',
      shownStat: 'stat__table_shown',
    };
    this.choosenOptions = {
      size: 10,
      minesCount: 10,
    };
    this.createStatisticRow = (res) => {
      const {
        steps, time, size, mines,
      } = res;
      const row = document.createElement('tr');
      row.classList.add('stat__row');
      row.innerHTML = `
        <td>${steps}</td>
        <td>${time}</td>
        <td>${size}</td>
        <td>${mines}</td>
      `;
      return row;
    };
    this.elements = {
      wrapper: null,
      sizeButtons: null,
      choosenMinesValue: null,
      minesInput: null,
      startBtn: null,
      themeSwitcher: null,
      steps: null,
      resultsBtn: null,
      resultsTable: null,
      timer: null,
      gameField: null,
      resultText: null,
      resultAnimation: null,
      resultWindow: null,
      resultBtn: null,
      flags: null,
      bombs: null,
      soundToggle: null,
    };
  }

  getChoosenOptions() {
    return this.choosenOptions;
  }

  renderStatic() {
    document.body.dataset.theme = 'flame';
    document.body.dataset.size = 10;
    this.createWrapper();
    this.createControls();
    this.createStatistic();
    this.createGameField();
    this.createResultsWindow();
    document.body.append(this.elements.wrapper);
    this.getHtmlElements();
    this.hydrateStatic();
  }

  createWrapper() {
    const wrap = document.createElement('div');
    wrap.classList.add('wrapper');
    this.elements.wrapper = wrap;
  }

  createControls() {
    const controls = document.createElement('div');
    controls.classList.add('controls');
    controls.innerHTML = `
      <div class="controls__size size">
        <div class="size__text">Field size</div>
        <div class="size__inputs">
          <label class="size__label" for="10">
            <input type="radio" class="size__input" name="size" checked id="10">
            <span>small</span>
          </label>
          <label class="size__label" for="15">
            <input type="radio" class="size__input" name="size" id="15">
            <span>medium</span>
          </label>
          <label class="size__label" for="25">
            <input type="radio" class="size__input" name="size" id="25">
            <span>big</span>
          </label>
        </div>
      </div>
      <div class="controls__mines-count">
        <label for="mines-count">Total mines: <span class="controls__mines-value" id="choosen-mines-value">10</span></label>
        <input class="styled-slider" type="range" min="10" max="99" value="10" step="1" id="mines-input" name="mines-count">
      </div>
      <div class="controls__start-game">
        <button id="start-game-btn" class="controls__start-game-button button">Start</button>
      </div>
      <button id="theme-switcher" class="controls__theme-switch-button button">
        Theme
      </button>
      <div class="controls__sound" id="sound">
      </div>
    `;

    this.elements.wrapper.append(controls);
  }

  createStatistic() {
    const statistic = document.createElement('div');
    statistic.classList.add('statistics');
    statistic.innerHTML = `
      <div class="statistics__steps">Steps: <span id="steps">0</span></div>
      <div class="statistics__flags"><div class="statistics__flag-icon"></div> <span id="flags">99</span></div>
      <div class="statistics__stat stat">
        <div class="stat__title button" id="toggle-stat-btn">Latest results</div>
        <table id="table" class="stat__table">
          <tr class="stat__row">
            <th>Steps</th>
            <th>Time</th>
            <th>Size</th>
            <th>Mines</th>
          </tr>
        </table>
      </div>
      <div class="statistics__bombs"><div class="statistics__bomb-icon"></div> <span id="bombs">99</span></div>
      <div class="statistics__time">Time: <span id="time">0</span></div>
    `;
    this.elements.wrapper.append(statistic);
  }

  clearStatisticTable() {
    this.elements.resultsTable.innerHTML = `
    <tr class="stat__row">
      <th>Steps</th>
      <th>Time</th>
      <th>Size</th>
      <th>Mines</th>
    </tr>`;
  }

  createResultsWindow() {
    const results = document.createElement('div');
    results.classList.add('result');
    results.setAttribute('id', 'result');
    results.innerHTML = `
      <p id="result-text" class="result__text">You lose</p>
      <div id="result-animation" class="result__animation"></div>
      <div class="result__start-game-button button" id="result-btn">Start new game</div>
    `;

    this.elements.wrapper.append(results);
  }

  createGameField() {
    const fieldElem = document.createElement('div');
    fieldElem.classList.add('game-field');
    this.elements.gameField = fieldElem;
    this.elements.wrapper.append(fieldElem);
  }

  getHtmlElements() {
    this.elements.sizeButtons = document.querySelectorAll('.size__input');
    this.elements.choosenMinesValue = document.getElementById('choosen-mines-value');
    this.elements.minesInput = document.getElementById('mines-input');
    this.elements.startBtn = document.getElementById('start-game-btn');
    this.elements.themeSwitcher = document.getElementById('theme-switcher');
    this.elements.steps = document.getElementById('steps');
    this.elements.resultsBtn = document.getElementById('toggle-stat-btn');
    this.elements.resultsTable = document.getElementById('table');
    this.elements.timer = document.getElementById('time');
    this.elements.resultText = document.getElementById('result-text');
    this.elements.resultAnimation = document.getElementById('result-animation');
    this.elements.resultWindow = document.getElementById('result');
    this.elements.resultBtn = document.getElementById('result-btn');
    this.elements.flags = document.getElementById('flags');
    this.elements.bombs = document.getElementById('bombs');
    this.elements.soundToggle = document.getElementById('sound');
  }

  hydrateStatic() {
    this.elements.gameField.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    this.elements.themeSwitcher.addEventListener('click', () => {
      const currTheme = document.body.dataset.theme;
      document.body.dataset.theme = currTheme === 'flame' ? 'ice' : 'flame';
      this.gameInstance.storage.saveOptions();
    });

    this.elements.resultsBtn.addEventListener('click', () => {
      this.elements.resultsTable.classList.toggle(this.classes.shownStat);
    });

    const checkRadio = () => {
      let choosenValue = null;
      [...this.elements.sizeButtons].forEach((btn) => {
        if (btn.checked) choosenValue = +btn.getAttribute('id');
      });
      this.choosenOptions.size = choosenValue;
    };

    [...this.elements.sizeButtons].forEach((btn) => {
      btn.addEventListener('change', checkRadio);
    });

    this.elements.minesInput.addEventListener('input', (e) => {
      const { value } = e.target;
      if (this.choosenOptions.minesCount === value) return;

      this.choosenOptions.minesCount = +e.target.value;
      this.elements.choosenMinesValue.innerText = e.target.value;
    });

    this.elements.startBtn.addEventListener('click', () => this.gameInstance.createNewGame.call(this.gameInstance));
    this.elements.resultBtn.addEventListener('click', () => this.gameInstance.createNewGame.call(this.gameInstance));

    this.elements.soundToggle.addEventListener('click', () => {
      const { isMuted } = this.gameInstance.sounds;
      if (isMuted) {
        this.gameInstance.sounds.isMuted = false;
        this.elements.soundToggle.classList.remove('controls__sound_off');
      } else {
        this.gameInstance.sounds.isMuted = true;
        this.elements.soundToggle.classList.add('controls__sound_off');
      }
      this.gameInstance.storage.saveOptions();
    });
  }
}

export default StaticView;
