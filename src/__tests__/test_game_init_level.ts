import { Game } from '../widgets/game/Game';

describe('Test level initializing', () => {
  const game = new Game(0) as any;
  const spyTable = jest.spyOn(game.table, 'initLevel');
  const spyViewer = jest.spyOn(game.htmlViewer, 'initLevel');
  const spyInput = jest.spyOn(game.cssEditor, 'clearInput');

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
