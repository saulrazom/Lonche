import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/shared/auth.service';

export const PreventExitGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isLogged();

  if (isAuth && !state.url.startsWith('/dashboard')) {
    return router.parseUrl('/dashboard');
  }
  return true;
};
