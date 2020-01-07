import { Component, OnInit, Input } from '@angular/core';
import { tap, map, take, filter } from 'rxjs/operators';

import { PlayersService } from '../../../services/players/players.service';
import { GameSetService } from '../../../services/game-set/game-set.service';
import { Player, SetPlayer } from '../../../types';

@Component({
  selector: 'app-select-set-players',
  templateUrl: './select-set-players.component.html',
  styleUrls: ['./select-set-players.component.scss']
})
export class SelectSetPlayersComponent implements OnInit {
  // @Input() playerNumber: number;

  // setPlayers: SetPlayer[] = [];

  players$ = this.playersService.players$;

  // currentSetPlayers = this.gameSetService.gameSet$;

  // selectedPlayer: any;

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameSetService: GameSetService
  ) {}

  ngOnInit() {
    // this.playersService.getPlayers();
    // this.gameSetService.get();
    // this.gameSetService.gameSet$
    //   .pipe(
    //     take(1),
    //     map((currentSet: SetPlayer[]) =>
    //       currentSet.filter(
    //         (currentPlayer: SetPlayer) =>
    //           currentPlayer.player === this.playerNumber
    //       )
    //     ),
    //     map((currentSetPlayer: SetPlayer[]) => currentSetPlayer[0]._id)
    //   )
    //   .subscribe(playerId => (this.selectedPlayer = playerId));
  }

  updateSetPlayers(event) {
    console.log(event);
    // const playerObject = this.playersService.getPlayer(event.value);
    // this.gameSetService.update(playerObject, this.playerNumber);
  }
}
