import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoToCityService {
  private cityId = new BehaviorSubject<string>('');
  id_city$ = this.cityId.asObservable();

  constructor() {}

  updatCityId(newTag: string): void {
    this.cityId.next(newTag);
  }
}
