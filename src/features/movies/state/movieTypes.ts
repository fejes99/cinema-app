import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';

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

export type MovieActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailAction;
