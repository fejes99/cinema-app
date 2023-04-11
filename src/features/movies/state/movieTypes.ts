import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAIL = 'FETCH_MOVIE_FAIL';

interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES_REQUEST;
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS;
  movies: Movie[];
}

interface FetchMoviesFailAction {
  type: typeof FETCH_MOVIES_FAIL;
  error: Error;
}

interface FetchMovieRequestAction {
  type: typeof FETCH_MOVIE_REQUEST;
}

interface FetchMovieSuccessAction {
  type: typeof FETCH_MOVIE_SUCCESS;
  selectedMovie: Movie;
}

interface FetchMovieFailAction {
  type: typeof FETCH_MOVIE_FAIL;
  error: Error;
}

export type MovieActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailAction
  | FetchMovieRequestAction
  | FetchMovieSuccessAction
  | FetchMovieFailAction;
