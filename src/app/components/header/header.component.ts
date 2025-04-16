import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,CommonModule,MatListModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  role = 'admin'; // or 'user'

  get isAdmin(): boolean {
    return true
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  sidenavOpen = false;

toggleSidenav() {
  this.sidenavOpen = !this.sidenavOpen;
}

closeSidenav() {
  this.sidenavOpen = false;
}


  logout() {
    localStorage.removeItem('role');
    location.reload();
  }
}
