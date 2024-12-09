import { Component } from '@angular/core';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from 'app/services/shared/auth.service';
import { User } from '../../../types/user';
import { RouterLink } from '@angular/router';

// Icons
import { faPenToSquare } from '@ng-icons/font-awesome/regular';
import { faSolidStar } from '@ng-icons/font-awesome/solid';
import { faSolidFire } from '@ng-icons/font-awesome/solid';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidBookmark } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CategoriesMenuComponent,
    ProfileComponent,
    RouterLink,
    NgIconComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [
    provideIcons({
      faPenToSquare,
      faSolidStar,
      faSolidFire,
      faSolidBookmark,
    }),
  ],
})
export class NavbarComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.observableUserData.subscribe((user) => {
      this.user = user;
      console.log('user', user);
    });
  }
}
