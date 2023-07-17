import { brandTransformer, modelTransformer } from '../data/carName';
import { SortOrders, SortTypes } from './enums';

export type AppendArg = HTMLElement | string | SVGElement;
export type ClassArg = string | string[];
export type SortType = keyof typeof SortTypes;
export type SortOrder = keyof typeof SortOrders;
export type Brands = keyof typeof brandTransformer;
export type Models = keyof typeof modelTransformer;
