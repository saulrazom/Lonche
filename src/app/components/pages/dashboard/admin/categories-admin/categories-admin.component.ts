import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../../../types/category';
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
  selector: 'app-categories-admin',
  standalone: true,
  imports: [MatTableModule, NgIconComponent, FormsModule, ReactiveFormsModule,],
  templateUrl: './categories-admin.component.html',
  styleUrl: './categories-admin.component.scss',
  providers: [
    provideIcons({
      faSolidSquareXmark
    }),
  ],
})
export class CategoriesAdminComponent {

  displayedColumns: string[] = ['id', 'category', 'color', 'delete'];
  dataSource: Category[] = [];
  categoryForm: FormGroup;

  constructor( formBuilder: FormBuilder, private authService: AuthService, private httpService: HttpService) {
    this.getCategories();

    this.categoryForm = formBuilder.group(
      {
        name: ['', Validators.required],
        color: ['', Validators.required],
      }
    );

  }

  getCategories() {
    const endpoint = 'categories/';
  
    this.httpService.get<Category[]>(
      endpoint
    ).subscribe({
      next: (response) => {
        this.dataSource = response; 
        console.log('Datos de las categorias:', response);
      },
      error: (error) => {
        console.error('Error al obtener los datos de las ciudades:', error);
      },
    });
  }

  createCategory(): void {
    const endpoint = 'categories/';
    const city = this.categoryForm.value;
    this.httpService.post<Category, any>(endpoint, city).subscribe({
      next: (response) => {
        console.log('Ciudad creada con éxito:', response);
        this.getCategories();
      },
      error: (error) => {
        console.error('Error al crear la ciudad:', error);
      },
      complete: () => {
        console.log('Operación de creación completada.');
      }
    });

  }

  deleteCategory(category_id: string): void {
    const endpoint = `categories/${category_id}`;
    this.httpService.delete<Category[]>(endpoint).subscribe({
      next: (response) => {
        console.log('Ciudad eliminada con éxito:', response);
        this.getCategories();
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
