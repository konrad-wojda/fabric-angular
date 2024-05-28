import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drawing } from './drawing.models';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = 'https://localhost:8000';

  constructor(private http: HttpClient) {}

  getDrawings(): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(`${this.apiUrl}/get`);
  }
}
