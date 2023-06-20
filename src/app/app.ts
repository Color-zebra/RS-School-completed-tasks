import { MainPage } from '../pages/mainPage';
import './normalize/normalize.scss';
import './vars/vars.scss';

export class App {
  mainPage: MainPage;

  constructor() {
    this.mainPage = new MainPage();
  }

  start() {
    this.mainPage.init();
    document.body.append(this.mainPage.getElem());
  }
}
