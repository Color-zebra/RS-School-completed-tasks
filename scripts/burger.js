import {BURGER, OVERLAY, MENU } from "./constants.js";
import { blockScroll, unblockScroll } from "./scrollBlock.js";

let currOffsetY = 0;

const toggleMenu = () => {
  OVERLAY.classList.toggle('overlay_shown');
  BURGER.classList.toggle('burger_shown');
  MENU.classList.toggle('header__menu_shown');
  if (MENU.classList.contains('header__menu_shown')) {
    currOffsetY = window.scrollY;
    blockScroll(currOffsetY);
    MENU.style.top = `${currOffsetY}px`;
  } else {
    unblockScroll(currOffsetY)
  }
}

const handleMenuClick = (e) => {
  if (e.target.closest('a')) {
    toggleMenu();
  }
}

const removeBurger = () => {
  OVERLAY.classList.remove('overlay_shown');
  BURGER.classList.remove('burger_shown');
  MENU.classList.remove('header__menu_shown');
  unblockScroll(currOffsetY);
}

window.onresize = () => {
  if (window.innerWidth > 767 && BURGER.classList.contains('burger_shown') ){
    removeBurger();
  }
}

BURGER.addEventListener('click', toggleMenu);
OVERLAY.addEventListener('click', toggleMenu);
MENU.addEventListener('click',  handleMenuClick);