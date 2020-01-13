import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  save(playerDetailsForm: NgForm): void {
    const player = playerDetailsForm.form.value;

    this.playersService.updatePlayer(player);
  }

  close(): void {
    this.player = undefined;
  }
}
