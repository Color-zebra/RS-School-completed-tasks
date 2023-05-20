import GameView from './GameView.js';
import StaticView from './StaticView.js';

class View {
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.static = new StaticView(gameInstance);
    this.static.renderStatic();
    this.gameView = new GameView(this.static.elements.gameField, gameInstance);
    this.createWinStr = (seconds, moves) => `Hooray! You found all mines in ${seconds} seconds and ${moves} moves!`;
    this.loseStr = 'Game over. Try again';
    this.classes = {
      shownResult: 'result_shown',
      win: 'win',
      lose: 'lose',
    };
  }

  getNewCells(size) {
    this.gameView.renderGameField(size);
    return this.gameView.cellElements;
  }

  renderPrevResults(results) {
    this.static.clearStatisticTable();
    results.forEach((res) => {
      this.static.elements.resultsTable.append(this.static.createStatisticRow(res));
    });
  }

  showGameResults(isWinner) {
    if (isWinner) {
      this.gameInstance.sounds.playWin();
    } else {
      this.gameInstance.sounds.playLose();
    }

    const time = this.static.elements.timer.innerText;
    const steps = this.static.elements.steps.innerText;
    this.static.elements.resultText.innerText = isWinner
      ? this.createWinStr(time, steps)
      : this.loseStr;

    this.static.elements.resultAnimation.classList.add(
      isWinner
        ? this.classes.win
        : this.classes.lose,
    );

    this.static.elements.resultWindow.classList.add(this.classes.shownResult);
  }

  closeGameResults() {
    this.static.elements.resultAnimation.classList.remove(this.classes.win);
    this.static.elements.resultAnimation.classList.remove(this.classes.lose);
    this.static.elements.resultWindow.classList.remove(this.classes.shownResult);
  }
}

export default View;
