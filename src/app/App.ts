import './app.scss';
import '../shared/assets/img/sprite.svg';
import ServerAPI from '../shared/utils/ServerAPI';

export default class App {
  private serverAPI: ServerAPI;

  constructor() {
    this.serverAPI = ServerAPI.getInstance();
  }

  start() {
    // this.testSVG();
    this.testServerApi();
  }

  // eslint-disable-next-line class-methods-use-this
  testSVG() {
    const svgNS = 'http://www.w3.org/2000/svg';

    const svgElem1 = document.createElementNS(svgNS, 'svg');
    const useElem1 = document.createElementNS(svgNS, 'use');
    useElem1.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#witch-icon');
    svgElem1.setAttribute('color', 'blue');
    svgElem1.setAttribute('width', '8vh');
    svgElem1.setAttribute('height', '8vh');
    svgElem1.appendChild(useElem1);

    const svgElem2 = document.createElementNS(svgNS, 'svg');
    const useElem2 = document.createElementNS(svgNS, 'use');
    useElem2.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#car-icon');
    svgElem2.setAttribute('color', 'aqua');
    svgElem2.setAttribute('width', '8vh');
    svgElem2.setAttribute('height', '8vh');
    svgElem2.appendChild(useElem2);

    document.body.appendChild(svgElem1);
    document.body.appendChild(svgElem2);

    document.getElementById('click-me')?.addEventListener('click', () => {
      let color = '';
      for (let i = 0; i < 3; i += 1) {
        color += Math.floor(Math.random() * 256).toString(16);
        console.log(color);
      }
      svgElem2.setAttribute('color', `#${color}`);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async testServerApi() {
    console.log(await this.serverAPI.getCars());
    // console.log(await this.serverAPI.getCar(1));
    // console.log(await this.serverAPI.saveCar({ name: 'test', color: 'testcolor' }));
    // console.log(await this.serverAPI.deleteCar(1));
    // console.log(await this.serverAPI.updateCar({ name: 'new', color: 'black', id: 1 }));
    // console.log(await this.serverAPI.getCars());
    // console.log(await this.serverAPI.startCarEngine(1));
    // console.log(await this.serverAPI.driveCar(1));
    // console.log(await this.serverAPI.stopCarEngine(1));
    console.log(
      await this.serverAPI.saveWinner({
        id: 109,
        wins: 1,
        time: 10,
      })
    );
    console.log(await this.serverAPI.getWinners('byId', 'RIGHT'));
    // console.log(await this.serverAPI.updateWinner({ id: 1, time: 115, wins: 100500 }));
    console.log(await this.serverAPI.saveWinner({ id: 1, time: 115, wins: 100500 }));
    console.log(await this.serverAPI.getWinners('byId', 'RIGHT'));
    console.log(await this.serverAPI.deleteWinner(1));
    console.log(await this.serverAPI.getWinners('byId', 'RIGHT'));
  }
}
