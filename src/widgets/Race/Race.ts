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
  }

  async renderCars() {
    const data = await this.serverAPI.getCars();

    if (data) {
      this.cars = data.cars;
    }

    this.cars.forEach((car: Car) => {
      const track = new CarTrack(null, car);
      this.carTracks.push(track);
    });
    const carTracksElems = this.carTracks.map((track) => track.getElem());
    this.elem?.append(...carTracksElems);
  }
}
