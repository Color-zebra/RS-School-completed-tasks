import { CssEditor } from '../features/CssEditor/CssEditor';

const cssEditor = new CssEditor(() => jest.fn());

describe('CSS clear input', () => {
  if (cssEditor.input) {
    cssEditor.input.value = 'test string';
  }
  it('Should clear input, after calling clearInput()', () => {
    cssEditor.clearInput();
    expect(cssEditor.getAnswer()).toBeFalsy();
  });
  it('Should clear input, after calling clearInput()', () => {
    cssEditor.clearInput();
    expect(cssEditor.getAnswer()).toEqual('');
  });
});
