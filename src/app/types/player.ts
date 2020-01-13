export interface Player {
  name: string;
  team?: string;
  _id?: string;
}

export interface SetPlayer extends Player {
  character?: string;
  score: number;
}

export interface GameSet {
  _id: any;
  game: number;
  gameId: string;
  player1: Player;
  player2: Player;
}
