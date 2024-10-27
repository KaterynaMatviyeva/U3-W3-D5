import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  users: iUser[] = [];
  constructor(public authSvc: AuthService) {}

  logout() {
    this.authSvc.logout();
  }
}
