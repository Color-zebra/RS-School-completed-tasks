import CarTrack from '../../entities/CarTrack/CarTrack';
import { Car } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
import './race.scss';

export default class Race extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  private carTracks: CarTrack[];

  private cars: Car[];

  private serverAPI: ServerAPI;

  constructor(addClasses: [string] | null) {
    super();

    this.classes = {
      baseClass: 'race',
      trackClass: 'race__track',
    };
    this.addClasses = addClasses || [];
    this.serverAPI = ServerAPI.getInstance();

    this.carTracks = [];
    this.cars = [];

    this.init();
  }

  init() {
    this.elem = this.createElem('div', null, this.classes.trackClass);
    this.renderCars();
    this.hydrate();
  }

  hydrate() {
    this.elem?.addEventListener('car-delete', (e) => {
      const id: number = (e as CustomEvent).detail.carId;
      this.deleteCar(id);
    });
  }

  async renderCars() {
    if (!this.elem) return;

    this.clear();

    const data = await this.serverAPI.getCars();

    if (data) {
      this.cars = data.cars;
    }

    this.cars.forEach((car: Car) => {
      const track = new CarTrack(null, car);
      this.carTracks.push(track);
    });
    const carTracksElems = this.carTracks.map((track) => track.getElem());
    if (!this.elem) return;
    this.elem.append(...carTracksElems);
  }

  clear() {
    if (!this.elem) return;
    this.elem.innerHTML = '';
    this.carTracks = [];
  }

  private async deleteCar(id: number) {
    await this.serverAPI.deleteCar(id);
    this.renderCars();
  }
}
