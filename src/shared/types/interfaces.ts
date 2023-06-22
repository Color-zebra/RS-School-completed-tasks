import { tags } from './types';

export interface GameTag {
  tag: tags;
  children: null | Array<GameTag>;
}
