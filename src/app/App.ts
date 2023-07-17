import './app.scss';
import '../shared/assets/img/sprite.svg';
import Router from '../processes/Router/Router';

export default class App {
  protected router: Router;

  constructor() {
    this.router = new Router();
  }

  start() {
    document.body.append(this.router.getElem());
    // this.testSVG();
  }

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

    /* document.getElementById('click-me')?.addEventListener('click', () => {
      let color = '';
      for (let i = 0; i < 3; i += 1) {
        color += Math.floor(Math.random() * 256).toString(16);
        console.log(color);
      }
      svgElem2.setAttribute('color', `#${color}`);
    }); */
  }
}
