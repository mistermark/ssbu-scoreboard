import { Component, OnInit, Input } from '@angular/core';

import { GameScoreService } from '../../../services/game-score/game-score.service';

@Component({
  selector: 'app-scoreboard-score',
  templateUrl: './scoreboard-score.component.html',
  styleUrls: ['./scoreboard-score.component.scss']
})
export class ScoreboardScoreComponent implements OnInit {
  @Input() playerNumber: number;

  // gameSet$ = this.gameScoreService.gameSet$;

  constructor(private readonly gameScoreService: GameScoreService) {}

  ngOnInit() {
    // this.gameScoreService.init(this.playerNumber);
  }

  updateScore(calc) {
    // this.gameScoreService.update(calc, this.playerNumber);
  }
}
