import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Player } from 'src/app/types';
import { PlayersService } from 'src/app/services/players/players.service';
import { PlayerNamePipe } from 'src/app/modules/player-fullname.pipe';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  @ViewChild('playerName', { static: true }) playerNameRef: ElementRef;
  @ViewChild('playerTeam', { static: true }) playerTeamRef: ElementRef;

  selectedPlayer: Player;
  players: Player[];

  players$ = this.playersService.players$;

  player: Player = {
    team: '',
    name: ''
  };

  constructor(private playersService: PlayersService) {}

  ngOnInit() {}

  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
  }

  add(playerForm: NgForm): void {
    const player = playerForm.form.value;
    if (!player.name) {
      return;
    }
    player.name = player.name.trim();

    if (player.team) {
      player.team = player.team.trim();
    }
    this.playersService.addPlayer(player);
    this._resetForm(playerForm);
  }

  delete(player: Player): void {
    this.playersService.deletePlayer(player);
  }

  private _resetForm(form: NgForm): void {
    form.resetForm();
    this.playerTeamRef.nativeElement.focus();
  }
}
