import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RoutePath } from '../app.routes';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navigationItems: { routerLink: string; text: string; icon: string }[] = [
    { routerLink: RoutePath.list, text: 'List', icon: 'list' },
    {
      routerLink: RoutePath.draw,
      text: 'Draw new',
      icon: 'draw',
    },
  ];
}
