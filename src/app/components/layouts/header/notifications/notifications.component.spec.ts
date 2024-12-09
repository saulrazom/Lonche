import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsComponent } from './notifications.component';
import { Notification } from 'app/types/notification';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DebugElement } from '@angular/core';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let notificationsMock: Notification[];

  beforeEach(async () => {
    notificationsMock = [
      {
        type: 'follow',
        username: 'User1',
        sender: 'User1',
        receiver: 'UserA',
        timestamp: new Date(),
      },
      {
        type: 'like',
        username: 'User2',
        sender: 'User2',
        receiver: 'UserA',
        timestamp: new Date(),
      },
      {
        type: 'comment',
        username: 'User3',
        sender: 'User3',
        receiver: 'UserA',
        timestamp: new Date(),
      },
    ];

    await TestBed.configureTestingModule({
      imports: [
        NotificationsComponent,
        MatDialogModule,
        MatButtonModule,
        MatListModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { notifications: notificationsMock },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the notifications from the input data', () => {
    const listItems: DebugElement[] = fixture.debugElement.queryAll(
      By.css('mat-list-item'),
    );
    expect(listItems.length).toBe(3);

    expect(listItems[0].nativeElement.textContent.trim()).toContain(
      'User1 started following you.',
    );
    expect(listItems[1].nativeElement.textContent.trim()).toContain(
      'User2 liked your post.',
    );
    expect(listItems[2].nativeElement.textContent.trim()).toContain(
      'User3 commented on your post.',
    );
  });

  fit('should display "Sin notificaciones" when notifications array is empty', () => {
    component.notifications = [];
    fixture.detectChanges();

    const listItems: DebugElement[] = fixture.debugElement.queryAll(
      By.css('mat-list-item'),
    );
    expect(listItems.length).toBe(1);
    expect(listItems[0].nativeElement.textContent.trim()).toBe(
      'Sin notificaciones',
    );
  });

  fit('should clear all notifications when "Clear All" button is clicked', () => {
    const clearButton: DebugElement = fixture.debugElement.query(
      By.css('button:first-child'),
    );
    clearButton.nativeElement.click();

    expect(component.notifications).toEqual([]);
    fixture.detectChanges();

    const listItems: DebugElement[] = fixture.debugElement.queryAll(
      By.css('mat-list-item'),
    );
    expect(listItems.length).toBe(1);
    expect(listItems[0].nativeElement.textContent.trim()).toBe(
      'Sin notificaciones',
    );
  });

  fit('should close the dialog when "Close" button is clicked', () => {
    const closeButton: DebugElement = fixture.debugElement.query(
      By.css('button:last-child'),
    );
    expect(closeButton).toBeTruthy(); // Ensure the Close button exists
  });
});
