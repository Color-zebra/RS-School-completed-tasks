import { HTMLViewer } from '../features/HTMLViewer/HTMLViewer';

describe('HTMLViewer initialization', () => {
  const spy = jest.spyOn(HTMLViewer.prototype as any, 'init'); //any используется что бы "открыть" для jest приватный метод init();
  const htmlViewer = new HTMLViewer();
  it('Should call init() method while creating instance', () => {
    expect(spy).toHaveBeenCalled();
  });
  it('Should calling only once', () => {
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
