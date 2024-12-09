import { Component } from '@angular/core';
import { LocationComponent } from './location/location.component';
import { FollowSuggestionsComponent } from './follow-suggestions/follow-suggestions.component';

@Component({
  selector: 'app-lateral-bar',
  standalone: true,
  imports: [LocationComponent, FollowSuggestionsComponent],
  templateUrl: './lateral-bar.component.html',
  styleUrl: './lateral-bar.component.scss',
})
export class LateralBarComponent {}
