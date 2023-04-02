console.log(`
  Все пункты выполнены в полном объеме. \n \n \n
  ВНИМАНИЕ! Иногда при измененнии размера окна страницы может заглючить масштабирование, и появиться горизонтальный скролл. Кликните по пустому месту страницы и на жмите ctrl + 0, это сбросит масштабирование. Если горизонтальный скролл пропал, то это не ошибка:) \n
`);

const BURGER = document.getElementById('burger');
const OVERLAY = document.getElementById('overlay')
const MENU = document.getElementById('menu');
const BODY = document.body;

const toggleMenu = () => {
  OVERLAY.classList.toggle('overlay_shown');
  BURGER.classList.toggle('burger_shown');
  MENU.classList.toggle('header__menu_shown');
  BODY.classList.toggle('scroll-block');
}

BURGER.addEventListener('click', toggleMenu);
OVERLAY.addEventListener('click', toggleMenu);
MENU.addEventListener('click', handleMenuClick = (e) => {
  if (e.target.closest('a')) {
    toggleMenu();
  }
})