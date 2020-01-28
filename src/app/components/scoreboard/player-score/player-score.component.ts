import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

import { Character } from 'src/app/types';
import { CharactersService } from '../../../services/characters/characters.service';
import { PlayersService } from '../../../services/players/players.service';

const ASSETS_PATH = '/assets/images/characters/';

@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.scss']
})
export class PlayerScoreComponent implements OnInit {
  @Input() name: string;
  @Input() team?: string;
  @Input() score = 0;
  @Input() arrange: number;
  @Input() character: string;

  constructor(
    private readonly charactersService: CharactersService,
    private readonly playersService: PlayersService
  ) {}

  // private getCharacterImage(playerCharacter: string) {
  //   console.log(this.charactersService.getCharacter(playerCharacter));
  // }

  ngOnInit() {
    this.charactersService.getCharacters();
    // this.getCharacterImage(this.character);
  }
}
