import { CSSEditor } from '../features/CSSEditor/CSSEditor';

const cssEditor = new CSSEditor(() => console.log('test callback'));

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
