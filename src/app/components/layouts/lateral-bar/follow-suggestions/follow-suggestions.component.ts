import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/shared/http-service.service';
import { NgClass } from '@angular/common';
import { SocketService } from 'app/services/shared/socket.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faSolidUserPlus,
  faSolidUserMinus,
} from '@ng-icons/font-awesome/solid';

interface Account {
  _id: string;
  id_city: string;
  username: string;
  profilePic: string;
  bio: string;
  joinDate: Date;
  numFollowers: number;
  numFollowing: number;
  isFollowed?: boolean;
}

@Component({
  selector: 'app-follow-suggestions',
  standalone: true,
  imports: [NgClass, NgIcon],
  templateUrl: './follow-suggestions.component.html',
  styleUrl: './follow-suggestions.component.scss',
  viewProviders: [provideIcons({ faSolidUserPlus, faSolidUserMinus })],
})
export class FollowSuggestionsComponent implements OnInit {
  accounts: Account[] = [];
  userData = JSON.parse(localStorage.getItem('userData') as string);

  constructor(
    private httpService: HttpService,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.httpService.get<Account[]>('users/suggestions').subscribe({
      next: (data) => {
        this.accounts = data.map((account) => {
          account.profilePic =
            account.profilePic ||
            'https://lonche-bucket.s3.us-east-1.amazonaws.com/images/default.png';
          account.isFollowed = this.userData.following.includes(account._id);
          return account;
        });
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      },
    });
  }

  toggleFollow(account: Account): void {
    if (account.isFollowed) {
      this.unfollowAccount(account);
    } else {
      this.followAccount(account);
    }
  }

  followAccount(account: Account): void {
    this.httpService.post(`users/follow/${account._id}`, {}).subscribe({
      next: (data) => {
        account.isFollowed = true;
        account.numFollowers++;
        this.userData.following.push(account._id);
        this.userData.numFollowing++;
        localStorage.setItem('userData', JSON.stringify(this.userData));

        // Emitir evento de follow al backend
        this.socketService.emitFollowNotification({
          id_user: this.userData._id,
          username: this.userData.username,
          id_receiver: account._id,
        });
      },
      error: (err) => {
        console.error('Error following account:', err);
      },
    });
  }

  unfollowAccount(account: Account): void {
    this.httpService.post(`users/unfollow/${account._id}`, {}).subscribe({
      next: (data) => {
        account.isFollowed = false;
        account.numFollowers--;
        this.userData.following = this.userData.following.filter(
          (id: string) => id !== account._id,
        );
        this.userData.numFollowing--;
        localStorage.setItem('userData', JSON.stringify(this.userData));
      },
      error: (err) => {
        console.error('Error unfollowing account:', err);
      },
    });
  }
}
