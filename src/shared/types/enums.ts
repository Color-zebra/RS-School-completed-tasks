export enum SortOrders {
  RIGHT = 'ASC',
  REVERS = 'DESC',
}

export enum SortTypes {
  byId = 'id',
  byWins = 'wins',
  byTime = 'time',
}

export enum CustomEvents {
  delete = 'car-delete',
  updateStart = 'car-updating-start',
  updateEnd = 'car-updating-finish',
  create = 'car-create',
  finish = 'car-finished',
}
