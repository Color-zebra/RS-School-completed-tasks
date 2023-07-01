import { StorageAPI } from '../shared/storage/StorageAPI';

describe('Test saving', () => {
  const storage = new StorageAPI() as any;
  const spy = jest.spyOn(storage, 'saveGameState');

  it('Should saving while page unloading', () => {
    window.dispatchEvent(new Event('beforeunload'));
    expect(spy).toBeCalled();
  });
});
