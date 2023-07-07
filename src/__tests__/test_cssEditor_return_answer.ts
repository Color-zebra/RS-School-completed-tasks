import { CssEditor } from '../features/CssEditor/CssEditor';

const cssEditor = new CssEditor(() => jest.fn());

describe('CSS Editor answer', () => {
  it('Should return answer', () => {
    if (cssEditor.input) {
      cssEditor.input.value = 'test string';
    }
    expect(cssEditor.getAnswer()).toEqual('test string');
  });
  it('Should return answer', () => {
    if (cssEditor.input) {
      cssEditor.input.value = 'another test string';
    }
    expect(cssEditor.getAnswer()).toEqual('another test string');
  });
  it('Should return answer', () => {
    if (cssEditor.input) {
      cssEditor.input.value = 'some string';
    }
    expect(cssEditor.getAnswer()).toEqual('some string');
  });
});
