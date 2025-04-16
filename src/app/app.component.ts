import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mrFuel';

  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url === '/login';
  }

  role = 'admin'; // or 'user'

  sidenavOpen = true;

  get isAdmin(): boolean {
    return true
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  logout() {
    localStorage.removeItem('role');
    location.reload();
  }
}
