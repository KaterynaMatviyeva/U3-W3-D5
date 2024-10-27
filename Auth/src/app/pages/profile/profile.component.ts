import { Component, OnInit } from '@angular/core';

import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private authSvc: AuthService) {}
  userProfile!: iUser;
  ngOnInit() {
    this.userProfile = this.authSvc.getCurrentUser();

    console.log(this.userProfile);
  }
}
