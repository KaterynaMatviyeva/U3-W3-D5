import { iUser } from './../interfaces/i-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap } from 'rxjs';
import { iAccessData } from '../interfaces/i-access-data';
import { iLoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    this.isUserLogin(); //serve nel caso del reload
  }
  autoLogOutTimer: any;

  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  authSubject$ = new BehaviorSubject<iAccessData | null>(null);

  register(newUser: Partial<iUser>) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post<iAccessData>(this.loginUrl, authData).pipe(
      tap((accessData) => {
        this.authSubject$.next(accessData);
        localStorage.setItem('accessData', JSON.stringify(accessData));

        const expToken = this.jwtHelper.getTokenExpirationDate(
          accessData.accessToken
        );

        if (!expToken) return;
        this.autoLogOut(expToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('accessData');
    this.authSubject$.next(null);
    this.router.navigate(['']);
  }

  getCurrentUser() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      return JSON.parse(accessData).user;
    }
  }

  isLoggedIn$ = this.authSubject$.pipe(map((accessData) => !!accessData));

  isUserLogin() {
    const user: string | null = localStorage.getItem('accessData');
    if (!user) return;

    const accessData: iAccessData = JSON.parse(user);

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      localStorage.removeItem('accessData');
      return;
    }
    this.authSubject$.next(accessData);
  }

  autoLogOut(expToken: Date) {
    const ms = expToken.getTime() - new Date().getTime();
    this.autoLogOutTimer = setTimeout(() => {
      this.logout();
    }, ms);
  }
}
