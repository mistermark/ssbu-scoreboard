export interface Player {
  name: string;
  team?: string;
  _id?: string;
}

export interface SetPlayer extends Player {
  character?: string;
  score: number;
}
