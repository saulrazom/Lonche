import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/services/shared/http-service.service';
import { Comment } from 'app/types/comment';
import { User } from 'app/types/user';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { SocketService } from 'app/services/shared/socket.service';

interface CommentDetails extends Comment {
  timeCommented: string;
  username: string;
  profilePic: string;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  comments: CommentDetails[] = [];
  newCommentContent = '';
  userData = JSON.parse(localStorage.getItem('userData') as string);

  @Output() commentAdded = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id_post: string;
      id_city: string;
      id_user: string;
      username: string;
      title: string;
      content: string;
      categories: string[];
      timePosted: string;
      likes: number;
      likesUsers: string[];
      numComments: number;
      mediaURL: string;
    },
    private httpService: HttpService,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  postComment() {
    this.httpService
      .post<Comment, any>('comments', {
        id_post: this.data.id_post,
        id_user: this.userData._id,
        content: this.newCommentContent,
      })
      .subscribe({
        next: (data) => {
          this.comments.push({
            ...data,
            timeCommented: formatDistanceToNow(
              typeof data.creationDate === 'string'
                ? parseISO(data.creationDate)
                : data.creationDate,
              { addSuffix: true },
            ),
            username: this.userData.username,
            profilePic: this.userData.profilePic
              ? this.userData.profilePic
              : environment.defaultPic,
          });
          this.newCommentContent = '';
          this.commentAdded.emit();

          this.socketService.emitPostNotification({
            id_user: this.userData._id,
            id_post: this.data.id_post,
            id_receiver: this.data.id_user,
            username: this.userData.username,
            actionType: 'comment',
          });
        },
        error: (err) => {
          console.error('Error posting comment:', err);
        },
      });
  }

  fetchComments() {
    this.httpService
      .get<Comment[]>(`comments/?id=${this.data.id_post}`)
      .subscribe({
        next: (data) => {
          this.comments = data.map((comment) => ({
            ...comment,
            timeCommented: comment.creationDate
              ? formatDistanceToNow(
                  typeof comment.creationDate === 'string'
                    ? parseISO(comment.creationDate)
                    : comment.creationDate,
                  { addSuffix: true },
                )
              : 'Fecha desconocida',
            username: '',
            profilePic: '',
          }));

          this.comments.forEach((comment) => {
            this.httpService.get<User>(`users/${comment.id_user}`).subscribe({
              next: (userData) => {
                comment.username = userData.username;
                comment.profilePic = userData.profilePic
                  ? userData.profilePic
                  : environment.defaultPic;
              },
              error: (err) => {
                console.error(
                  `Error al obtener el username del usuario ${comment.id_user}:`,
                  err,
                );
              },
            });
          });
        },
        error: (err) => {
          console.error('Error fetching comments:', err);
        },
      });
  }
}
