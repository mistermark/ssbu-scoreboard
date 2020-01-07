import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Player } from 'src/app/types';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersApiService {
  constructor(private readonly http: HttpClient) {}

  private playersUrl = 'http://localhost:4000/api'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.playersUrl}/players`);
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http
      .get<Player>(url)
      .pipe(catchError(this.handleError<Player>(`getHero id=${id}`)));
  }

  updatePlayer(player: Player): Observable<any> {
    return this.http
      .put<Player>(
        `${this.playersUrl}/update/${player._id}`,
        player,
        this.httpOptions
      )
      .pipe(
        map(() => player),
        catchError(this.handleError)
      );
  }

  /** POST: add a new player to the db */
  addPlayer(player: Player): Observable<Player> {
    return this.http
      .post<Player>(`${this.playersUrl}/add`, player, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete the player from the db */
  deletePlayer(id: string): Observable<Player> {
    return this.http
      .delete<Player>(`${this.playersUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
