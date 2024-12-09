import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagSubject = new BehaviorSubject<string>('');
  tag$ = this.tagSubject.asObservable();

  constructor() {}

  updateTag(newTag: string): void {
    this.tagSubject.next(newTag);
  }
}
