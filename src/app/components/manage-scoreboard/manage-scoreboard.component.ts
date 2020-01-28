import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, skip } from 'rxjs/operators';

import { PlayersService } from 'src/app/services/players/players.service';
import { GameSetService } from 'src/app/services/game-set/game-set.service';
import { CharactersService } from 'src/app/services/characters/characters.service';
import { GameSet } from 'src/app/types';

@Component({
  selector: 'app-manage-scoreboard',
  templateUrl: './manage-scoreboard.component.html',
  styleUrls: ['./manage-scoreboard.component.scss']
})
export class ManageScoreboardComponent implements OnInit {
  players$ = this.playersService.players$;
  currentGameset$ = this.gameSetService.gameSet$;
  gameSetsList$ = this.gameSetService.gameSetsList$;
  liveGameSet$ = this.gameSetService.gameSetLive$;

  characters$ = this.charactersService.charactersList$;

  selectGamesetForm: FormGroup;
  manageGamesetForm: FormGroup;
  newSetForm: FormGroup;

  enableNewGameForm = false;

  goneLive$ = this.gameSetService.gameSet$.pipe(
    skip(1),
    map((gameSet: GameSet) => gameSet.live)
  );

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameSetService: GameSetService,
    private formBuilder: FormBuilder,
    private charactersService: CharactersService
  ) {
    this.selectGamesetForm = this.formBuilder.group({
      gameset: new FormControl('')
    });
    this.newSetForm = this.formBuilder.group({
      game: new FormControl(''),
      live: new FormControl(false),
      player1: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(0),
        character: new FormControl({})
      }),
      player2: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(0),
        character: new FormControl({})
      })
    });
    this.manageGamesetForm = this.formBuilder.group({
      game: new FormControl(''),
      _id: new FormControl(''),
      live: new FormControl(''),
      player1: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(''),
        character: new FormControl({})
      }),
      player2: new FormGroup({
        player: new FormControl({}),
        score: new FormControl(''),
        character: new FormControl({})
      })
    });
  }

  ngOnInit(): void {
    this.gameSetService.gameSet$.subscribe((setObject: GameSet) => {
      if (!setObject) {
        return;
      }
      this.manageGamesetForm.patchValue(setObject);
    });
  }

  launchScoreboard() {
    window.open('/scoreboard', '_blank');
  }

  createNewSet(): void {
    this.gameSetService.create(this.newSetForm.value);
  }

  refreshGamesetList() {
    this.gameSetService.getList();
  }

  modifySet(set: GameSet) {
    this.gameSetService.selectGameSet(set);
  }

  update(): void {
    this.gameSetService.update(this.manageGamesetForm.value);
  }

  updateScore(playerNr: number, method: string): void {
    if (!this.manageGamesetForm.value['player' + playerNr]) {
      return;
    }

    if (method === 'add') {
      this.manageGamesetForm.patchValue({
        ['player' + playerNr]: {
          score: this.manageGamesetForm.value['player' + playerNr].score + 1
        }
      });
    }
    if (method === 'subtract') {
      this.manageGamesetForm.patchValue({
        ['player' + playerNr]: {
          score: this.manageGamesetForm.value['player' + playerNr].score - 1
        }
      });
    }
    this.gameSetService.update(this.manageGamesetForm.value);
  }

  deleteGameset(set: GameSet) {
    this.gameSetService.delete(set);
  }

  setLiveGameset(gameset: GameSet) {
    this.gameSetService.toggleLiveGame(gameset);
  }

  compareValFn(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1._id === obj2._id;
  }
}
