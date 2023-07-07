import { CssEditor } from '../features/CssEditor/CssEditor';

const cssEditor = new CssEditor(() => jest.fn());

describe('CSS transform', () => {
  it('Should transform class string to HTML text', () => {
    expect(cssEditor.transformInput('.some-class')).toEqual('<span class="code-class">.some-class</span>');
  });
  it('Should transform id string to HTML text', () => {
    expect(cssEditor.transformInput('#some-id')).toEqual('<span class="code-id">#some-id</span>');
  });
  it('Should transform css operator string to HTML text', () => {
    expect(cssEditor.transformInput('+')).toEqual('<span class="code-operator">+</span>');
  });
  it('Should work together', () => {
    expect(cssEditor.transformInput('#id + .class ~ div')).toEqual(
      '<span class="code-id">#id</span> <span class="code-operator">+</span> <span class="code-class">.class</span> <span class="code-operator">~</span> div'
    );
  });
});
