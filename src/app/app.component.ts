import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
// import { NavbarComponent } from '@components/layouts/navbar/navbar.component';
// import { HeaderComponent } from '@components/layouts/header/header.component';
// import { FooterComponent } from '@components/layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Lonche';
}
