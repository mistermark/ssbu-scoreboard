import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GameSet } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class GamesetApiService {
  private gamesetUrl = 'http://localhost:4000/api/sets'; // URL to web api
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

  getGameSetsList(): Observable<GameSet[]> {
    return this.http.get<GameSet[]>(`${this.gamesetUrl}`);
  }

  update(setObject: GameSet): Observable<any> {
    return this.http
      .put<GameSet>(
        `${this.gamesetUrl}/update/${setObject._id}`,
        {
          game: setObject.game,
          live: setObject.live,
          player1: setObject.player1,
          player2: setObject.player2
        },
        this.httpOptions
      )
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  create(gamesetObject): any {
    return this.http
      .post(`${this.gamesetUrl}/create`, gamesetObject, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  delete(id: string): any {
    return this.http
      .delete<GameSet>(`${this.gamesetUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  setLive(set: GameSet): any {
    return set;
  }
}
