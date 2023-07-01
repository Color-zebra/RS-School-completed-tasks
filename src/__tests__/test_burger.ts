import { Burger } from '../features/burger/Burger';

describe('Test burger', () => {
  const burger = new Burger(
    () => {
      console.log('ЪУЪ');
    },
    () => {
      console.log('ЪУЪ');
    }
  ) as any;

  const spyClose = jest.spyOn(burger, 'closeMenu');
  const spyOpen = jest.spyOn(burger, 'openMenu');

  it('If menu opened, should close menu', () => {
    burger.elem.classList.add('burger-shown');
    burger.elem.dispatchEvent(new Event('click'));
    expect(spyClose).toBeCalled();
  });

  it('If menu closed, should open menu', () => {
    burger.elem.classList.remove('burger-shown');
    burger.elem.dispatchEvent(new Event('click'));
    expect(spyOpen).toBeCalled();
  });
});
