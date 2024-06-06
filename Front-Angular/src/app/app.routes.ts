import { Routes } from '@angular/router';

export enum RoutePath {
  root = '',
  list = 'list',
  draw = 'draw',
}

export const routes: Routes = [
  { path: RoutePath.root, pathMatch: 'full', redirectTo: RoutePath.list },
  {
    path: RoutePath.list,
    loadComponent: () =>
      import('./drawing-list/drawing-list.component').then(
        (m) => m.DrawingListComponent
      ),
  },
  {
    path: RoutePath.draw,
    loadComponent: () =>
      import('./drawing/drawing.component').then((m) => m.DrawingComponent),
  },
  // [
  //
  //   { path: RoutePath.list, component: DrawingListComponent },
  //   //   { path: RoutePath.draw, component: DrawingComponent },
  // ],

  //   { path: RoutePath.list, component: DrawingListComponent },
  //   { path: RoutePath.draw, component: DrawingComponent },
];
