import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private progress = new BehaviorSubject<number>(0);
  progress$ = this.progress.asObservable();
  private intervalSubscription: Subscription | null = null;

  constructor(private snackBar: MatSnackBar) {}

  startProgress() {
    this.progress.next(0);
    this.intervalSubscription = interval(50).pipe(
      takeWhile(val => val <= 100)
    ).subscribe(val => {
      this.progress.next(val);
      if (val === 100) {
        this.stopProgress();
        this.snackBar.open('Migration process completed.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  stopProgress() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }
}
