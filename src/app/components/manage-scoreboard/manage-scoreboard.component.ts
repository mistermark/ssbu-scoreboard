import { Component, OnInit } from '@angular/core';

import { GameSetService } from '../../services/game-set/game-set.service';

@Component({
  selector: 'app-manage-scoreboard',
  templateUrl: './manage-scoreboard.component.html',
  styleUrls: ['./manage-scoreboard.component.scss']
})
export class ManageScoreboardComponent implements OnInit {
  constructor(private readonly gameSetService: GameSetService) {}

  ngOnInit() {}

  launchScoreboard() {
    window.open('/scoreboard', '_blank');
  }
}
