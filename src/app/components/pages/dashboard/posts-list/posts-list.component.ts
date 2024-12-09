import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { HttpService } from '../../../../services/shared/http-service.service';
import { Post } from '../../../../types/post';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { CityService } from 'app/services/shared/city.service';

interface PostWithDetails extends Post {
  timePosted: string;
}

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit, OnChanges {
  @Input() apiUrl!: string;
  @Input() apiParams?: Record<string, any>;
  posts: PostWithDetails[] = [];
  error: string | null = null;
  currentCityId: string = '';

  constructor(
    private httpService: HttpService,
    private cityService: CityService,
  ) {
    this.cityService.current_city.subscribe({
      next: (cityId) => {
        this.currentCityId = cityId;
        if (this.apiUrl) {
          this.fetchPosts();
        }
      },
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    if (this.currentCityId) {
      this.apiParams = { ...this.apiParams, city: this.currentCityId };
    }

    this.httpService.get<Post[]>(this.apiUrl, this.apiParams || {}).subscribe({
      next: (data) => {
        this.posts = data.map((post) => ({
          ...post,
          timePosted: post.creationDate
            ? formatDistanceToNow(
                typeof post.creationDate === 'string'
                  ? parseISO(post.creationDate)
                  : post.creationDate,
                { addSuffix: true },
              )
            : 'Fecha desconocida',
          username: '',
        }));

        this.posts.forEach((post) => {
          this.httpService
            .get<{ username: string }>(`users/${post.id_user}`)
            .subscribe({
              next: (userData) => {
                post.username = userData.username;
              },
              error: (err) => {
                console.error(
                  `Error al obtener el username del usuario ${post.id_user}:`,
                  err,
                );
              },
            });
        });
      },
      error: (err) => {
        this.error = 'Error al cargar los posts.';
        console.error(err);
      },
    });
  }
}
