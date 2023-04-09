import { PAGINATION, BACK, FULL_BACK, FORWARD, FULL_FORWARD } from "./constants.js";

const PETS_VALUE = 48;
const uniquePetNumbers = [0, 1, 2, 3, 4, 5, 6, 7];
const wrong = [4, 6, 5, 0, 1, 2, 7, 3, 4, 6, 7, 3, 0, 1, 2, 5, 3, 0, 5, 4, 7, 1, 2, 6, 0, 6, 3, 4, 6, 1, 5, 2, 3, 7, 2, 6, 0, 4, 1, 5, 7, 6, 5, 4, 3, 2, 1, 0]

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

const testElementRepeat = () => {
  const arr = [...allPets];
  console.log('Общий массив');
  console.log(arr);
  console.log('\n', '\n', 'При трех элементах на странице');
  let pageWithError = [];
  let pageArr = [];

  for (let k = 0; k < 16; k++) {
    pageArr.push(arr.slice(3*k, 3*k + 3));
  }

  pageArr.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })

  console.log(pageArr);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
  }
  //=================================================================================================
  console.log('\n', '\n', 'При шести элементах на странице');
  pageWithError = [];
  pageArr = [];

  for (let k = 0; k < 8; k++) {
    pageArr.push(arr.slice(6*k, 6*k + 6));
  }

  pageArr.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })
  
  console.log(pageArr);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
  }
  //=================================================================================================
  console.log('\n', '\n', 'При восьми элементах на странице');
  pageWithError = [];
  pageArr = [];

  for (let k = 0; k < 6; k++) {
    pageArr.push(arr.slice(8*k, 8*k + 8));
  }

  pageArr.forEach((item, index) => {
    if (item.length !== [...new Set(item)].length) {
      pageWithError.push(index);
    }
  })
  
  console.log(pageArr);
  if (pageWithError.length === 0) {
    console.log('Повторов на странице нет');
  } else {
    pageWithError.forEach( item => console.log( `Ошибка! Повтор на странице ${item}`, pageArr[item]));
  }
}



const allPets = generatePetsArray();
testElementRepeat()
