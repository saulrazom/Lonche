import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Notification } from 'app/types/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatListModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  @Input() notifications: Notification[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { notifications: Notification[] },
  ) {
    this.notifications = data.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}
