import { StorageAPI } from '../shared/storage/StorageAPI';

describe('Test is StorageAPI singleton', () => {
  const storage = new StorageAPI();
  const storage2 = new StorageAPI();
  const storage3 = new StorageAPI();

  it('All StorageAPI instances is the same object', () => {
    expect(storage === storage2 && storage === storage3).toEqual(true);
  });
});
