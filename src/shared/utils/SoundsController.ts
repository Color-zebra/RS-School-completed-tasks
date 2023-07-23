import '../assets/sounds/music.mp3';

export default class SoundsController {
  currAudio: HTMLAudioElement;

  constructor() {
    this.currAudio = new Audio();
    this.currAudio.src = './assets/music.mp3';
    this.currAudio.volume = 0.2;
  }

  play() {
    this.currAudio.play();
  }

  stop() {
    this.currAudio.pause();
    this.currAudio.currentTime = 0;
  }
}
