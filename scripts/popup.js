import { data } from "./carousel.js";
import { POPUP, CAROUSEL, BODY, WRAPPER, POPUP_CONTENT } from "./constants.js";
import { blockScroll, unblockScroll } from "./scrollBlock.js";

let currOffsetY = 0;

const openModal = (e) => {
  if (e.target.closest('.card')) {
    const currPetName = e.target.closest('.card').querySelector('.card__name').innerText;
    generateModal(currPetName);
    //console.log(currPetName);
    currOffsetY = window.scrollY;
    POPUP.style.top = `${currOffsetY}px`;
    POPUP.classList.add('popup__show');
    blockScroll(currOffsetY);
  }
}

const closeModal = (e) => {
  if ([...e.target.classList].includes('popup__overlay') || [...e.target.classList].includes('popup__close')) {
    POPUP.classList.remove('popup__show');
    unblockScroll(currOffsetY);
  }
}

const generateModal = (petName) => {
  const petInfo = data.find((item) => item.name === petName);
  POPUP_CONTENT.innerHTML = `
  <div class="popup__close"></div>
  <div class="popup__image">
    <img src="./assets/images/pets/pets-${petInfo.name.toLowerCase()}.png" alt="${petInfo.name} the ${petInfo.name} image">
  </div>
  <div class="popup__text">
    <div class="popup__name">${petInfo.name}</div>
    <div class="popup__type-and-breed">
      <span>${petInfo.type}</span> - <span>${petInfo.breed}</span>
    </div>
    <div class="popup__desc">${petInfo.description}</div>
    <ul class="popup__info">
      <li class="popup__info-item"><span class="popup__info-title">Age: </span> <span class="popup__info-text">${petInfo.age}</span> </li>
      <li class="popup__info-item"><span class="popup__info-title">Inoculations: </span> <span class="popup__info-text">${petInfo.inoculations}</span> </li>
      <li class="popup__info-item"><span class="popup__info-title">Diseases: </span> <span class="popup__info-text">${petInfo.diseases}</span> </li>
      <li class="popup__info-item"><span class="popup__info-title">Parasites: </span> <span class="popup__info-text">${petInfo.parasites}</span> </li>
    </ul>
  </div>
  `
}

CAROUSEL.addEventListener('click', openModal);
POPUP.addEventListener('click', closeModal);