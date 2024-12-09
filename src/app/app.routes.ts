import { Routes } from '@angular/router';
import { LandingPageComponent } from '@components/pages/landing-page/landing-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignUpComponent } from '@components/pages/sign-up/sign-up.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ForYouComponent } from '@pages/dashboard/for-you/for-you.component';
import { PopularComponent } from '@pages/dashboard/popular/popular.component';
import { SavedComponent } from '@pages/dashboard/saved/saved.component';
import { NotFoundComponent } from '@components/errors/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventExitGuard } from './guards/prevent-exit.guard';
import { AdminGuard } from '../app/guards/admin.guard';
import { AdminComponent } from '@components/pages/dashboard/admin/admin.component';
import { PostsTagComponent } from '@components/pages/dashboard/posts-tag/posts-tag.component';
import { CallbackComponent } from '@components/shared/callback/callback.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [PreventExitGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [PreventExitGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventExitGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ForYouComponent },
      { path: 'popular', component: PopularComponent },
      { path: 'saved', component: SavedComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'tag/:tag', component: PostsTagComponent },
    ],
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [PreventExitGuard],
  },
];
