import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private userActivitySubscription!: Subscription;
  private timeoutSubscription!: Subscription;
  private readonly inactivityTime = 6000000;

  constructor(private ngZone: NgZone, private router: Router) { }

  public startWatching(): void {
    this.ngZone.runOutsideAngular(() => {
      const activityEvents$: Observable<Event> = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'touchstart')
      );

      this.userActivitySubscription = activityEvents$.subscribe(() => {
        this.resetTimer();
      });
    });

    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
    }
    this.timeoutSubscription = timer(this.inactivityTime).subscribe(() => {
      this.ngZone.run(() => {
        localStorage.clear();
        alert('Session expired due to inactivity. Please Log In again!');
        this.router.navigate(['home']);
      });
    });
  }

  public stopWatching(): void {
    if (this.userActivitySubscription) {
      this.userActivitySubscription.unsubscribe();
    }
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
    }
  }
}
