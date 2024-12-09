import { Component } from '@angular/core';
import { faSolidAngleDown } from '@ng-icons/font-awesome/solid';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'app/types/category';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TagService } from 'app/services/shared/tag.service';
import { CategoryService } from 'app/services/shared/category.service';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [NgIconComponent, FormsModule, TitleCasePipe],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
  viewProviders: [provideIcons({ faSolidAngleDown })],
})
export class CategoriesMenuComponent {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  visibleCategories: Category[] = [];
  isCollapsed = true;
  isExpanded = false;
  searchQuery = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tagService: TagService,
    private categoryService: CategoryService,
  ) {
    this.categoryService.categories.subscribe({
      next: (categories) => {
        this.categories = categories;
        this.filteredCategories = categories;
        this.updateVisibleCategories();
      },
    });
  }

  toggleDropdown() {
    this.isCollapsed = !this.isCollapsed;
  }

  updateVisibleCategories() {
    this.visibleCategories = this.isExpanded
      ? this.filteredCategories
      : this.filteredCategories.slice(0, 3);
  }

  toggleViewMore() {
    this.isExpanded = !this.isExpanded;
    this.updateVisibleCategories();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase()),
    );
    this.updateVisibleCategories();
  }

  navigateToCategory(categoryName: string) {
    this.tagService.updateTag(categoryName);
    this.router.navigate(['/dashboard/tag', categoryName]);
  }
}
