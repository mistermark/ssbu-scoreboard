import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../../../types';
import { PlayersService } from '../../../services/players/players.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  @Input() player: Player;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) {}

  ngOnInit() {}

  // getPlayer(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.playersService
  //     .getPlayer(id)
  //     .subscribe(player => (this.player = player));
  // }

  save(player: Player): void {
    console.log(player);
    this.playersService.updatePlayer(player);
  }

  close(): void {
    this.player = undefined;
  }
}
