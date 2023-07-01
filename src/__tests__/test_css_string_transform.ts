/* eslint-disable @typescript-eslint/no-var-requires */
import { CSSEditor } from '../features/CSSEditor/CSSEditor';
// const CSSEditor = require('../features/CSSEditor/CSSEditor');

const cssEditor = new CSSEditor(() => console.log('ЪУЪ'));

describe('CSS transform', () => {
  it('Should transform string to HTML text', () => {
    expect(cssEditor.transformInput('.some-class')).toEqual('<span class="code-class">.some-class</span>');
  });
});
