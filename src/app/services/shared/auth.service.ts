import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  observableToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  observableUserData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(this.user);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.observableToken.next(token);
    }

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.user = JSON.parse(storedUserData);
      this.observableUserData.next(this.user);
    }
  }

  // Getters

  getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return null;
    }
  }

  getUserID(): string | null {
    return localStorage.getItem('userID');
  }

  getUserData(): User | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  // Setters
  setToken(token: string): void {
    try {
      localStorage.setItem('token', token);
      this.observableToken.next(token);
    } catch (error) {
      console.error('Error setting token in localStorage', error);
    }
  }

  setUserID(userID: string): void {
    try {
      localStorage.setItem('userID', userID);
    } catch (error) {
      console.error('Error setting userID in localStorage', error);
    }
  }

  setUserData(userData: User): void {
    this.user = userData;
    localStorage.setItem('userData', JSON.stringify(userData));
    this.observableUserData.next(userData);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  logout(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('userData');
      localStorage.clear();
      this.observableToken.next(null);
      this.observableUserData.next(null);
    } catch (error) {
      console.error('Error removing token from localStorage', error);
    }
  }
}
