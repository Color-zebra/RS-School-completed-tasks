class Sound {
  constructor() {
    this.currAudio = new Audio();
    this.isMuted = false;
  }

  playStep() {
    if (this.isMuted) return;
    this.currAudio = new Audio();
    this.currAudio.src = './assets/sounds/step-sound.mp3';
    this.currAudio.play();
  }

  playFlag() {
    if (this.isMuted) return;
    this.currAudio = new Audio();
    this.currAudio.src = './assets/sounds/flag-sound.mp3';
    this.currAudio.play();
  }

  playWin() {
    if (this.isMuted) return;
    this.currAudio = new Audio();
    this.currAudio.src = './assets/sounds/win-sound.mp3';
    this.currAudio.play();
  }

  playLose() {
    if (this.isMuted) return;
    this.currAudio = new Audio();
    this.currAudio.src = './assets/sounds/fall-sound.mp3';
    this.currAudio.play();
  }
}

export default Sound;
