import {BURGER, OVERLAY, MENU, BODY } from "./constants.js";

const toggleMenu = () => {
  OVERLAY.classList.toggle('overlay_shown');
  BURGER.classList.toggle('burger_shown');
  MENU.classList.toggle('header__menu_shown');
  BODY.classList.toggle('scroll-block');
}

const handleMenuClick = (e) => {
  if (e.target.closest('a')) {
    toggleMenu();
  }
}

BURGER.addEventListener('click', toggleMenu);
OVERLAY.addEventListener('click', toggleMenu);
MENU.addEventListener('click',  handleMenuClick);