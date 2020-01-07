import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player, SetPlayer } from '../../types';

import { StorageService } from '../storage/storage.service';

const STORAGE_NAME = 'ssbu-game-set';

@Injectable({
  providedIn: 'root'
})
export class GameSetService {
  private readonly gamePlayersSubject = new BehaviorSubject<Player[]>([]);
  gamePlayers$ = this.gamePlayersSubject.asObservable();

  private gameSetSubject = new BehaviorSubject<SetPlayer[]>([]);
  gameSet$ = this.gameSetSubject.asObservable();

  getInterval = 1000;
  setInterval: any;

  constructor(protected storageService: StorageService) {}

  private _makeGamePlayer(player: Player, order: number): SetPlayer {
    const addedMeta = { player: order, score: 0, character: 'none' };
    const extended = { ...addedMeta, ...player };

    return extended;
  }

  private _saveToStore(gameSetData: SetPlayer[]) {
    this.gameSetSubject.next(gameSetData);
    this.storageService.set(STORAGE_NAME, gameSetData);
  }

  save() {
    const gameSetPlayers: SetPlayer[] = this.gameSetSubject.value;
    this.storageService.set(STORAGE_NAME, gameSetPlayers);
  }

  get(poll?: boolean) {
    this.gameSetSubject.next(this.storageService.get(STORAGE_NAME));

    if (poll) {
      this.setInterval = setInterval(() => {
        this.gameSetSubject.next(this.storageService.get(STORAGE_NAME));
      }, this.getInterval);
    }
  }

  update(player: Player, order: number) {
    let currentPlayers = [];
    const extendedPlayer = this._makeGamePlayer(player, order);

    if (this.gameSetSubject.value.indexOf(extendedPlayer) === -1) {
      currentPlayers = this.gamePlayersSubject.value;
      currentPlayers[order - 1] = extendedPlayer;
    }
    // this.gameSetSubject.next(currentPlayers);
    this._saveToStore(currentPlayers);
  }

  updateScore(score: SetPlayer) {
    const currentGameSet = this.gameSetSubject.value;
    currentGameSet[score.player - 1].score = score.score;

    this._saveToStore(currentGameSet);
  }

  reset() {
    this.storageService.remove(STORAGE_NAME);
    this.gamePlayersSubject.next([]);
    this.gameSetSubject.next([]);
  }
}
