import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidGear } from '@ng-icons/font-awesome/solid';
import { faSolidArrowRightToBracket } from '@ng-icons/font-awesome/solid';
import { DashboardComponent } from '../../../pages/dashboard/dashboard.component';
import { AuthService } from '../../../../services/shared/auth.service';
import { HttpService } from '../../../../services/shared/http-service.service';
import { MaterialModule } from '@modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIconComponent, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  viewProviders: [provideIcons({ faSolidGear, faSolidArrowRightToBracket })],
})
export class ProfileComponent {
  id_user = '';
  userImage = '';
  userName = 'User';
  readonly dialog = inject(MatDialog);

  constructor(
    private dashboard: DashboardComponent,
    private authService: AuthService,
    private httpService: HttpService,
  ) {
    this.id_user = this.authService.getUserID()?.toString() || '';
    this.getCurrentUserData();
  }

  getCurrentUserData() {
    const endpoint = 'users/' + this.id_user;

    this.httpService
      .get<{ username: string; profilePic: string }>(endpoint)
      .subscribe({
        next: (response) => {
          this.userName = response.username;
          this.userImage = response.profilePic
            ? response.profilePic
            : environment.defaultPic;
        },
        error: (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        },
      });
  }

  openDialog() {
    this.dialog.open(ProfileDataComponent, {
      width: '600px',
    });
  }

  logout() {
    this.dashboard.logout();
  }
}
