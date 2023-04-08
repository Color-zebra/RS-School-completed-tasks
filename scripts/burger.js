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
  } else {
    unblockScroll(currOffsetY)
  }
}

const handleMenuClick = (e) => {
  if (e.target.closest('a')) {
    toggleMenu();
  }
}

BURGER.addEventListener('click', toggleMenu);
OVERLAY.addEventListener('click', toggleMenu);
MENU.addEventListener('click',  handleMenuClick);