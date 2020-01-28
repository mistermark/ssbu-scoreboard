import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { GameSet, SetPlayer } from '../../types';

import { GamesetApiService } from '../gameset-api/gameset-api.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GameSetService {
  private gameSetSubject = new BehaviorSubject<GameSet | undefined>(undefined);
  gameSet$ = this.gameSetSubject.asObservable();

  private gameSetsListSubject = new BehaviorSubject<GameSet[] | undefined>(
    undefined
  );
  gameSetsList$ = this.gameSetsListSubject.asObservable();

  private gameSetLiveSubject = new BehaviorSubject<GameSet | undefined>(
    undefined
  );
  gameSetLive$ = this.gameSetLiveSubject.asObservable();

  constructor(
    protected gamesetApiService: GamesetApiService,
    private notificationService: NotificationService
  ) {
    this.getList();
  }

  selectGameSet(gameset): void {
    this.gameSetSubject.next(gameset);
  }

  create(setObject): void {
    let lastGameNumber = 0;
    if (this.gameSetsListSubject.value.length !== 0) {
      lastGameNumber = this.gameSetsListSubject.value[
        this.gameSetsListSubject.value.length - 1
      ].game;
    }
    setObject.game = lastGameNumber + 1;
    this.gamesetApiService.create(setObject).subscribe(data => {
      this.notificationService.notify(`New GameSet has been created.`, 'OK');
      this.getList();
    });
  }

  update(setObject: GameSet): void {
    this.gamesetApiService.update(setObject).subscribe(updatedSet => {
      this.gameSetSubject.next(updatedSet);
      if (updatedSet.live === true) {
        this.gameSetLiveSubject.next(updatedSet);
      }
      this.notificationService.notify(
        `GameSet #${updatedSet.game} has been updated.`,
        'OK'
      );
      const updatedSetList = this.gameSetsListSubject.value.map(setList => {
        if (setList._id === updatedSet._id) {
          setList = updatedSet;
        }
        return setList;
      });
      this.gameSetsListSubject.next(updatedSetList);
    });
  }

  delete(gameset: GameSet): void {
    this.gamesetApiService.delete(gameset._id).subscribe(data => {
      this.notificationService.notify(
        `Game #${gameset.game}"
        has been deleted.`,
        'OK'
      );
      this.getList();
    });
  }

  getList(): void {
    this.gamesetApiService
      .getGameSetsList()
      .pipe(
        map((gamesetsList: GameSet[]) =>
          gamesetsList.filter(gameSet => gameSet.player1 !== undefined)
        )
      )
      .subscribe(
        setsList => {
          this.gameSetsListSubject.next(setsList);
          setsList.filter(gameSet => {
            if (gameSet.live === true) {
              this.gameSetLiveSubject.next(gameSet);
            }
          });
        },
        err => {
          this.notificationService.notify(
            `Couldn't fetch list of games.`,
            'Dismiss'
          );
        }
      );
  }

  toggleLiveGame(gameset: GameSet): void {
    gameset.live = !gameset.live;

    this.gameSetSubject.next(gameset);

    if (
      this.gameSetLiveSubject.value &&
      this.gameSetLiveSubject.value._id !== gameset._id
    ) {
      this.gameSetLiveSubject.value.live = !this.gameSetLiveSubject.value.live;
      this.update(this.gameSetLiveSubject.value);
      this.gameSetLiveSubject.next(undefined);
    }

    if (this.gameSetLiveSubject.value) {
      this.gameSetLiveSubject.next(undefined);
    } else {
      this.gameSetLiveSubject.next(gameset);
    }

    this.update(gameset);
  }
}
