import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { City } from 'app/types/city';
import { HttpService } from './http-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cities = new BehaviorSubject<City[]>([]);
  current_city = new BehaviorSubject<string>('');

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
  ) {
    this.authService.observableUserData.subscribe({
      next: (userData) => {
        if (userData) {
          this.current_city.next(userData.id_city);
        } else {
          this.cities.next([]);
        }
      },
    });

    this.fetchCities();
  }

  fetchCities() {
    this.httpService.get<City[]>('cities').subscribe({
      next: (data) => {
        this.cities.next(data);
        if (this.cities.value.length === 0)
          this.current_city.value ?? this.current_city.next(data[0]._id);
      },
      error: (error) => {
        console.error('Error fetching cities', error);
      },
    });
  }

  getCities() {
    return this.cities;
  }
}
