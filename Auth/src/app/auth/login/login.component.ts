import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private authSvc: AuthService,
    private router: Router
  ) {}

  form: iLoginRequest = {
    email: '',
    password: '',
  };

  login() {
    this.authSvc.login(this.form).subscribe({
      next: (resp) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
  submit(form: NgForm) {
    form.reset();
  }
}
