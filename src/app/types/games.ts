import { Player } from './player';

export interface GameSet {
  game: number;
  player1: GamePlayer;
  player2: GamePlayer;
  _id?: any;
  live: boolean;
}

export interface GamePlayer {
  player: Player;
  score: number;
}
