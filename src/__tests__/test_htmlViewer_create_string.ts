import { HTMLViewer } from '../features/HTMLViewer/HTMLViewer';

describe('HTMLViewer create strings', () => {
  const htmlViewer = new HTMLViewer();
  const testedFunc = htmlViewer['createGameStr'].bind(htmlViewer);
  it('Returned elem should have class "html-code"', () => {
    const str = testedFunc(
      {
        tag: 'bento',
        children: null,
      },
      0
    );

    expect(str.classList.contains('html-code')).toEqual(true);
  });

  it('Returned string should have right space before it', () => {
    const str = testedFunc(
      {
        tag: 'bento',
        children: null,
      },
      0
    );

    expect(str.innerHTML[0]).not.toEqual(' ');
  });

  it('Returned string should have right space before it', () => {
    const str = testedFunc(
      {
        tag: 'bento',
        children: null,
      },
      4
    );

    expect(str.innerHTML.slice(0, 4)).toEqual('    ');
  });
});
