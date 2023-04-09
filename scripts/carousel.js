import { CAROUSEL, CAROUSEL_LEFT, CAROUSEL_RIGHT, CAROUSEL_LEFT_CONTENT, CAROUSEL_MIDDLE_CONTENT, CAROUSEL_RIGHT_CONTENT } from "./constants.js";

const getPets = async () => {
  let res = await fetch('./pets.json');
  return res.json();
}

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

const generateNewPets = () => {
  let newPets = data.filter(({name}) => !currentPetsNames.includes(name));
  newPets = newPets.sort(() => Math.random() - 0.5).slice(0, 3);
  return newPets
}

const disableArrows = () => {
  CAROUSEL_LEFT.setAttribute('disabled', 'disabled');
  CAROUSEL_RIGHT.setAttribute('disabled', 'disabled');
}

const enableArrows = () => {
  CAROUSEL_LEFT.removeAttribute('disabled');
  CAROUSEL_RIGHT.removeAttribute('disabled');
}

const generateNewCarouselContent = () => {
  let newPetsHtml = '';
  newPets.forEach(pet => {
    newPetsHtml += generateCard(pet);
  })
  return newPetsHtml;
}

const changePets = () => {
  const currentCards = CAROUSEL_MIDDLE_CONTENT.getElementsByClassName('card__name');
  currentPetsNames.length = 0;
  [...currentCards].forEach(item => currentPetsNames.push(item.innerText));
  newPets = generateNewPets();
}


const scrollRight = () => {
  CAROUSEL.classList.add('slider-scroll-left');
  disableArrows();
  CAROUSEL.addEventListener('animationend', () => {
    CAROUSEL_LEFT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_RIGHT_CONTENT.innerHTML;
    changePets();
    CAROUSEL_RIGHT_CONTENT.innerHTML = generateNewCarouselContent();
  }, {once: true})
}

const scrollLeft = () => {
  console.log('click');
  CAROUSEL.classList.add('slider-scroll-right');
  disableArrows();
  CAROUSEL.addEventListener('animationend', () => {
    CAROUSEL_RIGHT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_LEFT_CONTENT.innerHTML;
    changePets();
    CAROUSEL_LEFT_CONTENT.innerHTML = generateNewCarouselContent();
  }, {once: true})
}

const handleAnimationEnd = () => {
  CAROUSEL.classList.remove('slider-scroll-left');
  CAROUSEL.classList.remove('slider-scroll-right');
  enableArrows();
}

export const data = await getPets();
let currentPetsNames = ['Katrine', 'Jennifer', 'Woody'];
let newPets = generateNewPets();

CAROUSEL_LEFT_CONTENT.innerHTML = generateNewCarouselContent();
CAROUSEL_RIGHT_CONTENT.innerHTML = generateNewCarouselContent();

CAROUSEL_LEFT.addEventListener('click', scrollLeft);
CAROUSEL_RIGHT.addEventListener('click', scrollRight);

CAROUSEL.addEventListener("animationend", handleAnimationEnd);