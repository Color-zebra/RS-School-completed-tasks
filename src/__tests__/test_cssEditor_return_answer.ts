import { CSSEditor } from '../features/CSSEditor/CSSEditor';

const cssEditor = new CSSEditor(() => console.log('ЪУЪ'));

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
