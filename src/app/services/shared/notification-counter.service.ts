import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationCounterService {
  private notificationSource = new BehaviorSubject<number>(0);
  currentNotification = this.notificationSource.asObservable();

  constructor() {}

  changeNotification(notification: number) {
    this.notificationSource.next(notification);
  }
}
