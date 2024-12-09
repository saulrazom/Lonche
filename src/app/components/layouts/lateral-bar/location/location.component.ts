import { City } from 'app/types/city';
import { CityService } from 'app/services/shared/city.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    TitleCasePipe,
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent implements OnInit {
  cities: City[] = [];
  currentCityId: string = '';
  currentCity: City | undefined = undefined;

  myControl = new FormControl<string | City>('');
  filteredOptions!: Observable<City[]>;

  constructor(private cityService: CityService) {
    this.cityService.cities.subscribe({
      next: (cities) => {
        this.cities = cities;
        this.updateCurrentCity();
      },
    });
    this.cityService.current_city.subscribe({
      next: (cityId) => {
        this.currentCityId = cityId;
        this.updateCurrentCity();
      },
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name) : this.cities;
      }),
    );
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();
    return this.cities.filter((city) =>
      city.name.toLowerCase().includes(filterValue),
    );
  }

  private updateCurrentCity() {
    this.currentCity = this.cities.find(
      (city) => city._id === this.currentCityId,
    );
  }

  onSubmit() {
    if (typeof this.myControl.value !== 'string') {
      this.cityService.current_city.next(this.myControl.value!._id);
      this.myControl.setValue('');
    }
  }
}
