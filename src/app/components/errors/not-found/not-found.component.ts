import { Component } from '@angular/core';
import { LandingHeaderComponent } from '@components/layouts/landing-header/landing-header.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LandingHeaderComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
