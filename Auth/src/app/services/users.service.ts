import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUser } from '../interfaces/i-user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userUrl: string = environment.usersUrl;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.userUrl);
  }
}
