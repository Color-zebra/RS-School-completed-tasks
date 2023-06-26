import { MainPage } from '../pages/MainPage';
import './normalize/normalize.scss';
import './vars/vars.scss';
import './app.scss';
import { StorageAPI } from '../shared/storage/StorageAPI';

export class App {
  mainPage: MainPage;

  constructor() {
    this.mainPage = new MainPage();
  }

  start() {
    document.body.append(this.mainPage.getElem());
  }
}
