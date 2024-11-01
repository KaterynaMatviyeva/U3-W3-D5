import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { iFavorites } from '../../interfaces/i-favorites';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: iFavorites[] = [];

  constructor(private moviesSvc: MoviesService, private authSvc: AuthService) {}
  ngOnInit() {
    const currentUser = this.authSvc.getCurrentUser();
    this.moviesSvc
      .getFavoritesForPage(currentUser.id)
      .subscribe((usersFavorites) => {
        this.favorites = usersFavorites;
      });
  }
}
