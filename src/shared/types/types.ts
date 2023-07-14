import { SortOrders, SortTypes } from './enums';

export type AppendArg = HTMLElement | string;
export type ClassArg = string | string[];
export type SortType = keyof typeof SortTypes;
export type SortOrder = keyof typeof SortOrders;
