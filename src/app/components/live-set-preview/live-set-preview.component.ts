import { Component, OnInit, Input } from '@angular/core';

import { GameSetService } from 'src/app/services/game-set/game-set.service';
import { GameSet } from 'src/app/types';

@Component({
  selector: 'app-live-set-preview',
  templateUrl: './live-set-preview.component.html',
  styleUrls: ['./live-set-preview.component.scss']
})
export class LiveSetPreviewComponent {
  @Input() 'gameset': GameSet;

  constructor(private readonly gameSetService: GameSetService) {}

  goOffline(gameset: GameSet) {
    this.gameSetService.toggleLiveGame(gameset);
  }
}
