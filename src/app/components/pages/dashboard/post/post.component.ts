import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cssMoreAlt } from '@ng-icons/css.gg';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './comments/comments.component';
import {
  faSolidHeart,
  faSolidHeartCrack,
  faSolidComment,
} from '@ng-icons/font-awesome/solid';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { SocketService } from 'app/services/shared/socket.service';
import { HttpService } from 'app/services/shared/http-service.service';
import { NgStyle } from '@angular/common';
import { CategoryService } from 'app/services/shared/category.service';
import { Category } from 'app/types/category';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, NgIconComponent, NgStyle],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [
    provideIcons({
      cssMoreAlt,
      faSolidHeart,
      faSolidHeartCrack,
      faSolidComment,
    }),
  ],
})
export class PostComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  userData = JSON.parse(localStorage.getItem('userData') as string);
  isLiked: boolean = false;
  allCategories: Category[] = [];
  filteredCategories: Category[] = [];

  @Input() _id!: string;
  @Input() id_city!: string;
  @Input() id_user!: string;
  @Input() username!: string;
  @Input() title!: string;
  @Input() content!: string;
  @Input() categories!: string[];
  @Input() timePosted!: string;
  @Input() likes!: number;
  @Input() likesUsers!: string[];
  @Input() numComments!: number;
  @Input() mediaURL!: string;

  constructor(
    private socketService: SocketService,
    private httpService: HttpService,
    private categoryService: CategoryService,
  ) {
    this.categoryService.categories.subscribe({
      next: (categories) => {
        this.allCategories = categories;
      },
    });
  }

  ngOnInit() {
    this.isLiked = this.likesUsers.includes(this.userData.username);

    this.filteredCategories = this.allCategories.filter((category) =>
      this.categories.includes(category.name),
    );
  }

  openComments() {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '60vw',
      data: {
        id_post: this._id,
        id_city: this.id_city,
        id_user: this.id_user,
        username: this.username,
        title: this.title,
        content: this.content,
        categories: this.categories,
        timePosted: this.timePosted,
        likes: this.likes,
        likesUsers: this.likesUsers,
        numComments: this.numComments,
        mediaURL: this.mediaURL,
      },
    });

    dialogRef.componentInstance.commentAdded.subscribe(() => {
      this.numComments++;
    });
  }

  toggleLike() {
    if (this.isLiked) {
      this.unlikePost();
    } else {
      this.likePost();
    }
  }

  likePost() {
    this.httpService.post(`like/${this._id}`, {}).subscribe({
      next: (data) => {
        this.isLiked = true;
        this.likes++;

        this.socketService.emitPostNotification({
          id_user: this.userData._id,
          id_post: this._id,
          id_receiver: this.id_user,
          username: this.userData.username,
          actionType: 'like',
        });
      },
      error: (err) => {
        console.error('Error liking post:', err);
      },
    });
  }

  unlikePost() {
    this.httpService.post(`unlike/${this._id}`, {}).subscribe({
      next: (data) => {
        this.isLiked = false;
        this.likes--;
      },
      error: (err) => {
        console.error('Error unliking post:', err);
      },
    });
  }
}
