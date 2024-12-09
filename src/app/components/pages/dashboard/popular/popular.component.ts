import { Component } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [PostsListComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent {}
