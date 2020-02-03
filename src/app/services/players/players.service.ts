import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Player } from '../../types';
import { PlayersApiService } from '../players-api/players-api.service';
import { StorageService } from '../storage/storage.service';
import { NotificationService } from '../notification/notification.service';
import { PlayerNamePipe } from 'src/app/modules/player-fullname.pipe';
import { UtilsService } from '../../modules/utils';
import { environment } from 'src/environments/environment';

const STORAGE_NAME = 'ssbu-players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(
    protected storageService: StorageService,
    private readonly utils: UtilsService,
    private readonly http: HttpClient,
    private playersApiService: PlayersApiService,
    private notificationService: NotificationService,
    private playerNamePipe: PlayerNamePipe
  ) {
    this.getPlayers();
  }

  private playersUrl = `${environment.apiUrl}/api/players`; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private readonly playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  getPlayers(): void {
    this.playersApiService.getPlayers().subscribe(
      players => {
        this.playersSubject.next(players);
      },
      err => {
        this.notificationService.notify(`Couldn't fetch players.`, 'Dismiss');
      }
    );
  }

  updatePlayer(player: Player): void {
    this.playersApiService.updatePlayer(player).subscribe(data => {
      this.getPlayers();
      this.notificationService.notify(
        `"${this.playerNamePipe.transform(
          player.name,
          player.team
        )}" has been updated.`,
        'OK'
      );
    });
  }

  /** POST: add a new player to the db */
  addPlayer(player: Player): void {
    this.playersApiService.addPlayer(player).subscribe(data => {
      this.playersSubject.next([...this.playersSubject.value, data]);
      this.notificationService.notify(
        `"${this.playerNamePipe.transform(
          player.name,
          player.team
        )}" has been added.`,
        'OK'
      );
    });
  }

  /** DELETE: delete the player from the db */
  deletePlayer(player: Player): void {
    this.playersApiService.deletePlayer(player._id).subscribe(data => {
      this.notificationService.notify(
        `"${this.playerNamePipe.transform(
          player.name,
          player.team
        )}" has been deleted.`,
        'OK'
      );
      this.getPlayers();
    });
  }
}
