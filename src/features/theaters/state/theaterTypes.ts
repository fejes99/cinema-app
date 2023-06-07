import { Error } from 'common/types/Error';
import { Theater } from '../types/Theater';

export const FETCH_THEATER_REQUEST = 'FETCH_THEATER_REQUEST';
export const FETCH_THEATER_SUCCESS = 'FETCH_THEATER_SUCCESS';
export const FETCH_THEATER_FAIL = 'FETCH_THEATER_FAIL';

interface FetchTheaterRequestAction {
  type: typeof FETCH_THEATER_REQUEST;
}

interface FetchTheaterSuccessAction {
  type: typeof FETCH_THEATER_SUCCESS;
  theaters: Theater[];
}

interface FetchTheaterFailAction {
  type: typeof FETCH_THEATER_FAIL;
  error: Error;
}

export type TheaterActionTypes =
  | FetchTheaterRequestAction
  | FetchTheaterSuccessAction
  | FetchTheaterFailAction;
