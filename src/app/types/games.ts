import { Player } from './player';

export interface GameSet {
  game: number;
  player1: Player;
  player2: Player;
  _id?: any;
  live: boolean;
}
