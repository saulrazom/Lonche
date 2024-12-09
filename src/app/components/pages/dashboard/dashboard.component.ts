import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { HeaderComponent } from '@layouts/header/header.component';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { LateralBarComponent } from '@layouts/lateral-bar/lateral-bar.component';
import { NewPostComponent } from './new-post/new-post.component';
import { LoginService } from '../../../services/login.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    LateralBarComponent,
    NewPostComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isAdminRoute = false;
  private routeSubscription: Subscription | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAdminRoute = this.router.url === '/dashboard/admin';

    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute = event.url === '/dashboard/admin';
      });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
