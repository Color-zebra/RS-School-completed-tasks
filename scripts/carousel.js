import { CAROUSEL, CAROUSEL_LEFT, CAROUSEL_RIGHT } from "./constants.js";

const disableArrows = () => {
  CAROUSEL_LEFT.setAttribute('disabled', 'disabled');
  CAROUSEL_RIGHT.setAttribute('disabled', 'disabled');
}

const enableArrows = () => {
  CAROUSEL_LEFT.removeAttribute('disabled');
  CAROUSEL_RIGHT.removeAttribute('disabled');
}

const scrollLeft = () => {
  CAROUSEL.classList.add('slider-scroll-left');
  CAROUSEL_LEFT.removeEventListener('click', scrollLeft);
  disableArrows();
}

const scrollRight = () => {
  CAROUSEL.classList.add('slider-scroll-right');
  CAROUSEL_RIGHT.removeEventListener('click', scrollRight);
  disableArrows();
}

const handleAnimationEnd = () => {
  CAROUSEL.classList.remove('slider-scroll-left');
  CAROUSEL.classList.remove('slider-scroll-right');
  CAROUSEL_LEFT.addEventListener('click', scrollLeft);
  CAROUSEL_RIGHT.addEventListener('click', scrollRight);
  enableArrows();
}



CAROUSEL_LEFT.addEventListener('click', scrollLeft);
CAROUSEL_RIGHT.addEventListener('click', scrollRight);



CAROUSEL.addEventListener("animationend", handleAnimationEnd);