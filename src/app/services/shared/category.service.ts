import { Injectable } from '@angular/core';
import { Category } from 'app/types/category';
import { HttpService } from './http-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = new BehaviorSubject<Category[]>([]);

  constructor(private httpService: HttpService) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.httpService.get<Category[]>(`categories`).subscribe({
      next: (categories) => {
        this.categories.next(categories);
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }
}
