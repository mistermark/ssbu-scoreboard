import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Player } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersApiService {
  private playersUrl = `${environment.apiUrl}/api/players`; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      return of(result as T);
    };
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.playersUrl}`);
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
      .post<Player>(`${this.playersUrl}/create`, player, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete the player from the db */
  deletePlayer(id: string): Observable<Player> {
    return this.http
      .delete<Player>(`${this.playersUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
