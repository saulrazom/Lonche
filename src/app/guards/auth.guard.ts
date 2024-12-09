import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/shared/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isLogged();

  if (isAuth) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
