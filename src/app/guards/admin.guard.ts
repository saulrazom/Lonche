import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/shared/auth.service';


export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.isAdmin();

  if (isAdmin) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }

};
