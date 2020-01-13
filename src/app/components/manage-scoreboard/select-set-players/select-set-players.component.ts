import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { PlayersService } from '../../../services/players/players.service';
import { GameSetService } from '../../../services/game-set/game-set.service';

@Component({
  selector: 'app-select-set-players',
  templateUrl: './select-set-players.component.html',
  styleUrls: ['./select-set-players.component.scss']
})
export class SelectSetPlayersComponent implements OnInit {
  players$ = this.playersService.players$;

  gameset$ = this.gameSetService.gameSet$;

  gameSetForm: FormGroup;

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameSetService: GameSetService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.gameSetForm = this.formBuilder.group({
      game: new FormControl(''),
      _id: new FormControl(''),
      player1: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(0)
      }),
      player2: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(0)
      })
    });

    this.gameSetService.gameSet$.subscribe((data: any) => {
      if (!data) {
        return;
      }
      if (data.gameset) {
        this.gameSetForm.patchValue(data.gameset);
      } else {
        this.gameSetForm.patchValue({
          game: data.game,
          _id: data._id,
          player1: data.player1,
          player2: data.player2
        });
      }
    });

    this.onChanges();
  }

  compareValFn(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1._id === obj2._id;
  }

  onChanges(): void {}

  update(): void {
    this.gameSetService.update(this.gameSetForm.value);
  }
}
