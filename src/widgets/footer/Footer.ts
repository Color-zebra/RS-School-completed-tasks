import { ElemController } from '../../shared/utils/elemController';
import './footer.scss';

export class Footer extends ElemController {
  classes: Record<string, string>;

  constructor() {
    super();

    this.classes = {
      mainClass: 'footer',
      link: 'footer__link',
      year: 'footer__year',
      course: 'footer__course',
      image: 'footer__img',
    };

    this.init();
  }

  init() {
    const git = this.createElem('a', [this.classes.link], ['Git-hub']);
    git.setAttribute('href', 'https://github.com/Color-zebra');
    const year = this.createElem('span', [this.classes.year], ['2023']);
    const img = this.createElem('img', [this.classes.image], []);
    img.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
    const course = this.createElem('a', [this.classes.course], [img]);
    course.setAttribute('href', 'https://rs.school/js/');

    this.elem = this.createElem('footer', [this.classes.mainClass], [git, year, course]);
  }
}
