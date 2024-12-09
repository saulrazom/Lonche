import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { TagService } from 'app/services/shared/tag.service';

@Component({
  selector: 'app-posts-tag',
  standalone: true,
  imports: [PostsListComponent],
  templateUrl: './posts-tag.component.html',
  styleUrl: './posts-tag.component.scss',
})
export class PostsTagComponent implements OnInit {
  tag = '';

  constructor(
    private tagService: TagService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tagService.tag$.subscribe((tag) => {
      this.tag = tag;
    });

    this.route.url.subscribe((url) => {
      this.tagService.updateTag(url[1].path);
    });
  }
}
