export interface CarInfo {
  name: string;
  color: string;
}

export interface Car extends CarInfo {
  id: number;
}

export interface SpeedParams {
  velocity: number;
  distance: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
