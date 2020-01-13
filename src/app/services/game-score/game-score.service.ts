import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { GameSetService } from '../game-set/game-set.service';
import { SetPlayer } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {
  private readonly playerScoreSubject = new BehaviorSubject<
    SetPlayer | undefined
  >(undefined);
  playerScore$ = this.playerScoreSubject.asObservable();

  // gameSet$ = this.gameSetService.gameSet$;

  constructor(private readonly gameSetService: GameSetService) {}

  // update(calc: string, playerNr: number) {
  //   let score = this.playerScoreSubject.value.score;
  //   if (calc === 'INC') {
  //     score++;
  //   }
  //   if (calc === 'DEC') {
  //     score--;
  //   }

  //   this.playerScoreSubject.next({
  //     ...this.playerScoreSubject.value,
  //     score,
  //     player: playerNr
  //   });

  //   this.gameSetService.updateScore(this.playerScoreSubject.value);
  // }

  // init(playerNumber: number) {
  //   this.gameSetService.gameSet$
  //     .pipe(
  //       take(1),
  //       map((currentSet: SetPlayer[]) =>
  //         currentSet.filter(
  //           (currentPlayer: SetPlayer) => currentPlayer.player === playerNumber
  //         )
  //       ),
  //       map((currentSetPlayer: SetPlayer[]) => currentSetPlayer[0])
  //     )
  //     .subscribe(player => {
  //       const defaultScore = Object.assign(
  //         this.playerScoreSubject.value,
  //         player
  //       );
  //       console.log(defaultScore.score);
  //       // this.playerScoreSubject.value.score = player.score;
  //     });
  // }
}
