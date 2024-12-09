import { Component } from '@angular/core';
import { CategoriesAdminComponent } from './categories-admin/categories-admin.component';
import { CitiesAdminComponent } from './cities-admin/cities-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CategoriesAdminComponent, CitiesAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
