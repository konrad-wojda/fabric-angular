import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Drawing } from './drawing.models';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrlDrawings = 'http://localhost:8000/api/drawings';

  constructor(private http: HttpClient) {}

  getDrawings(offset = 0, limit = 25): Observable<Drawing[]> {
    return this.http
      .get<Drawing[]>(`${this.apiUrlDrawings}/get`, {
        params: { offset: offset, limit: limit },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching drawings:', error);
          return [];
        })
      );
  }

  postDrawing(payload: {}[]): Observable<boolean> {
    return this.http
      .post<Drawing>(`${this.apiUrlDrawings}/create`, { drawing: payload })
      .pipe(
        map((response) => {
          // Check if the response contains the expected data
          return response && response.id_drawing !== undefined;
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of(false); // Return false for error cases
        })
      );
  }
}
