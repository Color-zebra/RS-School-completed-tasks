import { PAGINATION, BACK, FULL_BACK, FORWARD, FULL_FORWARD, data, PAGE_NUMBER, CONTROLS } from "./constants.js";

console.log('Для более удобной проверки введите в консоль "testPagination()" без кавычек, затем нажмите Enter.');

const PETS_VALUE = 48;
const uniquePetNumbers = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5);

const checkSameElements = (prevArray, nextArray) => {
  const tail = prevArray.slice(-4);
  const head = nextArray.slice(0, 4);
  const sum = tail.concat(head);
  return sum.length === [...new Set(sum)].length;
}

const generatePetsArray = () => {
  let petsArray = [...uniquePetNumbers].sort(() => Math.random() - 0.5);
  
  while (petsArray.length < PETS_VALUE) {
    const newPartOfPetsArray = [...uniquePetNumbers].sort(() => Math.random() - 0.5);
    if (checkSameElements(petsArray, newPartOfPetsArray)) {
      petsArray = petsArray.concat(newPartOfPetsArray);
    }
  }

  return petsArray;
}

window.testPagination = function () {
  console.log('Общий массив');
  console.log(allPets);
  console.log('\n', '\n', 'При трех элементах на странице');
  let pageWithError = [];
  let flag = true;

  mobile.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })

  console.log(mobile);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
    flag = false;
  }
  //=================================================================================================
  console.log('\n', '\n', 'При шести элементах на странице');
  pageWithError = [];

  tablet.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })
  
  console.log(tablet);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
    flag = false;
  }
  //=================================================================================================
  console.log('\n', '\n', 'При восьми элементах на странице');
  pageWithError = [];

  desktop.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })
  
  console.log(desktop);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
    flag = false;
  }
  return flag ? 'Ошибок не обнаружено' : 'Ошибка!';
}

const generatePages = () => {
  for (let k = 0; k < 6; k++) {
    desktop.push(allPets.slice(8*k, 8*k + 8));
  }
  for (let k = 0; k < 8; k++) {
    tablet.push(allPets.slice(6*k, 6*k + 6));
  }
  for (let k = 0; k < 16; k++) {
    mobile.push(allPets.slice(3*k, 3*k + 3));
  }
}

const generateCard = (pet) => {
  return `
          <div class="pagination__card card">
            <div class="card__image">
              <img src="./assets/images/pets/pets-${pet.name.toLowerCase()}.png" alt="${pet.name} the ${pet.breed} image">
            </div>
            <h3 class="card__name">${pet.name}</h3>
            <div class="card__btn">Learn more</div>
          </div>
          `
}

const renderPage = () => {
  PAGINATION.classList.remove('blur');
  PAGINATION.classList.add('blur');
  PAGINATION.addEventListener('animationend', () => {
    PAGINATION.classList.remove('blur');
  }, {once: true})

  PAGINATION.innerHTML = '';
  currentDevice[currentPage - 1].forEach((petNumber) => {
    PAGINATION.innerHTML += generateCard(data[petNumber]);
  })
  PAGE_NUMBER.innerText = currentPage;

  FORWARD.removeAttribute('disabled');
  FULL_FORWARD.removeAttribute('disabled');
  BACK.removeAttribute('disabled');
  FULL_BACK.removeAttribute('disabled');

  if (currentPage === lastPage) {
    FORWARD.setAttribute('disabled', 'disabled');
    FULL_FORWARD.setAttribute('disabled', 'disabled');
    BACK.removeAttribute('disabled');
    FULL_BACK.removeAttribute('disabled');
  }
  if (currentPage === 1) {
    BACK.setAttribute('disabled', 'disabled');
    FULL_BACK.setAttribute('disabled', 'disabled');
    FORWARD.removeAttribute('disabled');
    FULL_FORWARD.removeAttribute('disabled');
  }
}

window.onresize = () => {
  if (window.innerWidth > 1200 && petsOnPage !== 8) {
    petsOnPage = 8;
    lastPage = 6;
    currentDevice = desktop;
    if (currentPage > lastPage) currentPage = lastPage;
    renderPage();
  }
  if (window.innerWidth <= 1200 && window.innerWidth > 700 && petsOnPage !== 6) {
    petsOnPage = 6;
    lastPage = 8;
    currentDevice = tablet;
    if (currentPage > lastPage) currentPage = lastPage;
    renderPage();
  }
  if (window.innerWidth <= 700 && petsOnPage !== 3) {
    petsOnPage = 3;
    lastPage = 16;
    currentDevice = mobile;
    if (currentPage > lastPage) currentPage = lastPage;
    renderPage();
  }
}

/* const toNextPage = () => {
  currentPage += 1;
  renderPage();
}

const toPrevPage = () => {
  currentPage -= 1;
  renderPage();
}

const toLastPage = () => {
  currentPage = lastPage;
  renderPage();
}

const toFirstPage = (e) => {
  currentPage = 1;
  renderPage();
} */

const allPets = generatePetsArray();
let desktop = [];
let tablet = [];
let mobile = [];
let currentDevice = desktop;
let petsOnPage = 8;
let currentPage = 1;
let lastPage = 6;

generatePages();
window.onresize();
renderPage();

/* FULL_BACK.addEventListener('click', toFirstPage);
BACK.addEventListener('click', toPrevPage);
FORWARD.addEventListener('click', toNextPage);
FULL_FORWARD.addEventListener('click', toLastPage); */

const handleControlsClick = (e) => {
  switch (e.target) {
    case FULL_BACK: 
      currentPage = 1;
      break;
    case BACK: 
      currentPage -= 1;
      break;
    case FULL_FORWARD: 
      currentPage = lastPage;
      break;
    case FORWARD: 
      currentPage += 1;
      break;
  }
  renderPage();
}

CONTROLS.addEventListener('click', handleControlsClick)



