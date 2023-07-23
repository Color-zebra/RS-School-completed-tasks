import { SortOrders, SortTypes } from '../types/enums';
import { Car, CarInfo, SpeedParams, Winner } from '../types/interfaces';

export default class ServerAPI {
  private static instance: ServerAPI;

  private baseAddress: string;

  private garageAddress: string;

  private engineAddress: string;

  private winnersAddress: string;

  private carsPerPage: number;

  private winnersPerPage: number;

  private constructor() {
    this.baseAddress = 'http://localhost:3000';
    this.garageAddress = '/garage';
    this.engineAddress = '/engine';
    this.winnersAddress = '/winners';
    this.carsPerPage = 7;
    this.winnersPerPage = 10;
  }

  public static getInstance() {
    if (!ServerAPI.instance) {
      ServerAPI.instance = new ServerAPI();
    }
    return ServerAPI.instance;
  }

  public async getCars(page?: number) {
    const choosenPageLink = page ? `&_page=${page}` : '';
    const choosenLimitLink = `?_limit=${this.carsPerPage}`;
    const link = `${this.baseAddress}${this.garageAddress}${choosenLimitLink}${choosenPageLink}`;
    let responce;
    try {
      responce = await fetch(link);
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.ok) {
      const cars: Array<Car> = await responce.json();
      const count = responce.headers.get('X-Total-Count');
      return { cars, count };
    }

    return null;
  }

  public async getCar(id: number) {
    const link = `${this.baseAddress + this.garageAddress}/${id}`;
    let responce;

    try {
      responce = await fetch(link);
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.ok) {
      const car: Car = await responce.json();
      return car;
    }

    return null;
  }

  public async saveCar(car: CarInfo) {
    const link = this.baseAddress + this.garageAddress;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 201) {
      const createdCar: Car = await responce.json();
      return createdCar;
    }

    return null;
  }

  public async deleteCar(id: number) {
    const link = `${this.baseAddress + this.garageAddress}/${id}`;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'DELETE',
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) return true;
    return null;
  }

  public async updateCar(car: Car) {
    const link = `${this.baseAddress + this.garageAddress}/${car.id}`;
    const newInfo = {
      name: car.name,
      color: car.color,
    };
    let responce;

    try {
      responce = await fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInfo),
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) {
      const updatedCar: Car = await responce.json();
      return updatedCar;
    }

    return null;
  }

  public async startCarEngine(carId: number) {
    const link = `${this.baseAddress + this.engineAddress}/?id=${carId}&status=started`;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'PATCH',
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) {
      const speedParams: SpeedParams = await responce.json();
      return speedParams;
    }

    return null;
  }

  public async stopCarEngine(carId: number) {
    const link = `${this.baseAddress + this.engineAddress}/?id=${carId}&status=stopped`;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'PATCH',
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) return true;

    return null;
  }

  public async driveCar(carId: number) {
    const link = `${this.baseAddress + this.engineAddress}/?id=${carId}&status=drive`;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'PATCH',
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    switch (responce?.status) {
      case 200:
        return true;

      case 404:
        return 404;

      case 500:
        return 500;

      default:
        return null;
    }
  }

  public async getWinners(sort: SortTypes, order: SortOrders, page?: number) {
    const choosenPageLink = page ? `&_page=${page}` : '';
    const choosenLimitLink = `?_limit=${this.winnersPerPage}`;
    const sortTypeLink = `&_sort=${sort}`;
    const sortOrderLink = `&_order=${order}`;
    const link = `${this.baseAddress}${this.winnersAddress}${choosenLimitLink}${choosenPageLink}${sortTypeLink}${sortOrderLink}`;
    let responce;
    try {
      responce = await fetch(link);
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.ok) {
      const winners: Array<Winner> = await responce.json();
      const count = responce.headers.get('X-Total-Count');
      return { winners, count };
    }

    return null;
  }

  public async getWinner(id: number) {
    const link = `${this.baseAddress + this.winnersAddress}/${id}`;
    let responce;

    try {
      responce = await fetch(link);
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.ok) {
      const winner: Winner = await responce.json();
      return winner;
    }

    return null;
  }

  public async saveWinner(winner: Winner) {
    const link = this.baseAddress + this.winnersAddress;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 201) {
      const createdWinner: Winner = await responce.json();
      return createdWinner;
    }

    return null;
  }

  public async deleteWinner(id: number) {
    const link = `${this.baseAddress + this.winnersAddress}/${id}`;
    let responce;

    try {
      responce = await fetch(link, {
        method: 'DELETE',
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) return true;
    return null;
  }

  public async updateWinner(winner: Winner) {
    const link = `${this.baseAddress + this.winnersAddress}/${winner.id}`;
    const newInfo = {
      wins: winner.wins,
      time: winner.time,
    };
    let responce;

    try {
      responce = await fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInfo),
      });
    } catch (error) {
      if (error instanceof Error) return null;
    }

    if (responce?.status === 200) {
      const updatedWinner: Winner = await responce.json();
      return updatedWinner;
    }

    return null;
  }
}
