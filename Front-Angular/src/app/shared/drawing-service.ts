import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Drawing, drawingRedirect } from './drawing.models';
import { SnackbarService } from './snackbar-service';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrlDrawings = 'http://localhost:8000/api/drawings';

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

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
          this.snackbarService.showSnackbar(
            'Drawing saved successfully!',
            drawingRedirect.redirect
          );
          return response && response.id_drawing !== undefined;
        }),
        catchError((error) => {
          console.error('Error:', error);
          this.snackbarService.showSnackbar('Drawing was not saved!', 'OK ❌');
          return of(false);
        })
      );
  }
}
