import { Component, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidBell } from '@ng-icons/font-awesome/solid';
import { MaterialModule } from '@modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'app/services/shared/http-service.service';
import { SocketService } from 'app/services/shared/socket.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { Notification } from 'app/types/notification';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, MaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  viewProviders: [provideIcons({ faSolidBell })],
})
export class HeaderComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  notifications: Notification[] = [];
  unreadCount = 0;
  private userID = localStorage.getItem('userID');

  constructor(
    private httpService: HttpService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.fetchNotifications();
    this.listenToSocketNotifications();
    this.socketService.joinRoom(this.userID!);
  }

  fetchNotifications(): void {
    this.httpService
      .get<Notification[]>(`notifications/${this.userID}`)
      .subscribe({
        next: (data) => {
          this.notifications = data.map((notification) => ({
            ...notification,
            timestamp: new Date(notification.timestamp),
          }));
        },
        error: (err) => {
          console.error('Error al obtener las notificaciones:', err);
        },
      });
  }

  listenToSocketNotifications(): void {
    this.socketService.onNotification((notification) => {
      console.log('Notificación recibida:', notification);
      this.notifications.unshift(notification);
      this.unreadCount++;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      width: '50vw',
      data: { notifications: this.notifications },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.unreadCount = 0;
    });
  }
}
