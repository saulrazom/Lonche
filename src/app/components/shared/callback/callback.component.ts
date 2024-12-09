import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { AuthService } from 'app/services/shared/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.authService.setToken(token);
        this.loginService.loginWithGoogle().subscribe({
          next: (response) => {
            this.router.navigate(['/dashboard']);
          },
        });
      } else {
        console.error('Error: No se recibió el token');
        this.router.navigate(['/']);
      }
    });
  }
}
