import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Player, RawPlayer } from 'src/app/types';
import { PlayersService } from 'src/app/services/players/players.service';
import { PlayerNamePipe } from 'src/app/modules/player-fullname.pipe';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  selectedPlayer: Player;
  players: Player[];

  players$ = this.playersService.players$;

  player: RawPlayer = {
    team: '',
    name: ''
  };

  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    // this.getPlayers();
  }

  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
  }

  // getPlayers(): void {
  //   this.playersService
  //     .getPlayers()
  //     .subscribe(players => (this.players = players));
  // }

  add(playerForm: any): void {
    const player = playerForm.form.value;
    if (!player.name) {
      return;
    }
    player.name = player.name.trim();

    if (player.team) {
      player.team = player.team.trim();
    }
    this.playersService.addPlayer(player);
  }

  delete(player: Player): void {
    this.playersService.deletePlayer(player);
  }
}
