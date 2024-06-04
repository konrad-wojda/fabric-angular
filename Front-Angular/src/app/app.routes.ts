import { Routes } from '@angular/router';
import { DrawingListComponent } from './drawing-list/drawing-list.component';
import { DrawingComponent } from './drawing/drawing.component';

export enum RoutePath {
  root = '',
  list = 'list',
  draw = 'draw',
}

export const routes: Routes = [
  {
    path: RoutePath.root,
    children: [
      { path: RoutePath.root, redirectTo: RoutePath.list, pathMatch: 'full' },
      { path: RoutePath.list, component: DrawingListComponent },
      { path: RoutePath.draw, component: DrawingComponent },
    ],
  },
];
