import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { PlayersService } from '../../../services/players/players.service';
import { RawPlayer, Player } from '../../../types';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  name = 'Player Name';
  team = 'Team';

  player: RawPlayer = {
    name: '',
    team: ''
  };

  constructor(private readonly playersService: PlayersService) {}

  ngOnInit() {}

  // save(player: RawPlayer) {
  //   console.log(player);

  //   if (!player.name) {
  //     return;
  //   }

  //   player.name = player.name.trim();
  //   player.team = player.team.trim();

  //   this.playersService.addPlayer(player);
  // }
}
