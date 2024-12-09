import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingHeaderComponent } from '@components/layouts/landing-header/landing-header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, LandingHeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
