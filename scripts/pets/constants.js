export const BURGER = document.getElementById('burger');
export const OVERLAY = document.getElementById('overlay')
export const MENU = document.getElementById('menu');
export const BODY = document.body;
export const POPUP = document.getElementById('popup');
export const WRAPPER = document.getElementById('wrapper');
export const POPUP_CONTENT = document.getElementById('popup-content');
export const PAGINATION = document.getElementById('pagination');

const getPets = async () => {
  let res = await fetch('./pets.json');
  return res.json();
}

export const data = await getPets();