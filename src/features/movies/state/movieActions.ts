import axios from 'axios';
import { AppDispatch } from 'store/store';
import { Movie } from '../types/Movie';
import * as actionTypes from './movieTypes';
import { Error } from 'common/types/Error';

const fetchMoviesRequest = () => ({
  type: actionTypes.FETCH_MOVIES_REQUEST,
});

const fetchMoviesSuccess = (data: Movie[]) => ({
  type: actionTypes.FETCH_MOVIES_SUCCESS,
  movies: data,
});

const fetchMoviesFail = (error: Error) => ({
  type: actionTypes.FETCH_MOVIES_FAIL,
  error: error,
});

export const fetchMovies = () => (dispatch: AppDispatch) => {
  dispatch(fetchMoviesRequest());
  axios
    .get('/movies')
    .then((response) => dispatch(fetchMoviesSuccess(response.data)))
    .catch((error) => dispatch(fetchMoviesFail(error)));
};
