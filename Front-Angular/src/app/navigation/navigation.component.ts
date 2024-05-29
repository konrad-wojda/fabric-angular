import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navigationItems: { routerLink: string; text: string }[] = [
    { routerLink: '/list', text: 'List' },
    { routerLink: '/draw', text: 'Draw new one' },
  ];
}
