import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  snackBarConfig = {
    duration: 5000
  };

  constructor(private snackBar: MatSnackBar) {}

  notify(message: string, action: string) {
    this.snackBar.open(message, action, this.snackBarConfig);
  }
}
