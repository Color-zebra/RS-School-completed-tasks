import { ModeNames } from '../../shared/types/enums';
import ElemController from '../../shared/utils/ElemController';
import SoundsController from '../../shared/utils/SoundsController';
import './modechangepopup.scss';

export default class ModeChangePopup extends ElemController {
  protected classes: Record<string, string>;

  modeChangeCB: () => void;

  private player: SoundsController;

  constructor(modeChangeCB: () => void) {
    super();

    this.classes = {
      baseClass: 'mode-change-popup',
      show: 'mode-change-popup_shown',
      hide: 'mode-change-popup_hide',
      tremor: 'mode-change-popup_tremor',
    };

    this.player = new SoundsController();

    this.modeChangeCB = modeChangeCB;

    this.init();
  }

  init() {
    this.elem = this.createElem('div', null, this.classes.baseClass);
  }

  showPopup(mode: ModeNames) {
    if (!this.elem) return;

    if (mode === ModeNames.fun) {
      this.player.play();
    } else {
      this.player.stop();
    }

    document.body.append(this.elem);

    this.elem.addEventListener(
      'animationend',
      (e) => {
        this.tremorPopup(e);
      },
      {
        once: true,
      }
    );

    this.elem.classList.add(this.classes.show);
  }

  tremorPopup(e: Event) {
    this.modeChangeCB();
    this.elem?.classList.remove(this.classes.show);
    this.elem?.classList.add(this.classes.tremor);
    e.stopImmediatePropagation();
    this.elem?.addEventListener(
      'animationend',
      (event) => {
        this.hidePopup(event);
      },
      {
        once: true,
      }
    );
  }

  hidePopup(e: Event) {
    this.elem?.classList.remove(this.classes.tremor);
    this.elem?.classList.add(this.classes.hide);
    e.stopImmediatePropagation();
    this.elem?.addEventListener(
      'animationend',
      () => {
        this.elem?.classList.remove(this.classes.hide);
        this.elem?.remove();
        e.stopImmediatePropagation();
      },
      {
        once: true,
      }
    );
  }
}
