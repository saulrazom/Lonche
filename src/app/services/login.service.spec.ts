/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { AuthService } from './shared/auth.service';
import { HttpService } from './shared/http-service.service';
import { of, throwError } from 'rxjs';
import { User } from '../types/user'; // Asegúrate de que esta ruta sea correcta

describe('LoginService', () => {
  let service: LoginService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    // Crear mocks para AuthService y HttpService
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'setToken',
      'setUserID',
      'setUserData',
      'logout',
    ]);
    mockHttpService = jasmine.createSpyObj('HttpService', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should successfully log in and set user data', (done) => {
      const mockUser: User = {
        _id: '123',
        id_city: '456',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        followers: [],
        following: [],
        joinDate: new Date(),
        name: 'Test User',
        lastname: 'Test Lastname',
        birthdate: new Date('1990-01-01'),
        profilePic: 'https://example.com/profile.jpg',
        role: 'user',
        status: 'active',
        bio: 'Test bio',
        numFollowers: 100,
        numFollowing: 50,
      };

      const mockResponse = {
        token: 'fakeToken',
        user: mockUser,
      };

      mockHttpService.post.and.returnValue(of(mockResponse));

      service.login('test@example.com', 'password123').subscribe((response) => {
        expect(mockHttpService.post).toHaveBeenCalledWith(
          'login',
          { email: 'test@example.com', password: 'password123' },
          { withCredentials: false }
        );
        expect(mockAuthService.setToken).toHaveBeenCalledWith('fakeToken');
        expect(mockAuthService.setUserID).toHaveBeenCalledWith('123');
        expect(mockAuthService.setUserData).toHaveBeenCalledWith(mockUser);
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should handle login errors', (done) => {
      mockHttpService.post.and.returnValue(throwError(() => new Error('Login failed')));

      service.login('test@example.com', 'password123').subscribe((response) => {
        expect(mockHttpService.post).toHaveBeenCalled();
        expect(mockAuthService.setToken).not.toHaveBeenCalled();
        expect(response).toEqual({ token: undefined, user: undefined });
        done();
      });
    });
  });

  describe('#loginWithGoogle', () => {
    it('should fetch user profile and set user data', (done) => {
      const mockUser: User = {
        _id: '123',
        id_city: '456',
        username: 'googleuser',
        email: 'googleuser@example.com',
        password: '',
        followers: [],
        following: [],
        joinDate: new Date(),
        name: 'Google User',
        lastname: 'Google Lastname',
        birthdate: new Date('1992-01-01'),
        profilePic: 'https://example.com/googleprofile.jpg',
        role: 'user',
        status: 'active',
        bio: 'Google user bio',
        numFollowers: 200,
        numFollowing: 80,
      };

      mockHttpService.get.and.returnValue(of(mockUser));

      service.loginWithGoogle().subscribe((response) => {
        expect(mockHttpService.get).toHaveBeenCalledWith('profile');
        expect(mockAuthService.setUserID).toHaveBeenCalledWith('123');
        expect(mockAuthService.setUserData).toHaveBeenCalledWith(mockUser);
        expect(response).toEqual(mockUser);
        done();
      });
    });

    it('should handle errors in loginWithGoogle', (done) => {
      mockHttpService.get.and.returnValue(throwError(() => new Error('Google login failed')));

      service.loginWithGoogle().subscribe((response) => {
        expect(mockHttpService.get).toHaveBeenCalled();
        expect(mockAuthService.setUserID).not.toHaveBeenCalled();
        expect(response).toBeUndefined();
        done();
      });
    });
  });

  describe('#logout', () => {
    it('should call logout on AuthService', () => {
      service.logout();
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
