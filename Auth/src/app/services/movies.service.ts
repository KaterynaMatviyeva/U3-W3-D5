import { Injectable } from '@angular/core';
import { iMovie } from '../interfaces/i-movie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, pipe, tap } from 'rxjs';
import { iFavorites } from '../interfaces/i-favorites';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  movieUrl: string = environment.movieUrl;
  favUrl: string = environment.favUrl;
  // usersUrl: string = environment.usersUrl;

  getAllMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.movieUrl);
  }
  getFavoritesForUser(userId: number): Observable<iFavorites[]> {
    return this.http.get<iFavorites[]>(this.favUrl);
  }

  addFavorite(newFav: Partial<iFavorites>) {
    return this.http.post(this.favUrl, newFav);
  }
  getFavoritesForPage(userId: number): Observable<iFavorites[]> {
    const newUrl = this.favUrl + '?userId=' + userId;
    return this.http.get<iFavorites[]>(newUrl);
  }
}
