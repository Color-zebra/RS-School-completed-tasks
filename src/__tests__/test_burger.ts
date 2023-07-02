import { Burger } from '../features/burger/Burger';

describe('Test burger', () => {
  const burger = new Burger(
    () => {
      console.log('open menu');
    },
    () => {
      console.log('close menu');
    }
  );

  const spyClose = jest.spyOn(burger, 'closeMenu');
  const spyOpen = jest.spyOn(burger, 'openMenu');

  it('If menu opened, should close menu', () => {
    const elem = burger.getElem();
    elem.classList.add('burger-shown');
    elem.dispatchEvent(new Event('click'));
    expect(spyClose).toBeCalled();
  });

  it('If menu closed, should open menu', () => {
    const elem = burger.getElem();
    elem.classList.remove('burger-shown');
    elem.dispatchEvent(new Event('click'));
    expect(spyOpen).toBeCalled();
  });
});
