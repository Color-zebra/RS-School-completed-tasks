import { Game } from '../widgets/game/Game';

describe('Test level initializing', () => {
  const game = new Game(0);
  const table = game['table'];
  const viewer = game['htmlViewer'];
  const editor = game['cssEditor'];
  const spyTable = jest.spyOn(table, 'initLevel');
  const spyViewer = jest.spyOn(viewer, 'initLevel');
  const spyInput = jest.spyOn(editor, 'clearInput');

  game.initLevel(1);

  it('Should call table initLevel method', () => {
    expect(spyTable).toHaveBeenCalled();
  });

  it('Should call HTMLViewer initLevel method', () => {
    expect(spyViewer).toHaveBeenCalled();
  });

  it('Should clear input', () => {
    expect(spyInput).toHaveBeenCalled();
  });
});
