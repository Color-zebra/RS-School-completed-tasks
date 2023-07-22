import { brandTransformer, modelTransformer } from '../data/carName';

export default function transformName(name: string) {
  let [first, second] = [...name.split(' ')];
  if (first && first in brandTransformer) {
    first = brandTransformer[first as keyof typeof brandTransformer];
  }
  if (second && second in modelTransformer) {
    second = modelTransformer[second as keyof typeof modelTransformer];
  }

  first = first === undefined ? '' : first;
  second = second === undefined ? '' : second;

  return `${first} ${second}`;
}
