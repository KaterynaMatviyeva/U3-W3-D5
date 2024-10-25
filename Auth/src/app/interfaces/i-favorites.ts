import { iMovie } from './i-movie';
import { iUser } from './i-user';

export interface iFavorites {
  id: number;
  movie: iMovie;
  userId: number;
}
