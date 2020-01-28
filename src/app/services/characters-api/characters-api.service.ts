import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Character } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  private charactersUrl = 'http://localhost:4000/api/characters'; // URL to web api
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

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.charactersUrl}`);
  }

  getCharacter(id: number): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http
      .get<Character>(url)
      .pipe(catchError(this.handleError<Character>(`getHero id=${id}`)));
  }

  updateCharacter(character: Character): Observable<any> {
    return this.http
      .put<Character>(
        `${this.charactersUrl}/update/${character._id}`,
        character,
        this.httpOptions
      )
      .pipe(
        map(() => character),
        catchError(this.handleError)
      );
  }

  /** POST: add a new character to the db */
  addCharacter(character: Character): Observable<Character> {
    return this.http
      .post<Character>(
        `${this.charactersUrl}/create`,
        character,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addBulkCharacter(characterArray: Character[]): Observable<Character[]> {
    return this.http
      .post<any>(
        `${this.charactersUrl}/create/bulk`,
        characterArray,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete the character from the db */
  deleteCharacter(id: string): Observable<Character> {
    return this.http
      .delete<Character>(`${this.charactersUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
