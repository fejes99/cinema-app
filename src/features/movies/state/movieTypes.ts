import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAIL = 'FETCH_MOVIE_FAIL';

export const CREATE_MOVIE_REQUEST = 'CREATE_MOVIE_REQUEST';
export const CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS';
export const CREATE_MOVIE_FAIL = 'CREATE_MOVIE_FAIL';

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

interface CreateMovieRequestAction {
  type: typeof CREATE_MOVIE_REQUEST;
}

interface CreateMovieSuccessAction {
  type: typeof CREATE_MOVIE_SUCCESS;
  newMovie: Movie;
}

interface CreateMovieFailAction {
  type: typeof CREATE_MOVIE_FAIL;
  error: Error;
}

export type MovieActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailAction
  | FetchMovieRequestAction
  | FetchMovieSuccessAction
  | FetchMovieFailAction
  | CreateMovieRequestAction
  | CreateMovieSuccessAction
  | CreateMovieFailAction;
