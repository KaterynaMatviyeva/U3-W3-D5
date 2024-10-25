import { iMovie } from './../../interfaces/i-movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { iFavorites } from '../../interfaces/i-favorites';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies$!: Observable<iMovie[]>;

  constructor(private moviesSvc: MoviesService, private authSvc: AuthService) {}

  ngOnInit() {
    this.movies$ = this.moviesSvc.getAllMovies();
  }

  addToFavorite(movie: iMovie) {
    //prendo tutto lo user dal local storage
    const currentUser = this.authSvc.getCurrentUser();

    this.moviesSvc
      .getFavoritesForUser(currentUser.id)
      .subscribe((favorites) => {
        const movieExists = favorites.some(
          (fav) => fav.movie.id === movie.id && fav.id === currentUser.id
        );

        if (movieExists) {
          alert('Film già esistente nella lista dei preferiti');
          return;
        }

        const favorite: Partial<iFavorites> = {
          movie: movie,
          userId: currentUser.id,
        };

        this.moviesSvc.addFavorite(favorite).subscribe({
          next: (resp) => {
            alert('Film aggiunto ai preferiti');
          },
          error: (err) => {
            alert(err.error);
          },
        });
      });
  }
}
