import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { City } from '../../../../../types/city';
import { AuthService } from 'app/services/shared/auth.service';
import { HttpService } from 'app/services/shared/http-service.service';

//Icons 
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSquareXmark } from '@ng-icons/font-awesome/solid';

// form

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';


@Component({
  selector: 'app-cities-admin',
  standalone: true,
  imports: [MatTableModule, NgIconComponent, FormsModule, ReactiveFormsModule,],
  templateUrl: './cities-admin.component.html',
  styleUrl: './cities-admin.component.scss',
  providers: [
    provideIcons({
      faSolidSquareXmark
    }),
  ],
})
export class CitiesAdminComponent {
  displayedColumns: string[] = ['id', 'city', 'region', 'country', 'language',  'delete'];
  dataSource: City[] = [];
  cityForm: FormGroup;

  constructor( formBuilder: FormBuilder, private authService: AuthService, private httpService: HttpService) {
    this.getCities();

    this.cityForm = formBuilder.group(
      {
        name: ['', Validators.required],
        region: ['', Validators.required],
        country: ['', Validators.required],
        language: ['', Validators.required]
      }
    );

  }

  getCities() {
    const endpoint = 'cities/';
  
    this.httpService.get<City[]>(
      endpoint
    ).subscribe({
      next: (response) => {
        this.dataSource = response; 
        console.log('Datos de las ciudades:', response);
      },
      error: (error) => {
        console.error('Error al obtener los datos de las ciudades:', error);
      },
    });
  }

  createCity(): void {
    const endpoint = 'cities/';
    const city = this.cityForm.value;
    this.httpService.post<City, any>(endpoint, city).subscribe({
      next: (response) => {
        console.log('Ciudad creada con éxito:', response);
        this.getCities();
      },
      error: (error) => {
        console.error('Error al crear la ciudad:', error);
      },
      complete: () => {
        console.log('Operación de creación completada.');
      }
    });

  }

  deleteCity(city_id: string): void {
    const endpoint = `cities/${city_id}`;
    this.httpService.delete<City[]>(endpoint).subscribe({
      next: (response) => {
        console.log('Ciudad eliminada con éxito:', response);
        this.getCities();
      },
      error: (error) => {
        console.error('Error al eliminar la ciudad:', error);
      },
      complete: () => {
        console.log('Operación de eliminación completada.');
      }
    });
  }
  
  
}
