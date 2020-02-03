import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GameSet } from 'src/app/types';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivegameApiService {
  private gamesetUrl = `${environment.apiUrl}/api/live`; // URL to web api
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

  get(): Observable<GameSet> {
    return this.http.get<GameSet>(`${this.gamesetUrl}`);
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
}
