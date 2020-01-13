import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { Player, SetPlayer, GameSet } from '../../types';

import { StorageService } from '../storage/storage.service';
import { GamesetApiService } from '../gameset-api/gameset-api.service';
import { NotificationService } from '../notification/notification.service';
import { PlayerNamePipe } from 'src/app/modules/player-fullname.pipe';

const STORAGE_NAME = 'ssbu-game-set';

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

  // getInterval = 1000;
  // setInterval: any;

  constructor(
    protected gamesetApiService: GamesetApiService,
    private notificationService: NotificationService,
    private playerNamePipe: PlayerNamePipe
  ) {
    this.getGameSetsList();
  }

  selectGameSet(gameset): void {
    this.gameSetSubject.next(gameset);
  }

  create(gamesetObject): void {
    const lastGameNumber = this.gameSetsListSubject.value[
      this.gameSetsListSubject.value.length - 1
    ].game;
    gamesetObject.game = lastGameNumber + 1;
    this.gamesetApiService.create(gamesetObject).subscribe(data => {
      this.gameSetSubject.next(data);
      this.notificationService.notify(`New GameSet has been created.`, 'OK');
    });
  }

  update(setObject: GameSet): void {
    this.gamesetApiService.update(setObject).subscribe(data => {
      this.notificationService.notify(
        `GameSet #${data.game} has been updated.`,
        'OK'
      );
    });
  }

  delete(gameset: GameSet): void {
    this.gamesetApiService.delete(gameset._id).subscribe(data => {
      this.notificationService.notify(
        `Game #${gameset.game}"
        has been deleted.`,
        'OK'
      );
      this.getGameSetsList();
    });
  }

  getGameSetsList(): void {
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
        },
        err => {
          this.notificationService.notify(
            `Couldn't fetch game-sets.`,
            'Dismiss'
          );
        }
      );
  }
}
