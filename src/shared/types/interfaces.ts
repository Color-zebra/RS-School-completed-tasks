import { tags } from './types';

export interface GameTag {
  tag: tags;
  id?: string;
  className?: string[];
  children: null | Array<GameTag>;
}
