import { CAROUSEL, CAROUSEL_LEFT, CAROUSEL_RIGHT, CAROUSEL_LEFT_CONTENT, CAROUSEL_MIDDLE_CONTENT, CAROUSEL_RIGHT_CONTENT } from "./constants.js";

const getPets = async () => {
  let res = await fetch('./pets.json');
  return res.json();
}

const generateCard = (pet) => {
  return `
          <div class="slider__card card">
            <div class="card__image">
              <img src="./assets/images/pets/pets-${pet.name.toLowerCase()}.png" alt="${pet.breed}">
            </div>
            <h3 class="card__name">${pet.name}</h3>
            <div class="card__btn">Learn more</div>
          </div>
          `
}

const generateNewPets = () => {
  let newPets = data.filter(({name}) => !currentPetsNames.includes(name));
  newPets = newPets.sort(() => Math.random() - 0.5).slice(0, 3);
  console.log(newPets);

  return newPets
}

const data = await getPets();
let currentPetsNames = ['Katrine', 'Jennifer', 'Woody'];
let newPets = generateNewPets();

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


const scrollLeft = () => {
  CAROUSEL.classList.add('slider-scroll-left');
  CAROUSEL_LEFT.removeEventListener('click', scrollLeft);
  disableArrows();
  CAROUSEL.addEventListener('animationend', () => {
    CAROUSEL_LEFT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_RIGHT_CONTENT.innerHTML;
    CAROUSEL_RIGHT_CONTENT.innerHTML = generateNewCarouselContent();
  }, {once: true})
}

const scrollRight = () => {
  CAROUSEL.classList.add('slider-scroll-right');
  CAROUSEL_RIGHT.removeEventListener('click', scrollRight);
  disableArrows();
  CAROUSEL.addEventListener('animationend', () => {
    CAROUSEL_RIGHT_CONTENT.innerHTML = CAROUSEL_MIDDLE_CONTENT.innerHTML;
    CAROUSEL_MIDDLE_CONTENT.innerHTML = CAROUSEL_LEFT_CONTENT.innerHTML;
    CAROUSEL_LEFT_CONTENT.innerHTML = generateNewCarouselContent();
  }, {once: true})
}

const handleAnimationEnd = () => {
  CAROUSEL.classList.remove('slider-scroll-left');
  CAROUSEL.classList.remove('slider-scroll-right');
  CAROUSEL_LEFT.addEventListener('click', scrollLeft);
  CAROUSEL_RIGHT.addEventListener('click', scrollRight);
  currentPetsNames.length = 0;
  newPets.forEach(({name}) => currentPetsNames.push(name));
  newPets = generateNewPets();
  enableArrows();
}

CAROUSEL_LEFT_CONTENT.innerHTML = generateNewCarouselContent();
CAROUSEL_RIGHT_CONTENT.innerHTML = generateNewCarouselContent();

CAROUSEL_LEFT.addEventListener('click', scrollLeft);
CAROUSEL_RIGHT.addEventListener('click', scrollRight);



CAROUSEL.addEventListener("animationend", handleAnimationEnd);