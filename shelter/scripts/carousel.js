import { CAROUSEL, CAROUSEL_LEFT, CAROUSEL_RIGHT, CAROUSEL_LEFT_CONTENT, CAROUSEL_MIDDLE_CONTENT, CAROUSEL_RIGHT_CONTENT } from "./constants.js";
const ALL_PETS = [0, 1, 2, 3, 4, 5, 6, 7]

const getPets = async () => {
  let res = await fetch('./pets.json');
  return res.json();
}

export const data = await getPets();

const generateCard = (pet) => {
  return `
          <div class="slider__card card">
            <div class="card__image">
              <img src="./assets/images/pets/pets-${pet.name.toLowerCase()}.png" alt="${pet.name} the ${pet.breed} image">
            </div>
            <h3 class="card__name">${pet.name}</h3>
            <div class="card__btn">Learn more</div>
          </div>
          `
}

const generateCarouselPart = (petNumbersArray) => {
  let HTMLContent = '';
  petNumbersArray.forEach(petNumber => {
    HTMLContent += generateCard(data[petNumber])
  })
  return HTMLContent;
}

const generateNewPets = () => {
  let newPets = [...ALL_PETS].filter((petNumber) => !currentPets.includes(petNumber)).sort(() => Math.random() - 0.5);
  return newPets.slice(0, 3);
}

let currentPets = [...ALL_PETS].sort(() => Math.random() - 0.5).slice(0, 3);
let leftPets = generateNewPets();
let rightPets = generateNewPets();

CAROUSEL_MIDDLE_CONTENT.innerHTML = generateCarouselPart(currentPets);
CAROUSEL_LEFT_CONTENT.innerHTML = generateCarouselPart(leftPets);
CAROUSEL_RIGHT_CONTENT.innerHTML = generateCarouselPart(rightPets);

const handleAnimationEnd = (e) => {
  if (e.animationName === 'scroll-left') {
    leftPets = currentPets;
    currentPets = rightPets;
    rightPets = generateNewPets();
    CAROUSEL_LEFT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_RIGHT_CONTENT.innerHTML;
    CAROUSEL_RIGHT_CONTENT.innerHTML = generateCarouselPart(rightPets);
  } else {
    rightPets = currentPets;
    currentPets = leftPets;
    leftPets = generateNewPets();
    CAROUSEL_RIGHT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_LEFT_CONTENT.innerHTML;
    CAROUSEL_LEFT_CONTENT.innerHTML = generateCarouselPart(rightPets);
  }
  CAROUSEL_LEFT.removeAttribute('disabled');
  CAROUSEL_RIGHT.removeAttribute('disabled');
  CAROUSEL.classList.remove('slider-scroll-left');
  CAROUSEL.classList.remove('slider-scroll-right');
}

const scrollLeft = () => {
  CAROUSEL.classList.add('slider-scroll-right');
  CAROUSEL_LEFT.setAttribute('disabled', 'disabled');
  CAROUSEL_RIGHT.setAttribute('disabled', 'disabled');
}

const scrollRight = () => {
  CAROUSEL.classList.add('slider-scroll-left');
  CAROUSEL_LEFT.setAttribute('disabled', 'disabled');
  CAROUSEL_RIGHT.setAttribute('disabled', 'disabled');
}

CAROUSEL.addEventListener('animationend', handleAnimationEnd);
CAROUSEL_LEFT.addEventListener('click', scrollLeft);
CAROUSEL_RIGHT.addEventListener('click', scrollRight);