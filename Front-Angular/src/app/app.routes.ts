import { Routes } from '@angular/router';
import { DrawingListComponent } from './drawing-list/drawing-list.component';
import { DrawingComponent } from './drawing/drawing.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: DrawingListComponent },
  { path: 'draw', component: DrawingComponent },
];
