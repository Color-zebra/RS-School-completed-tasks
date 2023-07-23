import { brands, models } from '../data/carName';
import { CarInfo } from '../types/interfaces';

export default class CarInfoGenerator {
  private static instance: CarInfoGenerator;

  private brands: string[];

  private models: string[];

  constructor() {
    this.brands = brands;
    this.models = models;
  }

  public static getInstance() {
    if (!CarInfoGenerator.instance) {
      CarInfoGenerator.instance = new CarInfoGenerator();
    }
    return CarInfoGenerator.instance;
  }

  private getRandomColor() {
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      color += Math.floor(Math.random() * 255).toString(16);
    }
    return color;
  }

  private generateRandomName() {
    const randomBrandIndex = this.getRandomIndex(this.brands.length);
    const randomModelIndex = this.getRandomIndex(this.models.length);
    return `${this.brands[randomBrandIndex]} ${this.models[randomModelIndex]}`;
  }

  private getRandomIndex(maxValue: number) {
    return Math.floor(Math.random() * maxValue);
  }

  generateRandomCar(): CarInfo {
    const res = {
      name: this.generateRandomName(),
      color: this.getRandomColor(),
    };

    return res;
  }
}
