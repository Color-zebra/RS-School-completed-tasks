import CarTrack from '../../features/CarTrack/CarTrack';
import Pagination from '../../features/Pagination/Pagination';
import { CustomEvents } from '../../shared/types/enums';
import { Car, Winner } from '../../shared/types/interfaces';
import ElemController from '../../shared/utils/ElemController';
import ServerAPI from '../../shared/utils/ServerAPI';
import './race.scss';

export default class Race extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  private carTracks: CarTrack[];

  private cars: Car[];

  private serverAPI: ServerAPI;

  private pagination: Pagination;

  private carTracksContainer: HTMLElement;

  private currPage: number;

  private totalPages: number;

  private totalCars: number;

  private carsPerPage: number;

  isWinnerSet: boolean;

  constructor(addClasses: [string] | null) {
    super();

    this.classes = {
      baseClass: 'race',
      trackClass: 'race__track',
    };
    this.addClasses = addClasses || [];

    this.serverAPI = ServerAPI.getInstance();
    this.pagination = new Pagination(
      () => this.prevPage(),
      () => this.nextPage()
    );

    this.carTracksContainer = this.createElem('div', null, null);
    this.carTracks = [];
    this.cars = [];
    this.currPage = 0;
    this.totalPages = 0;
    this.totalCars = 0;
    this.carsPerPage = 7;

    this.isWinnerSet = false;

    this.init();
  }

  init() {
    this.elem = this.createElem('div', [this.pagination.getElem()], this.classes.trackClass);
    this.currPage = 1;
    this.renderCars();
    this.hydrate();
  }

  hydrate() {
    this.elem?.addEventListener(CustomEvents.delete, (e) => {
      const id: number = (e as CustomEvent).detail.carId;
      this.deleteCar(id);
    });

    this.elem?.addEventListener(CustomEvents.finish, (e) => {
      const id: number = (e as CustomEvent).detail.carId;
      const time: number = (e as CustomEvent).detail.totalTime;
      if (this.isWinnerSet) return;
      this.setWinner(id, time);
      this.isWinnerSet = true;
    });
  }

  async renderCars() {
    if (!this.elem) return;

    this.clear();

    const data = await this.serverAPI.getCars(this.currPage);

    if (data) {
      this.updateCurrPageCars(data.cars);
      this.updateTotalCars(data?.count);
    }
  }

  updateTotalCars(totalCars: number | string | null) {
    if (!totalCars) return;
    this.totalCars = +totalCars;
    this.totalPages = Math.ceil(this.totalCars / this.carsPerPage);
  }

  updateSingleCar(car: Car) {
    const carForUpdate = this.carTracks.find((item) => item.carId === car.id);
    if (carForUpdate) {
      carForUpdate.changeCar(car.color, car.name);
    }
  }

  updateCurrPageCars(cars: Car[]) {
    if (cars.length === 0 && this.currPage > 1) {
      this.prevPage();
    }

    this.cars = cars;

    this.cars.forEach((car: Car) => {
      const track = new CarTrack(null, car);
      this.carTracks.push(track);
    });

    const carTracksElems = this.carTracks.map((track) => track.getElem());

    this.carTracksContainer.append(...carTracksElems);

    this.elem?.append(this.carTracksContainer);
  }

  clear() {
    if (!this.carTracksContainer) return;
    this.carTracksContainer.innerHTML = '';
    this.carTracks = [];
  }

  private async deleteCar(id: number) {
    await this.serverAPI.deleteCar(id);
    this.renderCars();
  }

  nextPage() {
    if (this.currPage >= this.totalPages) return;
    this.currPage += 1;
    this.pagination.updatePageNumber(this.currPage);
    this.renderCars();
  }

  prevPage() {
    if (this.currPage <= 1) return;
    this.currPage -= 1;
    this.pagination.updatePageNumber(this.currPage);
    this.renderCars();
  }

  async startRace() {
    const startPromises = this.carTracks.map((carTrack) => carTrack.startEngine());
    await Promise.all(startPromises);
    this.carTracks.map((carTrack) => carTrack.startCar(true));
    this.isWinnerSet = false;
  }

  stopRace() {
    console.log('Race stopped');
  }

  async setWinner(carId: number, time: number) {
    const winner = await this.serverAPI.getWinner(carId);
    if (winner === null) {
      const newWinner: Winner = {
        id: carId,
        wins: 1,
        time,
      };

      await this.serverAPI.saveWinner(newWinner);
    } else {
      const updatedWinner: Winner = {
        id: carId,
        wins: winner.wins + 1,
        time: Math.min(time, winner.time),
      };

      await this.serverAPI.updateWinner(updatedWinner);
    }
  }
}
