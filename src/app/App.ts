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
  }
}
