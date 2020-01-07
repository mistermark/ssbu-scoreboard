export interface RawPlayer {
  name: string;
  team?: string;
  _id?: string;
}

export interface Player extends RawPlayer {
  fullname?: string;
  [name: string]: string | number;
}

export interface SetPlayer extends Player {
  character?: string;
  score: number;
  player: number;
}
