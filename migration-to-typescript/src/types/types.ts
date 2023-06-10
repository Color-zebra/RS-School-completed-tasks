export type Endpoints = 'everything' | 'sources';
export type Methods = 'GET';
export type LoadCallback<T> = (data: T) => void;
export enum Langs {
    'ru',
    'de',
    'en',
}
