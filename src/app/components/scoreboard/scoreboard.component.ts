import { Component, OnInit } from '@angular/core';

import { GameSetService } from '../../services/game-set/game-set.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  // gameSet$ = this.gameSetService.gameSet$;

  constructor(private readonly gameSetService: GameSetService) {}

  ngOnInit() {
    // this.gameSetService.get(true);
  }
}
