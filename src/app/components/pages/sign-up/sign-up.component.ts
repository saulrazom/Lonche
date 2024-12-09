import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LandingHeaderComponent } from '@components/layouts/landing-header/landing-header.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faBrandGoogle } from '@ng-icons/font-awesome/brands';
import { User } from '../../../types/user';

// Servicios
import { AuthService } from '../../../services/shared/auth.service';
import { SignupService } from '../../../services/signup.service';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LandingHeaderComponent,
    NgIconComponent,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  viewProviders: [provideIcons({ faBrandGoogle })],
})
export class SignUpComponent {
  signupForm: FormGroup;

  // Lista de opciones válidas
  validCities = ['Ciudad de México', 'Guadalajara, MX'];

  // Mapa de ciudades con sus IDs (hardcodeado)
  citiesMap = {
    'Ciudad de México': '67071eb30079259fec39295b',
    'Guadalajara, MX': '6745e0967656cddd4ce25c9c',
  };

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private authService: AuthService,
  ) {
    this.signupForm = formBuilder.group(
      {
        city: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        birthdate: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordsMatchValidator, // Validador personalizado
      },
    );
  }

  private passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirm')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  signup() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;

      if (formValues.password !== formValues.confirm) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const selectedCityName = formValues.city;

      const cityId =
        this.citiesMap[selectedCityName as keyof typeof this.citiesMap] || null;

      if (cityId) {
        const userData: User = {
          id_city: cityId,
          username: formValues.username,
          email: formValues.email,
          name: formValues.name,
          lastname: formValues.lastname,
          birthdate: formValues.birthdate,
          password: formValues.password,
        };

        this.signupService.register(userData).subscribe({
          next: (response: { token?: string; user?: User }) => {
            if (response.token) {
              console.log(response.token, response.user);
              alert('Usuario registrado correctamente.');
              this.router.navigate(['/dashboard']);
            } else {
              alert('Error en el registro. Intenta nuevamente.');
            }
          },
          error: (error) => {
            console.error('Error registrando usuario:', error);
            alert(
              'Ocurrió un error durante el registro. Inténtalo nuevamente.' +
                error,
            );
          },
        });
      } else {
        alert('Ciudad no válida.');
      }
    } else {
      alert('Debes llenar todos los campos.');
    }
  }

  googleSignup() {
    window.location.href = `${environment.apiUrl}google`;
  }
}
