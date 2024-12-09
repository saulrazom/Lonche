import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './shared/auth.service';
import { HttpService } from './shared/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiUrl}`;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  login(email: string, password: string) {
    return this.httpService
      .post<
        { email: string; password: string },
        { token?: string; user?: User }
      >('login', { email, password }, { withCredentials: false })
      .pipe(
        map((response) => {
          if (response.token) {
            this.authService.setToken(response.token);

            const userData =
              response.user && '_doc' in response.user
                ? (response.user._doc as User)
                : response.user;
            const userID = (userData as User)?._id || '';

            this.authService.setUserID(userID);
            const userDataCopy = { ...userData } as User;
            this.authService.setUserData(userDataCopy);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Error en el login: ', error);
          return of({ token: undefined, user: undefined });
        }),
      );
  }

  loginWithGoogle() {
    return this.httpService.get<User>('profile').pipe(
      map((response) => {
        const userData = response;
        const userID = userData._id || '';

        this.authService.setUserID(userID);
        const userDataCopy = { ...userData } as User;
        this.authService.setUserData(userDataCopy);

        return response;
      }),
      catchError((error) => {
        console.error('Error en el login con Google: ', error);
        return of();
      }),
    );
  }

  // Cerrar sesión
  logout() {
    this.authService.logout();
    console.log('Logout exitoso.');
    return { success: true };
  }
}
