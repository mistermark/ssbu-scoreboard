import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Stage } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagesApiService {
  private stagesUrl = `${environment.apiUrl}/api/stages`; // URL to web api
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

  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.stagesUrl}`);
  }

  getStage(id: number): Observable<Stage> {
    const url = `${this.stagesUrl}/${id}`;
    return this.http
      .get<Stage>(url)
      .pipe(catchError(this.handleError<Stage>(`getStage id=${id}`)));
  }

  updateStage(stage: Stage): Observable<any> {
    return this.http
      .put<Stage>(
        `${this.stagesUrl}/update/${stage._id}`,
        stage,
        this.httpOptions
      )
      .pipe(
        map(() => stage),
        catchError(this.handleError)
      );
  }

  /** POST: add a new stage to the db */
  addStage(stage: Stage): Observable<Stage> {
    return this.http
      .post<Stage>(`${this.stagesUrl}/create`, stage, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addBulkStage(stageArray: Stage[]): Observable<Stage[]> {
    return this.http
      .post<any>(`${this.stagesUrl}/create/bulk`, stageArray, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete the stage from the db */
  deleteStage(id: string): Observable<Stage> {
    return this.http
      .delete<Stage>(`${this.stagesUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
