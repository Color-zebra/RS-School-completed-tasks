import { StorageAPI } from '../shared/storage/StorageAPI';

describe('Test saving', () => {
  const storage = new StorageAPI();
  storage['saveGameState'] = jest.fn();
  window.dispatchEvent(new Event('beforeunload'));

  it('Should saving while page unloading', () => {
    expect(storage['saveGameState']).toBeCalled();
  });
});
