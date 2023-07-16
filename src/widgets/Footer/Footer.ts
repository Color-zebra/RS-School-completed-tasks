import './footer.scss';
import ElemController from '../../shared/utils/ElemController';

export default class Footer extends ElemController {
  protected classes: Record<string, string>;

  protected addClasses: Array<string> | Array<never>;

  constructor(addClasses: [string] | null) {
    super();
    this.classes = {
      baseClass: 'footer',
      link: 'footer__link',
      year: 'footer__year',
      course: 'footer__course',
      image: 'footer__img',
    };
    this.addClasses = addClasses || [];

    this.init();
  }

  init() {
    const git = this.createElem('a', ['Git-hub'], [this.classes.link]);
    git.setAttribute('href', 'https://github.com/Color-zebra');
    const year = this.createElem('span', ['2023'], [this.classes.year]);
    const img = this.createElem('img', null, [this.classes.image]);
    img.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
    const course = this.createElem('a', [img], [this.classes.course]);
    course.setAttribute('href', 'https://rs.school/js/');

    this.elem = this.createElem('footer', [git, year, course], this.classes.baseClass);
  }
}
