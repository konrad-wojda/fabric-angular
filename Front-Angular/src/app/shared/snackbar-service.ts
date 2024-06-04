import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { drawingRedirect } from './drawing.models';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  showSnackbar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 5000,
    });

    if (action === drawingRedirect.redirect) {
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('/list');
      });
    }
  }
}
