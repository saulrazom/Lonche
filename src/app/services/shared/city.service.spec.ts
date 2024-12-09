/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { CityService } from './city.service';
import { AuthService } from './auth.service';
import { HttpService } from './http-service.service';
import { BehaviorSubject, of } from 'rxjs';
import { City } from 'app/types/city';

describe('CityService', () => {
  let service: CityService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    // Mock para AuthService
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      observableUserData: new BehaviorSubject({
        id_city: '123',
      }),
    });

    // Mock para HttpService
    mockHttpService = jasmine.createSpyObj('HttpService', ['get']);
    mockHttpService.get.and.returnValue(of([{ _id: '123', name: 'City 1' }]));

    // Configuración del módulo de prueba
    TestBed.configureTestingModule({
      providers: [
        CityService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    });

    service = TestBed.inject(CityService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should fetch cities on initialization', () => {
    service.cities.subscribe((cities) => {
      expect(cities.length).toBe(1);
      expect(cities[0]._id).toBe('123');
      expect(cities[0].name).toBe('City 1');
    });
  });

  fit('should set current_city based on user data', () => {
    service.current_city.subscribe((currentCity) => {
      expect(currentCity).toBe('123');
    });
  });
});
