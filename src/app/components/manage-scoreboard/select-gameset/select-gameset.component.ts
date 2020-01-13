import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

import { GameSetService } from '../../../services/game-set/game-set.service';
import { GameSet, SetPlayer } from 'src/app/types';

@Component({
  selector: 'app-select-gameset',
  templateUrl: './select-gameset.component.html',
  styleUrls: ['./select-gameset.component.scss']
})
export class SelectGamesetComponent implements OnInit {
  constructor(
    private readonly gameSetService: GameSetService,
    private formBuilder: FormBuilder
  ) {}

  gameSetsList$ = this.gameSetService.gameSetsList$;

  selectGamesetForm: FormGroup;

  ngOnInit() {
    this.selectGamesetForm = this.formBuilder.group({
      gameset: new FormControl('')
    });
    this.onChange();
  }

  newGameset(): void {
    const playerObject: SetPlayer = {
      name: '',
      score: 0,
      team: ''
    };
    const gamesetEmpty = {
      game: 1,
      player1: playerObject,
      player2: playerObject
    };
    this.gameSetService.create(gamesetEmpty);
  }

  refreshGamesetList() {
    this.gameSetService.getGameSetsList();
  }

  onChange() {
    this.selectGamesetForm.valueChanges.subscribe(val => {
      this.gameSetService.selectGameSet(val);
    });
  }

  deleteGameset() {
    const gameset: GameSet = this.selectGamesetForm.value.gameset;
    this.gameSetService.delete(gameset);
  }
}
