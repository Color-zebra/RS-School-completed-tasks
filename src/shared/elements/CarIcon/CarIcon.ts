import { Car } from '../../types/interfaces';
import ElemController from '../../utils/ElemController';
import './caricon.scss';

export default class CarIcon extends ElemController {
  protected classes: Record<string, string>;

  private color: string;

  private name: string;

  private id: number;

  svgNS: string;

  svgElem: SVGElement;

  useElem: SVGUseElement;

  funModeEnabled: boolean;

  constructor(car: Car) {
    super();

    this.classes = {
      baseClass: 'car-icon',
    };

    this.svgNS = 'http://www.w3.org/2000/svg';

    this.svgElem = document.createElementNS(this.svgNS, 'svg') as SVGElement;
    this.useElem = document.createElementNS(this.svgNS, 'use') as SVGUseElement;

    this.color = car.color;
    this.name = car.name;
    this.id = car.id;

    this.funModeEnabled = false;

    this.init();
  }

  init() {
    this.useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#car-icon');
    this.svgElem.setAttribute('color', this.color);
    this.svgElem.setAttribute('width', '8vh');
    this.svgElem.setAttribute('height', '8vh');
    this.svgElem.appendChild(this.useElem);
    const container = this.createElem('div', [this.svgElem], this.classes.baseClass);

    container.addEventListener('click', () => this.switchMode());

    this.elem = container;
  }

  enableFunMod() {
    this.useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#witch-icon');
    this.funModeEnabled = true;
  }

  disableFunMode() {
    this.funModeEnabled = false;
    this.useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/sprite.svg#car-icon');
  }

  switchMode() {
    if (this.funModeEnabled) {
      this.disableFunMode();
    } else {
      this.enableFunMod();
    }
  }
}
