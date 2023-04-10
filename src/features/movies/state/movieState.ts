import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: Error | null;
}
