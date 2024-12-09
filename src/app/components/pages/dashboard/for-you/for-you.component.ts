import { Component } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';

@Component({
  selector: 'app-for-you',
  standalone: true,
  imports: [PostsListComponent],
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss'],
})
export class ForYouComponent {}
