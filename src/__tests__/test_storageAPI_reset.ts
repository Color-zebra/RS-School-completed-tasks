import { StorageAPI } from '../shared/storage/StorageAPI';

describe('Test reseting StorageAPI', () => {
  const storage = new StorageAPI();
  it('While reseting, storage return all levels incompleted game state', () => {
    const resetState = storage.reset();
    const predicate = (value: string) => value === 'incompleted';
    expect(resetState.every(predicate)).toEqual(true);
  });
});
